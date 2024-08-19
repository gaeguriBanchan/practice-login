'use client';

import FormBtn from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { useFormState } from 'react-dom';
import { FaFireAlt } from 'react-icons/fa';
import { checkLogin, login } from './actions';
// import '@/lib/db';

export default function Home() {
  const [state, dispatch] = useFormState(checkLogin, null);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <FaFireAlt className="text-red-500 text-5xl" />
      <form action={dispatch} className="flex flex-col gap-1">
        <FormInput
          img="email"
          name="email"
          placeholder="Email"
          required
          type="email"
          errors={state?.errors?.fieldErrors.email}
        />
        <FormInput
          img="username"
          name="username"
          placeholder="UserName"
          required
          type="text"
          errors={state?.errors?.fieldErrors.username}
        />
        <FormInput
          img="password"
          name="password"
          placeholder="Password"
          required
          type="password"
          errors={state?.errors?.fieldErrors.password}
        />
        <FormBtn text="Login" />
        {state?.log === true ? (
          <div className="w-full bg-red-500 rounded-lg h-10 mx-auto text-center content-center text-white">
            Welcome!
          </div>
        ) : null}
      </form>
    </div>
  );
}
