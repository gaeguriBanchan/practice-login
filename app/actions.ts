'use server';
import { date, z } from 'zod';

const checkUsername = (username: string) => {
  const list = ['fuck', '바보', '멍청이'];
  return !list.map((target) => username.includes(target)).includes(true);
  // return !username.includes('fuck',);
};

const checkPasswords = ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  return password === '12345';
};
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '이름은 문자열이여야 합니다.',
        required_error: '이름을 입력 해주세요.',
      })
      .min(3, '3글자 이상 입력하세요.')
      .max(10, '10글자 이하로 입력하세요.')
      .refine(checkUsername, '욕설이 포함되면 안됩니다.'),
    email: z.string().email('유효한 이메일 형식이 아닙니다.'),
    password: z.string().min(5, '비밀번호는 5글자 이상 작성하세요.'),
  })
  .refine(checkPasswords, {
    message: '비밀번호를 다시 확인하세요.',
    path: ['password'],
  });

export async function checkLogin(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten() };
  }
  if (data.password === '12345') {
    return { log: true };
  }
}

export async function login(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  if (data.password !== '12345') {
    return {
      errors: ['Wrong Password!'],
    };
  } else {
    return {
      login: true,
    };
  }
}
