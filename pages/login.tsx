import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';
import awsExports from 'src/aws-exports';
import { useEffect } from 'react';
import Profile from 'components/Profile';
import { Page } from 'components';

Amplify.configure(awsExports);

const Login = ({ user }: any) => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, [user]);

  return (
    <Page>
      <Profile />
    </Page>
  );
};

export default withAuthenticator(Login);
