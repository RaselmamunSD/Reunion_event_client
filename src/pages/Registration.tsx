
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import RegistrationHeader from '../components/registration/RegistrationHeader';
import RegistrationInstructions from '../components/registration/RegistrationInstructions';
import RegistrationForm from '../components/registration/RegistrationForm';

const Registration = () => {
  return (
    <MainLayout>
      <RegistrationHeader />

      <div className="container-custom pb-16">
        <div className="max-w-3xl mx-auto">
          <RegistrationInstructions />
          <RegistrationForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Registration;
