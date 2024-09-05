import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface Survey {
  id: string;
  title: string;
  description: string;
  creator: string;
  questions: number;
}

interface MySurveysListProps {
  surveys: Survey[];
}

const MySurveysList: React.FC<MySurveysListProps> = ({ surveys }) => {
  return (
    <List>
      {surveys.map((survey) => (
        <ListItem
          key={survey.id}
          sx={{
            padding: '1rem',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ListItemText
            primary={
              <Typography variant="h6">
                {survey.title.length > 40 ? `${survey.title.slice(0, 40)}...` : survey.title}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                  {survey.description.length > 40 ? `${survey.description.slice(0, 40)}...` : survey.description}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'inline', marginLeft: '1rem' }}>
                  Creator: {survey.creator}
                </Typography>
              </>
            }
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="caption">Questions: {survey.questions}</Typography>
            <Button variant="outlined" color="primary">
              Take Survey
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MySurveysList;
