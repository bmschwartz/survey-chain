import React, { createContext, ReactNode, useContext } from 'react';

import { Survey } from '@/types';

interface MySurveyDetailsContextType {
  survey: Survey;
}

const MySurveyDetailsContext = createContext<MySurveyDetailsContextType | undefined>(undefined);

export const useMySurveyDetails = () => {
  const context = useContext(MySurveyDetailsContext);
  if (!context) {
    throw new Error('useMySurveyDetails must be used within a MySurveyDetailsProvider');
  }
  return context;
};

interface MySurveyDetailsProviderProps {
  children: ReactNode;
  survey: Survey;
}

export const MySurveyDetailsProvider: React.FC<MySurveyDetailsProviderProps> = ({ survey, children }) => {
  return <MySurveyDetailsContext.Provider value={{ survey }}>{children}</MySurveyDetailsContext.Provider>;
};
