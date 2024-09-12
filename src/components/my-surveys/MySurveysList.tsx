import { useQuery } from '@apollo/client';
import { Archive as ArchiveIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import GET_MY_SURVEYS from '@/graphql/queries/GetMySurveys';

interface MySurveyItem {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  archived: boolean;
  visibility: string;
  responseCount: number;
  questionCount: number;
}

const MySurveysList: React.FC = () => {
  const router = useRouter();
  const [surveys, setSurveys] = React.useState<MySurveyItem[]>([]);

  useQuery(GET_MY_SURVEYS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setSurveys(
        data.mySurveys.map((survey: any) => ({
          id: survey.id,
          title: survey.title,
          description: survey.description,
          isPublished: survey.isPublished,
          archived: survey.archived,
          visibility: survey.visibility,
          responseCount: survey.responses.length,
          questionCount: survey.questions.length,
        }))
      );
    },
  });

  const handleViewDetailsClick = (surveyId: string) => {
    return router.push(`/surveys/${surveyId}`);
  };

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
            alignItems: 'center',
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
                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '0.5rem' }}>
                  {survey.description.length > 100 ? `${survey.description.slice(0, 100)}...` : survey.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`${survey.questionCount} Questions`} color="info" />
                  <Chip label={`${survey.responseCount} Responses`} color="secondary" />
                </Box>
              </>
            }
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title={survey.archived ? 'Archived' : 'Active'}>
              <IconButton>
                <ArchiveIcon color={survey.archived ? 'error' : 'success'} />
              </IconButton>
            </Tooltip>
            <Tooltip title={survey.visibility === 'public' ? 'Public' : 'Private'}>
              <IconButton>
                <VisibilityIcon color={survey.visibility === 'public' ? 'primary' : 'disabled'} />
              </IconButton>
            </Tooltip>
            <Button variant="outlined" color="primary" onClick={() => handleViewDetailsClick(survey.id)}>
              View Details
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MySurveysList;
