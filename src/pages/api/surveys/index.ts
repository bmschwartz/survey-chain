import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/services/prisma';

const validateSurvey = (surveyData: any) => {
  return true;
};

const handleSaveFinish = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession();

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;
    const { surveyData } = req.body;
    const { title, description, isPublished } = surveyData;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 1: Validate survey data
    if (!validateSurvey(surveyData)) {
      return res.status(400).json({ message: 'Survey validation failed' });
    }

    let surveyId;
    let surveyVersionId;
    const isNew = !surveyData.id;

    if (isNew) {
      // Step 2: Create a new survey
      const survey = await prisma.survey.create({
        data: {
          title,
          isPublished,
          description,
          currentVersion: 1,
          user: { connect: { id: userId } },
        },
      });

      surveyId = survey.id;

      // Step 3: Create a new version for the new survey
      const surveyVersion = await prisma.surveyVersion.create({
        data: {
          surveyId,
          versionNumber: 1,
          metadataHash: null, // To be updated after off-chain storage
        },
      });

      surveyVersionId = surveyVersion.id;
    } else {
      // Editing an existing survey
      surveyId = surveyData.id;

      // Step 3: Create a new version for the existing survey
      const surveyVersion = await prisma.surveyVersion.create({
        data: {
          surveyId,
          versionNumber: surveyData.currentVersion + 1,
          metadataHash: null, // To be updated after off-chain storage
        },
      });

      surveyVersionId = surveyVersion.id;

      // Update the survey's current version
      await prisma.survey.update({
        where: { id: surveyId },
        data: { currentVersion: surveyData.currentVersion + 1 },
      });
    }

    // Step 4: Create questions and options
    await Promise.all(
      surveyData.questions.map(async (question: any, index: number) => {
        const surveyQuestion = await prisma.surveyQuestion.create({
          data: {
            surveyVersionId: surveyVersionId,
            text: question.text,
            questionType: question.type,
            order: index,
          },
        });

        if (question.options) {
          await Promise.all(
            question.options.map((option: any, order: any) =>
              prisma.questionOption.create({
                data: {
                  questionId: surveyQuestion.id,
                  text: option,
                  order,
                },
              })
            )
          );
        }
      })
    );

    // Step 5: Handle publishing and blockchain operations
    if (surveyData.isPublished) {
      // const metadataHash = await storeMetadataOffChain(surveyData);
      // await prisma.surveyVersion.update({
      //   where: { id: surveyVersionId },
      //   data: { metadataHash },
      // });
      // await storeHashOnChain(metadataHash);
      console.log('Survey published');
    }

    res.status(200).json({ message: 'Survey saved successfully' });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ message: 'Error saving survey' });
  }
};

export default handleSaveFinish;
