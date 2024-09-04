import { Grid2 } from '@mui/material';
import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import QuestionEditorDetail from './QuestionEditorDetail';
import QuestionEditorSidebar from './QuestionEditorSidebar';

const QuestionEditor: React.FC = () => {
  const { selectedQuestion, isAddingNewQuestion, resetNewQuestion, selectQuestion } = useSurveyBuilder();

  const handleAddNew = () => {
    selectQuestion(null);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 3 }}>
        <QuestionEditorSidebar onAddNew={handleAddNew} />
      </Grid2>
      <Grid2 size={{ xs: 9 }}>
        <QuestionEditorDetail
          question={selectedQuestion || resetNewQuestion()}
          isNew={isAddingNewQuestion}
          onAddNew={handleAddNew}
        />
      </Grid2>
    </Grid2>
  );
};

export default QuestionEditor;
