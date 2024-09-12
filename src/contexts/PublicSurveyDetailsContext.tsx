import React, { createContext, ReactNode, useContext } from 'react';

import { Survey } from '@/types';

interface PublicSurveyDetailsContextType {
  survey: Survey;
}

const PublicSurveyDetailsContext = createContext<PublicSurveyDetailsContextType | undefined>(undefined);

export const usePublicSurveyDetails = () => {
  const context = useContext(PublicSurveyDetailsContext);
  if (!context) {
    throw new Error('usePublicSurveyDetails must be used within a PublicSurveyDetailsProvider');
  }
  return context;
};

interface PublicSurveyDetailsProviderProps {
  children: ReactNode;
  survey: Survey;
}

export const PublicSurveyDetailsProvider: React.FC<PublicSurveyDetailsProviderProps> = ({ survey, children }) => {
  return <PublicSurveyDetailsContext.Provider value={{ survey }}>{children}</PublicSurveyDetailsContext.Provider>;
};
