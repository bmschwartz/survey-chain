import { Grid2 } from '@mui/material';
import React from 'react';

import QuestionEditorDetail from './QuestionEditorDetail';
import QuestionEditorSidebar from './QuestionEditorSidebar';

const QuestionEditor: React.FC = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 3 }}>
        <QuestionEditorSidebar />
      </Grid2>
      <Grid2 size={{ xs: 9 }}>
        <QuestionEditorDetail />
      </Grid2>
    </Grid2>
  );
};

export default QuestionEditor;
