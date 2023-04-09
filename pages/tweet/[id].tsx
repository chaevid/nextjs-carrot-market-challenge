import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tweet as TweetType } from '@prisma/client';
import TweetDetail from '../../components/TweetDetail';

const TweetPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tweet, setTweet] = useState<TweetType | null>(null);

  useEffect(() => {
    if (id) {
      // Replace with your actual API call
      fetch(`/api/tweet/${id}`)
        .then((response) => response.json())
        .then((data) => setTweet(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!tweet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TweetDetail tweet={tweet} />
    </div>
  );
};

export default TweetPage;
