import { useState } from 'react';
import { Tweet as TweetType } from '@prisma/client';
import useSWR, { mutate } from 'swr';

type TweetDetailProps = {
  tweet: TweetType;
};

const TweetDetail: React.FC<TweetDetailProps> = ({ tweet }) => {
  const [liked, setLiked] = useState(false);
  const { data: likes } = useSWR<number>(`/api/tweet/${tweet.id}/likes`);

  const handleLike = async () => {
    setLiked(true);
    try {
      await fetch(`/api/tweet/${tweet.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      mutate(`/api/tweet/${tweet.id}/likes`);
    } catch (error) {
      console.error(error);
    } finally {
      setLiked(false);
    }
  };

  return (
    <div>
      <h1>Tweet Detail</h1>
      <div>{tweet.content}</div>
      <div>
        <button
          onClick={handleLike}
          disabled={liked}>
          Like
        </button>
        {likes} likes
      </div>
    </div>
  );
};

export default TweetDetail;
