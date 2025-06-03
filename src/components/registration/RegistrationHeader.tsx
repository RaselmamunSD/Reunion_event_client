
import React from 'react';
import ProfileBuilder from '../ProfileBuilder';

const RegistrationHeader = () => {
  return (
    <div className="bg-islamic-green py-10 mb-10">
      <div className="container-custom">
        <h1 className="bengali-text text-white text-3xl md:text-4xl font-bold text-center">রেজিস্ট্রেশন ফর্ম</h1>
        <div className="flex justify-center mt-6">
          <ProfileBuilder />
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;
