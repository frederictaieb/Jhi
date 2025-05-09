'use client';

import React from 'react';

const projectStyles = {
  container: 'max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8',
  title: 'text-3xl font-bold mb-4 text-gray-900 dark:text-white',
  subtitle: 'text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200',
  paragraph: 'mb-4 text-gray-700 dark:text-gray-300',
  list: 'list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300',
  listItem: 'mb-2',
};

const ProjectInfo: React.FC = () => {
  return (
    <div className={projectStyles.container}>
      <h1 className={projectStyles.title}>Bienvenue sur la plateforme XRP</h1>
    </div>
  );
};

export default ProjectInfo; 