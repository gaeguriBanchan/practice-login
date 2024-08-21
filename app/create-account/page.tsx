'use client';

import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Input from '@/components/input';
import Btn from '@/components/btn';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-10 px-6">
      <div className="flex flex-col gap-2 font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h1 className="text-2xl">뽀리농장 이용을 위해 가입해 주세요.</h1>
        <h2 className="text-xl">양식을 작성하고 가입!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="UserName"
          img="username"
          required
          errors={state?.fieldErrors.username}
          minLength={1}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          img="email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          img="password"
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          img="password"
          required
          errors={state?.fieldErrors.confirmPassword}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Btn text="Create Account" />
      </form>
    </div>
  );
}
