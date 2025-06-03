import React, { useState, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const API_URL = 'http://localhost:8000/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to send message.');
      }

      toast({
        title: "বার্তা সফলভাবে পাঠানো হয়েছে!",
        description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "বার্তা পাঠাতে ব্যর্থ হয়েছে",
        description: error instanceof Error ? error.message : "দুঃখিত, আপনার বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-islamic-green py-10 mb-10">
        <div className="container-custom">
          <h1 className="bengali-text text-white text-3xl md:text-4xl font-bold text-center">যোগাযোগ করুন</h1>
        </div>
      </div>

      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="heading-secondary bengali-text mb-6">যোগাযোগ তথ্য</h2>
            
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="islamic-card flex">
                <div className="mr-4 text-islamic-green">
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 className="bengali-text font-bold text-lg mb-1">ঠিকানা</h3>
                  <p className="bengali-text">হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা</p>
                  <p className="bengali-text">হাড়ীভাঙ্গা, এয়ার পোর্ট, লালমনিরহাট</p>
                </div>
              </div>
              
              <div className="islamic-card flex">
                <div className="mr-4 text-islamic-green">
                  <Phone size={32} />
                </div>
                <div>
                  <h3 className="bengali-text font-bold text-lg mb-1">ফোন</h3>
                  <p className="bengali-text">প্রধান অফিস: ০১৭১২-৩৪৫৬৭৮</p>
                  <p className="bengali-text">পূনর্মিলন কমিটি: ০১৭২৩-৪৫৬৭৮৯</p>
                </div>
              </div>
              
              <div className="islamic-card flex">
                <div className="mr-4 text-islamic-green">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="bengali-text font-bold text-lg mb-1">ইমেইল</h3>
                  <p className="bengali-text">info@talimulinsanmadrasa.edu.bd</p>
                  <p className="bengali-text">reunion@talimulinsanmadrasa.edu.bd</p>
                </div>
              </div>
              
              <div className="islamic-card flex">
                <div className="mr-4 text-islamic-green">
                  <Clock size={32} />
                </div>
                <div>
                  <h3 className="bengali-text font-bold text-lg mb-1">অফিস সময়</h3>
                  <p className="bengali-text">শনিবার - বৃহস্পতিবার: সকাল ৯টা - বিকাল ৪টা</p>
                  <p className="bengali-text">শুক্রবার: বন্ধ</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="heading-secondary bengali-text mb-6">আমাদের মেসেজ পাঠান</h2>
            <div className="islamic-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="bengali-text block mb-2">আপনার নাম</label>
                  <Input 
                    id="name" 
                    placeholder="আপনার পূর্ণ নাম লিখুন" 
                    required 
                    className="bengali-text w-full" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="bengali-text block mb-2">ইমেইল</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="আপনার ইমেইল ঠিকানা" 
                    required 
                    className="bengali-text w-full" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="bengali-text block mb-2">মোবাইল নম্বর</label>
                  <Input 
                    id="mobile" 
                    placeholder="আপনার মোবাইল নম্বর" 
                    required 
                    className="bengali-text w-full" 
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="bengali-text block mb-2">বিষয়</label>
                  <Input 
                    id="subject" 
                    placeholder="বার্তার বিষয়" 
                    required 
                    className="bengali-text w-full" 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="bengali-text block mb-2">আপনার বার্তা</label>
                  <Textarea 
                    id="message" 
                    placeholder="আপনার বার্তা লিখুন" 
                    required 
                    className="bengali-text w-full h-32" 
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-islamic-green hover:bg-islamic-green/90 text-white py-2 rounded-md bengali-text text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'প্রেরণ করা হচ্ছে...' : 'বার্তা পাঠান'}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Contact note */}
            <div className="mt-8 islamic-card bg-islamic-light border-l-4 border-islamic-gold">
              <h3 className="bengali-text font-bold text-lg mb-2">দ্রষ্টব্য</h3>
              <p className="bengali-text">
                অনুষ্ঠান সংক্রান্ত যেকোনো প্রশ্ন বা জিজ্ঞাসার জন্য আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না। আমরা যথাসম্ভব দ্রুত আপনার প্রশ্নের উত্তর দেওয়ার চেষ্টা করব।
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
