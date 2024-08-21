'use client';

import { useFormState } from 'react-dom';
import { GiGrapes } from 'react-icons/gi';
import { login } from './actions';
import Input from '@/components/input';
import Btn from '@/components/btn';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <GiGrapes className="text-lime-500 text-9xl" />
      <form action={dispatch} className="flex flex-col gap-1">
        <Input
          img="email"
          name="email"
          placeholder="Email"
          required
          type="email"
          errors={state?.fieldErrors?.email}
        />
        <Input
          img="password"
          name="password"
          placeholder="Password"
          required
          type="password"
          errors={state?.fieldErrors?.password}
        />
        <Btn text="Login" />
      </form>
    </div>
  );
}
