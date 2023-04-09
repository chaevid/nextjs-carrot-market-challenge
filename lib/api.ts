import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useTweets = () => {
  const { data: tweets, error, mutate } = useSWR('/api/tweets', fetcher);
  return { tweets, error, mutate };
};

export const useTweet = (id: string) => {
  const { data: tweet, error, mutate } = useSWR(`/api/tweet/${id}`, fetcher);
  return { tweet, error, mutate };
};
