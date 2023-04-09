import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  content: string;
};

const NewTweetForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // Replace with your actual API call
      await fetch('/api/tweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        name="content"
        ref={register({ required: true })}
      />
      {errors.content && <div>Please enter tweet content.</div>}
      <button
        type="submit"
        disabled={submitting}>
        Post Tweet
      </button>
    </form>
  );
};

export default NewTweetForm;
