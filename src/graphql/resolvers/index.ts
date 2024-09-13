import { addSurveyQuestion } from './addSurveyQuestion';
import { archiveSurvey } from './archiveSurvey';
import { createSurvey } from './createSurvey';
import { deleteSurveyQuestion } from './deleteSurveyQuestion';
import { getAllSurveys } from './getAllSurveys';
import { getMySurveys } from './getMySurveys';
import { getSurvey } from './getSurvey';
import { updateSurvey } from './updateSurvey';
import { updateSurveyQuestion } from './updateSurveyQuestion';

export const resolvers = {
  Query: {
    surveys: getAllSurveys,
    survey: getSurvey,
    mySurveys: getMySurveys,
  },
  Mutation: {
    createSurvey,
    updateSurvey,
    archiveSurvey,
    addSurveyQuestion,
    updateSurveyQuestion,
    deleteSurveyQuestion,
  },
};
