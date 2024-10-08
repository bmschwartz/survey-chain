import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, CardContent, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { QuestionType, SurveyQuestion } from '@/types';
import { questionTypeToDisplay } from '@/utils/question';

const SurveyPreview: React.FC = () => {
  const { title, description, questions } = useSurveyBuilder();
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleChange = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h6">Review Your Survey:</Typography>
      <Typography variant="h5" align="center" sx={{ marginBottom: '1rem' }}>
        {title}
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginBottom: '1.5rem' }}>
        {description}
      </Typography>
      <Divider />
      {questions.map((question: SurveyQuestion, index: number) => {
        const isExpandable = question.questionType !== QuestionType.FillInTheBlank;
        return (
          <Accordion
            key={index}
            expanded={isExpandable ? expanded === index : true}
            onChange={() => isExpandable && handleChange(index)}
            sx={{
              marginY: '1rem',
              paddingY: '0.5rem',
              borderRadius: '8px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={isExpandable ? <ExpandMoreIcon /> : null}
              sx={{
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                '& .MuiAccordionSummary-content': {
                  marginLeft: '1rem',
                  alignItems: 'center',
                },
              }}
            >
              <Typography variant="h6" sx={{ flexShrink: 0 }}>
                Q{index + 1}: {question.text}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', marginLeft: 'auto', marginRight: '8px' }}>
                {questionTypeToDisplay(question.questionType)}
              </Typography>
            </AccordionSummary>
            {isExpandable && (
              <AccordionDetails sx={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <CardContent>
                  {question.questionType === QuestionType.RatingScale ? (
                    <>
                      <Typography variant="body2">Min: {question.minValue}</Typography>
                      <Typography variant="body2">Max: {question.maxValue}</Typography>
                    </>
                  ) : (
                    question.options?.map((option, optionIndex) => (
                      <Typography key={optionIndex} variant="body2">
                        - {option.text}
                      </Typography>
                    ))
                  )}
                </CardContent>
              </AccordionDetails>
            )}
          </Accordion>
        );
      })}
    </div>
  );
};

export default SurveyPreview;
