'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkUsername = (username: string) => {
  const list = ['fuck', '바보', '멍청이'];
  return !list.map((target) => username.includes(target)).includes(true);
};

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  return password === confirmPassword;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '이름은 문자열이여야 합니다.',
        required_error: '이름을 입력 해주세요.',
      })
      .min(1, '1글자 이상 입력하세요.')
      .max(10, '10글자 이하로 입력하세요.')
      .toLowerCase()
      .trim()
      .refine(
        // false 면 출력됨.
        checkUsername,
        '욕설이 포함된 것은 안됩니다.'
      ),
    email: z.string().email('유효한 이메일 형식이 아닙니다.').toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, '비밀번호는 9글자 이상 작성하세요.')
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, '비밀번호는 9글자 이상 작성하세요.'),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 이름 입니다.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 이메일 입니다.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: '두 비밀번호가 동일해야 합니다.',
    path: ['confirmPassword'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });
    // log the user in
    const session = await getSession();
    session.id = user.id;
    await session.save();
    // redirect "/profile"
    redirect('/profile');
  }
}
