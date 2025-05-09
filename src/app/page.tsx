'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectInfo from '@/components/ProjectInfo';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const styles = {
  container: 'min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8',
  content: 'flex flex-col items-center justify-center',
};

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ProjectInfo />
        <AuthForm />
      </div>
    </div>
  );
}
