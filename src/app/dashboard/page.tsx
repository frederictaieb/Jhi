'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThreeColumnsContainer from '@/components/ThreeColumnsContainer';
import AuthGuard from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div>
        <Header />
        <main>
          <ThreeColumnsContainer />
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
} 