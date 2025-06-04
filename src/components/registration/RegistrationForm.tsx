import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FormFields from './FormFields';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

const RegistrationForm = () => {
  // Create array of years from 1995 to current year
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1994 }, (_, i) => 1995 + i);
  
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    profession: '',
    mobile: '',
    email: '',
    familyMembers: '0',
    specialRequests: '',
    paymentMethod: 'bkash',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "নাম প্রয়োজন",
        description: "অনুগ্রহ করে আপনার নাম প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.mobile.trim()) {
      toast({
        title: "মোবাইল নম্বর প্রয়োজন",
        description: "অনুগ্রহ করে আপনার মোবাইল নম্বর প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "ইমেইল প্রয়োজন",
        description: "অনুগ্রহ করে আপনার ইমেইল প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    if (formData.paymentMethod !== 'cash' && !formData.transactionId.trim()) {
      toast({
        title: "লেনদেন আইডি প্রয়োজন",
        description: "অনুগ্রহ করে লেনদেন আইডি প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/registrations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          batch: formData.batch || null,
          profession: formData.profession.trim() || null,
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          family_members: parseInt(formData.familyMembers),
          special_requests: formData.specialRequests.trim() || null,
          payment_method: formData.paymentMethod,
          transaction_id: formData.transactionId.trim() || null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      }

      toast({
        title: "রেজিস্ট্রেশন সফল হয়েছে!",
        description: "আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে। যোগাযোগের তথ্যে আপনি নিশ্চিতকরণ পাবেন।",
      });
      
      // Reset form
      setFormData({
        name: '',
        batch: '',
        profession: '',
        mobile: '',
        email: '',
        familyMembers: '0',
        specialRequests: '',
        paymentMethod: 'bkash',
        transactionId: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
        description: error instanceof Error ? error.message : "দুঃখিত, রেজিস্ট্রেশন সম্পন্ন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 islamic-card">
      <h2 className="bengali-text text-2xl font-bold text-islamic-green mb-6">আপনার তথ্য প্রদান করুন</h2>
      
      <FormFields
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        batchYears={batchYears}
      />

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-islamic-green hover:bg-islamic-green/90 text-white py-2 rounded-md bengali-text text-lg"
        >
          {isSubmitting ? 'প্রক্রিয়াজাতকরণ...' : 'রেজিস্ট্রেশন সম্পন্ন করুন'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
