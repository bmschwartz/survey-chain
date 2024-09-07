import { createSurvey } from './createSurvey';
import { getAllSurveys } from './getAllSurveys';
import { getSurvey } from './getSurvey';

// import { updateSurvey } from './updateSurvey';

export const resolvers = {
  Query: {
    surveys: getAllSurveys,
    survey: getSurvey,
  },
  Mutation: {
    createSurvey,
    // updateSurvey,
  },
};
