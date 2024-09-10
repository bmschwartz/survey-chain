import { addSurveyQuestion } from './addSurveyQuestion';
import { createSurvey } from './createSurvey';
import { getAllSurveys } from './getAllSurveys';
import { getMySurveys } from './getMySurveys';
import { getSurvey } from './getSurvey';

// import { updateSurvey } from './updateSurvey';

export const resolvers = {
  Query: {
    surveys: getAllSurveys,
    survey: getSurvey,
    mySurveys: getMySurveys,
  },
  Mutation: {
    createSurvey,
    addSurveyQuestion,
    // updateSurvey,
  },
};
