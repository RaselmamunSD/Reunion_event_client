import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface ProfileFrame {
  id: number;
  picture: string;
  name: string;
  mobile: string;
  address: string;
  batch: string;
  blood_type: string;
  created_at: string;
}

const ProfileFrames = () => {
  const [frames, setFrames] = useState<ProfileFrame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchFrames();
  }, []);

  const fetchFrames = async () => {
    try {
      const response = await fetch(`${API_URL}/profile-frame-submissions/`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile frames');
      }
      const data = await response.json();
      setFrames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile frames');
      toast({
        title: "ত্রুটি",
        description: "প্রোফাইল ফ্রেম লোড করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredFrames = frames.filter(frame =>
    frame.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    frame.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green mx-auto"></div>
          <p className="bengali-text mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="bengali-text text-red-600">{error}</p>
        <Button 
          onClick={fetchFrames}
          className="mt-4 bg-islamic-green hover:bg-islamic-green/90"
        >
          আবার চেষ্টা করুন
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="bengali-text text-2xl font-semibold text-islamic-green">প্রোফাইল ফ্রেম</h2>
        <div className="w-full md:w-64">
          <Input
            type="text"
            placeholder="নাম বা ব্যাচ দিয়ে খুঁজুন"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bengali-text"
          />
        </div>
      </div>

      {filteredFrames.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="bengali-text text-gray-600">কোন প্রোফাইল ফ্রেম পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrames.map((frame) => (
            <div key={frame.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="aspect-square relative">
                {frame.picture ? (
                  <img
                    src={`${BACKEND_URL}${frame.picture}`}
                    alt={frame.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = ''; // Clear the src to show the fallback
                      target.onerror = null; // Prevent infinite loop
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl text-gray-400">{frame.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="bengali-text text-lg font-semibold text-islamic-green">{frame.name}</h3>
                <div className="mt-2 space-y-1">
                  {frame.batch && (
                    <p className="bengali-text text-sm text-gray-600">ব্যাচ: {frame.batch}</p>
                  )}
                  {frame.mobile && (
                    <p className="bengali-text text-sm text-gray-600">মোবাইল: {frame.mobile}</p>
                  )}
                  {frame.blood_type && (
                    <p className="bengali-text text-sm text-gray-600">রক্তের গ্রুপ: {frame.blood_type}</p>
                  )}
                  {frame.address && (
                    <p className="bengali-text text-sm text-gray-600">ঠিকানা: {frame.address}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileFrames; 