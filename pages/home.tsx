import { useSession } from '../lib/session';
import TweetList from '../components/TweetList';
import NewTweetForm from '../components/NewTweetForm';

const Home: React.FC = () => {
  const { session } = useSession();

  if (!session) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div>
      <NewTweetForm />
      <TweetList />
    </div>
  );
};

export default Home;
