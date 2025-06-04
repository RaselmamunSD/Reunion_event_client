import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';

// Committee member type
interface CommitteeMember {
  id: number;
  name: string;
  role: string;
  profession?: string | null;
  contact?: string | null; // Allow null as per model blank=True, null=True
  profile_picture?: string | null; // Allow null as per model null=True, blank=True
  created_at: string;
  updated_at: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const Committee = () => {
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/organizing-committee/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.detail || 'Failed to fetch committee members');
        }

        const data = await response.json();
        setCommitteeMembers(data);
      } catch (err) {
        console.error('Error fetching committee members:', err);
        setError('Failed to load organizing committee members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommitteeMembers();
  }, []); // Empty dependency array means this effect runs once on mount

  // Removed Sample sub-committee data
  // const subCommittees = [ ... ];

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-islamic-green py-10 mb-10">
        <div className="container-custom">
          <h1 className="bengali-text text-white text-3xl md:text-4xl font-bold text-center">আয়োজন কমিটি</h1>
        </div>
      </div>

      <div className="container-custom pb-16">
        {/* Main Committee */}
        <section className="mb-12">
          <h2 className="heading-secondary bengali-text text-center mb-10">মূল আয়োজন কমিটি</h2>
          {loading && <p className="bengali-text text-center">সদস্য লোড হচ্ছে...</p>}
          {error && <p className="bengali-text text-center text-red-500">{error}</p>}
          {!loading && !error && committeeMembers.length === 0 && (
            <p className="bengali-text text-center text-gray-600">কোন সদস্য পাওয়া যায়নি।</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((member) => (
              <div key={member.id} className="islamic-card text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-islamic-light flex items-center justify-center border-2 border-islamic-green overflow-hidden">
                  {member.profile_picture ? (
                    <img 
                      src={`${BACKEND_URL}${member.profile_picture}`} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = ''; // Clear the src to show the fallback
                        target.onerror = null; // Prevent infinite loop
                      }}
                    />
                  ) : (
                    <span className="text-3xl text-islamic-green">{member.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="bengali-text text-xl font-bold text-islamic-green mb-1">{member.name}</h3>
                <p className="bengali-text font-medium text-islamic-dark mb-2">{member.role}</p>
                {member.profession && (
                  <p className="bengali-text text-sm mb-1">পেশা: {member.profession}</p>
                )}
                {member.contact && (
                  <p className="bengali-text text-sm">যোগাযোগ: {member.contact}</p>
                )}
              </div>
            ))}
          </div>
        </section>

    
        {/* Removed Sub Committees Section */}
        {/*
        <section>
          <h2 className="heading-secondary bengali-text text-center mb-10">উপ-কমিটি সমূহ</h2>
          <div className="space-y-10">
            {subCommittees.map((committee) => (...)}
          </div>
        </section>
        */}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <h3 className="bengali-text text-xl mb-4">আরও তথ্যের জন্য যোগাযোগ করুন</h3>
          <p className="bengali-text mb-6">মাওলানা ইমরান হোসেন (সাধারণ সম্পাদক):01768807226</p>
          <a href="/contact" className="btn-primary bengali-text">যোগাযোগ পৃষ্ঠায় যান</a>
        </div>
      </div>
    </MainLayout>
  );
};

export default Committee;
