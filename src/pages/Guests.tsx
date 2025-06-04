import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Users, Star } from 'lucide-react';

// Guest member type - updated to match backend model
interface Guest {
  id: number;
  name: string;
  role?: string | null; // Added new role field
  profession?: string | null; // Using profession from backend
  contact?: string | null; // Using contact from backend
  profile_picture?: string | null; // Using profile_picture from backend
  created_at: string;
  updated_at: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

const Guests = () => {
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(`${API_URL}/guests/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Error response:', errorData);
          throw new Error(errorData?.detail || 'Failed to fetch guests.');
        }

        const data: Guest[] = await response.json();
        setAllGuests(data);
      } catch (err) {
        console.error('Error fetching guests:', err);
        setError('Failed to load guests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []); // Empty dependency array means this effect runs once on mount

  // Filter guests based on role for Chief/Special section - Updated to include new roles
  const chiefSpecialGuests = allGuests.filter(guest => 
    guest.role === 'প্রধান অতিথি' || 
    guest.role === 'বিশেষ অতিথি' ||
    guest.role === 'সভাপতিত্ব' ||
    guest.role === 'সার্বিক ত্বত্তবধান'
  );

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="bg-islamic-green text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Users className="mr-3" size={32} />
              <h1 className="bengali-text text-3xl md:text-4xl font-bold">সম্মানিত অতিথিবৃন্দ</h1>
            </div>
            <p className="bengali-text text-lg">মিলনী অনুষ্ঠানের বিশিষ্ট অতিথিগণ</p>
          </div>
        </div>
      </section>

      {/* Loading and Error Handling */}
      {loading && <p className="bengali-text text-center mt-8">অতিথি লোড হচ্ছে...</p>}
      {error && <p className="bengali-text text-center mt-8 text-red-500">{error}</p>}
      
      {!loading && !error && allGuests.length === 0 && (
        <p className="bengali-text text-center mt-8 text-gray-600">কোন অতিথি পাওয়া যায়নি।</p>
      )}

      {!loading && !error && allGuests.length > 0 && (
        <>
          {/* Chief Guests */}
          <section className="py-12">
            <div className="container-custom">
              <h2 className="heading-secondary text-center mb-10 bengali-text">প্রধান ও বিশেষ অতিথি</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {chiefSpecialGuests.map((guest) => (
                  <div key={guest.id} className="islamic-card text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {guest.profile_picture ? (
                        <img 
                          src={guest.profile_picture} 
                          alt={guest.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl text-gray-500">{guest.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex justify-center mb-2">
                      {/* Display star icon only for Chief/Special guests */}
                      <Star className="text-islamic-gold" size={20} />
                    </div>
                    <h3 className="bengali-text text-xl font-semibold text-islamic-green mb-2">
                      {guest.name}
                    </h3>
                    {/* Display role as a badge after name */}
                    {guest.role && (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm bengali-text font-medium mb-2 ${
                        guest.role === 'প্রধান অতিথি' 
                          ? 'bg-islamic-gold text-islamic-dark' 
                          : guest.role === 'বিশেষ অতিথি'
                          ? 'bg-islamic-green text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {guest.role}
                      </span>
                    )}
                    {/* Display profession as title/description below the name and role */}
                    {guest.profession && <p className="bengali-text text-gray-600 mb-2">{guest.profession}</p>}
                    {guest.contact && <p className="bengali-text text-sm">যোগাযোগ: {guest.contact}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Program Schedule */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-secondary bengali-text mb-6">অতিথিদের সাথে কর্মসূচি</h2>
            <div className="islamic-card">
              <div className="space-y-4 bengali-text">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>সকাল ১০:৩০</span>
                  <span>অতিথি অভ্যর্থনা</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>সকাল ১১:০০</span>
                  <span>উদ্বোধনী অনুষ্ঠান</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>দুপুর ১২:৩০</span>
                  <span>প্রধান অতিথির বক্তব্য</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>বিকাল ৪:০০</span>
                  <span>সম্মাননা প্রদান অনুষ্ঠান</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>সন্ধ্যা ৬:০০</span>
                  <span>সাংস্কৃতিক অনুষ্ঠান</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Guests;
