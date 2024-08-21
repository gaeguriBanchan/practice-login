'use client';

import { useFormStatus } from 'react-dom';

export default function Btn({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full h-8 rounded-3xl bg-lime-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed text-white hover:scale-110 hover:bg-lime-400 transition-all"
    >
      {pending ? 'Loading...' : text}
    </button>
  );
}
