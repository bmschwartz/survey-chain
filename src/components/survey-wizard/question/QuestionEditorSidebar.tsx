import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, IconButton, List, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { questionTypeToDisplay } from '@/utils/question';

const QUESTION_CARD_HEIGHT = 120;

interface QuestionEditorSidebarProps {
  onAddNew: () => void;
}

const QuestionEditorSidebar: React.FC<QuestionEditorSidebarProps> = ({ onAddNew }) => {
  const { questions, selectedQuestion, selectQuestion } = useSurveyBuilder();
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = listRef.current;
      if (el) {
        setIsScrolledUp(el.scrollTop === 0);
        setIsScrolledDown(el.scrollTop + el.clientHeight >= el.scrollHeight);
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
    listRef.current?.scrollBy({ top: -QUESTION_CARD_HEIGHT * 5, behavior: 'smooth' });
  };

  const scrollDown = () => {
    listRef.current?.scrollBy({ top: QUESTION_CARD_HEIGHT * 5, behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onAddNew}
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
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          height: 'calc(120px * 5)',
        }}
      >
        <Box
          ref={listRef}
          sx={{
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <List>
            {questions.map((question, index) => (
              <ListItemButton
                key={question.id}
                selected={question.id === selectedQuestion?.id}
                onClick={() => {
                  selectQuestion(question.id);
                }}
                sx={{
                  marginBottom: '0.5rem',
                  padding: '0',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    backgroundColor: question.id === selectedQuestion?.id ? '#e0f7fa' : '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent sx={{ pr: 3 }}>
                    <Typography variant="subtitle1">
                      {index + 1}. {question.text.length > 25 ? `${question.text.substring(0, 25)}...` : question.text}
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
        {!isScrolledDown && questions.length > 5 && (
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
  );
};

export default QuestionEditorSidebar;
