"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPassword from '@/src/components/Auth/ResetPassword';

const Page = () => {
  const searchParams = useSearchParams();
  const activationToken = searchParams.get("verify") ?? "";
  return (
    <ResetPassword activationToken = {activationToken}/>
  );
}

export default Page;
