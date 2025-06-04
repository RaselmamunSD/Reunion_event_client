import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileFrames from '@/components/ProfileFrames';

const ProfileFramesPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <ProfileFrames />
      </div>
    </MainLayout>
  );
};

export default ProfileFramesPage; 