import { useQuery } from '@apollo/client';
import { CircularProgress, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { MySurveyDetailsProvider } from '@/contexts/MySurveyDetailsContext';
import { PublicSurveyDetailsProvider } from '@/contexts/PublicSurveyDetailsContext';
import GET_SURVEY from '@/graphql/queries/GetSurvey';
import { Survey as GQLSurvey } from '@/graphql/types';
import { transformSurvey } from '@/types';
import MySurveyDetailsView from '@/views/survey-details/MySurveyDetailsView';
import PublicSurveyDetailsView from '@/views/survey-details/PublicSurveyDetailsView';

const SurveyDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const { loading, error, data } = useQuery(GET_SURVEY, {
    variables: { id: id as string },
  });

  if (loading) return <CircularProgress />;
  if (error || !data?.survey) {
    return router.push('/404');
  }

  const isCreator = data?.survey?.creator?.id === session?.user?.id;
  const survey = transformSurvey(data?.survey as GQLSurvey);

  return (
    <Container maxWidth="lg" sx={{ mt: '2rem' }}>
      {isCreator ? (
        <MySurveyDetailsProvider survey={survey}>
          <MySurveyDetailsView />
        </MySurveyDetailsProvider>
      ) : (
        <PublicSurveyDetailsProvider survey={survey}>
          <PublicSurveyDetailsView />
        </PublicSurveyDetailsProvider>
      )}
    </Container>
  );
};

export default SurveyDetailsPage;
