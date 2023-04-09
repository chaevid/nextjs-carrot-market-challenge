import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from '../lib/session';

const Index: React.FC = () => {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/home');
    } else {
      router.push('/log-in');
    }
  }, [session, router]);

  return <div>Loading...</div>;
};

export default Index;
