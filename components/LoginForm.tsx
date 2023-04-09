import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSession } from '../lib/session';

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const { setSession } = useSession();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const session = await response.json();
        setSession(session);
        router.push('/home');
      } else {
        console.error(await response.text());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        ref={register({ required: true })}
      />
      {errors.email && <div>Please enter your email.</div>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        ref={register({ required: true })}
      />
      {errors.password && <div>Please enter your password.</div>}

      <button
        type="submit"
        disabled={submitting}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
