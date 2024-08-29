import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, IconButton, List, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { questionTypeToDisplay } from '@/utils/question';

const QuestionEditorSidebar: React.FC = () => {
  const { questions, selectedQuestionId, addQuestion, selectQuestion } = useSurveyBuilder();
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = listRef.current;
      if (el) {
        setIsScrolledUp(el.scrollTop === 0);
        setIsScrolledDown(el.scrollTop + el.clientHeight < el.scrollHeight);
      }
    };

    const listEl = listRef.current;
    if (listEl) {
      listEl.addEventListener('scroll', handleScroll);
      handleScroll(); // Check scroll position on load
    }

    return () => {
      if (listEl) {
        listEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollUp = () => {
    listRef.current?.scrollBy({ top: -150 * 6, behavior: 'smooth' }); // Scroll up 6 items
  };

  const scrollDown = () => {
    listRef.current?.scrollBy({ top: 150 * 6, behavior: 'smooth' }); // Scroll down 6 items
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={addQuestion}
        sx={{
          marginBottom: '1rem',
          width: '100%',
          borderRadius: '8px',
        }}
      >
        Add New Question
      </Button>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            ref={listRef}
            sx={{
              maxHeight: '900px', // Height to show 6 items
              overflowY: 'auto', // Enable scrolling
              scrollbarWidth: 'none', // Hide scrollbar for Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for WebKit browsers
              },
            }}
          >
            <List>
              {questions.map((question, index) => (
                <ListItemButton
                  key={question.id}
                  selected={question.id === selectedQuestionId}
                  onClick={() => selectQuestion(question.id)}
                  sx={{
                    marginBottom: '0.5rem',
                    padding: '0',
                  }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      backgroundColor: question.id === selectedQuestionId ? '#e0f7fa' : '#ffffff', // Change color for selected
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <CardContent sx={{ pr: 3 }}>
                      <Typography variant="subtitle1">
                        {index + 1}.{' '}
                        {question.text.length > 25 ? `${question.text.substring(0, 25)}...` : question.text}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Type: {questionTypeToDisplay(question.type)}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItemButton>
              ))}
            </List>
          </Box>
          {!isScrolledUp && (
            <IconButton
              sx={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                transition: 'opacity 0.3s',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={scrollUp}
            >
              <ArrowUpward sx={{ color: '#000000' }} />
            </IconButton>
          )}
          {!isScrolledDown && (
            <IconButton
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                transition: 'opacity 0.3s',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={scrollDown}
            >
              <ArrowDownward sx={{ color: '#000000' }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionEditorSidebar;
