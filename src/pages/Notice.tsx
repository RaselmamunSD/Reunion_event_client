import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Calendar, Bell } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

const Notice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${API_URL}/notices/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error response:', errorData);
        throw new Error(errorData?.detail || 'Failed to fetch notices.');
      }

      const data = await response.json();
      setNotices(data);
    } catch (err) {
      console.error('Error fetching notices:', err);
      setError('Failed to load notices. Please try again later.');
      toast({
        title: "নোটিশ লোড করতে ব্যর্থ হয়েছে",
        description: "দুঃখিত, নোটিশ লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
    
    // Set up polling every 30 seconds
    const intervalId = setInterval(fetchNotices, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <MainLayout>
        <section className="bg-islamic-green text-white py-12">
          <div className="container-custom text-center">
            <h1 className="bengali-text text-3xl md:text-4xl font-bold">নোটিশ বোর্ড</h1>
            <p className="bengali-text text-lg">লোড হচ্ছে...</p>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <section className="bg-islamic-green text-white py-12">
          <div className="container-custom text-center">
            <h1 className="bengali-text text-3xl md:text-4xl font-bold">নোটিশ বোর্ড</h1>
            <p className="bengali-text text-lg text-red-300">{error}</p>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="bg-islamic-green text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Bell className="mr-3" size={32} />
              <h1 className="bengali-text text-3xl md:text-4xl font-bold">নোটিশ বোর্ড</h1>
            </div>
            <p className="bengali-text text-lg">গুরুত্বপূর্ণ ঘোষণা ও তথ্য</p>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid gap-6 max-w-4xl mx-auto">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice.id}
                  className={`islamic-card ${notice.date === new Date().toISOString().split('T')[0] ? 'border-l-4 border-l-yellow-500 bg-yellow-50' : ''}`} // Highlight notices from today
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="bengali-text text-xl font-semibold text-islamic-green">
                      {notice.title}
                    </h3>
                    {/* We don't have an 'important' flag in the backend yet, using date for highlight */}
                    {notice.date === new Date().toISOString().split('T')[0] && (
                       <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs bengali-text">
                       আজকের নোটিশ
                     </span>
                    )}
                  </div>

                  <p className="bengali-text text-gray-700 leading-relaxed mb-4">
                    {notice.content}
                  </p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span className="bengali-text">{new Date(notice.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="bengali-text text-center text-gray-600">এই মুহূর্তে কোন নোটিশ নেই।</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact for More Info */}
      <section className="py-12 bg-islamic-light">
        <div className="container-custom text-center">
          <h2 className="heading-secondary bengali-text mb-4">আরও তথ্যের জন্য</h2>
          <p className="bengali-text text-lg mb-6">
            কোন প্রশ্ন বা অতিরিক্ত তথ্যের জন্য যোগাযোগ করুন
          </p>
          <div className="bengali-text">
            <p className="mb-2">মোবাইল:01768807226</p>
            <p>ইমেইল:@gmail.com</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Notice;
