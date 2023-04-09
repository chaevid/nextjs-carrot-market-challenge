import { Tweet as TweetType } from '@prisma/client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TweetList: React.FC = () => {
  const { data, error } = useSWR<TweetType[]>('/api/tweets', fetcher);

  if (error) {
    return <div>Error loading tweets.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((tweet) => (
        <div key={tweet.id}>{tweet.content}</div>
      ))}
    </div>
  );
};

export default TweetList;
