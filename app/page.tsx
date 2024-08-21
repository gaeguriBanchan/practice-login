'use client';

import Link from 'next/link';
import { GiGrapes } from 'react-icons/gi';
// import '@/lib/db';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-20 p-6">
      <div className="flex flex-col items-center gap-2 *:font-medium">
        {/* <LuGrape className="text-lime-500 text-9xl" /> */}
        <GiGrapes className="text-lime-500 text-9xl" />
        <h2 className="text-2xl">뽀리농장</h2>
        <h2 className="text-2xl">어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn text-lg py-2.5">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/log-in" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
