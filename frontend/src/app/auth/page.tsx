import React, { Suspense } from 'react';
import AuthClient from './AuthClient';

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md mx-auto py-20 text-center text-sm text-gray-500">Loading...</div>}>
      <AuthClient />
    </Suspense>
  );
}
