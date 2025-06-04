import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';

interface Student {
  id: number;
  batch: number;
  photo: string | null;
  name: string;
  profession: string | null;
  phone_number: string | null;
  blood_group: string | null;
  address: string | null;
}

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const StudentPage = () => {
  const [showYears, setShowYears] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1995 + 1 }, (_, i) => String(1995 + i));

  useEffect(() => {
    if (!showYears) {
      fetchStudents(null);
    } else if (selectedBatch) {
      fetchStudents(selectedBatch);
    }
  }, [showYears, selectedBatch]);

  const fetchStudents = async (batch: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const url = batch ? `${API_URL}/students/?batch=${batch}` : `${API_URL}/students/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Failed to fetch students');
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleYearClick = (year: string) => {
    setSelectedBatch(year);
    setShowYears(true);
  };

  const handleBatchAllClick = () => {
    setShowYears(false);
    setSelectedBatch(null);
    fetchStudents(null);
  };

  const getImageUrl = (photoPath: string | null) => {
    if (!photoPath) return null;
    
    // If the photo path is already a full URL, return it as is
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }
    
    // If the photo path starts with /media/, remove it as it's already included in BACKEND_URL
    if (photoPath.startsWith('/media/')) {
      return `${BACKEND_URL}${photoPath}`;
    }
    
    // Otherwise, construct the full URL
    return `${BACKEND_URL}/media/${photoPath}`;
  };

  return (
    <MainLayout>
      <section className="py-16">
        <div className="container-custom text-center">
          <h1 className="bengali-text text-3xl font-bold mb-8">আমাদের সাকসেসফুল ছাত্রদের তথ্য</h1>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={handleBatchAllClick}
              className={`font-bold py-2 px-6 rounded-md transition-colors duration-300 ${
                !showYears ? 'bg-islamic-green text-white hover:bg-islamic-gold' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Batch-All
            </button>
            <button
              onClick={() => setShowYears(true)}
              className={`font-bold py-2 px-6 rounded-md transition-colors duration-300 ${
                showYears ? 'bg-islamic-green text-white hover:bg-islamic-gold' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Batch-Select
            </button>
          </div>

          {showYears && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto mb-8">
              {batchYears.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`islamic-card py-2 px-4 text-islamic-dark font-semibold hover:bg-islamic-light cursor-pointer transition-colors duration-300 ${
                    selectedBatch === year ? 'bg-islamic-gold text-white' : ''
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green mx-auto"></div>
                <p className="bengali-text mt-4 text-gray-600">ছাত্রদের তথ্য লোড হচ্ছে...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center p-4">
              <p className="bengali-text text-red-500">{error}</p>
              <button
                onClick={() => fetchStudents(selectedBatch)}
                className="mt-4 bg-islamic-green text-white px-4 py-2 rounded hover:bg-islamic-gold transition-colors"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(student => (
                <div key={student.id} className="islamic-card text-left">
                  <div className="flex items-center mb-4">
                    {student.photo ? (
                      <img 
                        src={getImageUrl(student.photo)}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-islamic-green"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = ''; // Clear the src to show the fallback
                          target.onerror = null; // Prevent infinite loop
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4 border-2 border-islamic-green">
                        <span className="text-2xl text-gray-500">{student.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="bengali-text text-lg font-semibold text-islamic-green">{student.name}</h3>
                      {student.batch && <p className="bengali-text text-sm text-gray-600">ব্যাচ: {student.batch}</p>}
                    </div>
                  </div>
                  {student.profession && <p className="bengali-text text-gray-700">পেশা: {student.profession}</p>}
                  {student.phone_number && <p className="bengali-text text-gray-700">মোবাইল: {student.phone_number}</p>}
                  {student.blood_group && <p className="bengali-text text-gray-700">রক্তের গ্রুপ: {student.blood_group}</p>}
                  {student.address && <p className="bengali-text text-gray-700">ঠিকানা: {student.address}</p>}
                </div>
              ))}
            </div>
          )}

          {!loading && !error && students.length === 0 && (
            <p className="bengali-text text-center text-gray-600 mt-8">
              {selectedBatch 
                ? `এই বছরের জন্য কোন ছাত্রের তথ্য পাওয়া যায়নি।`
                : 'কোন ছাত্রের তথ্য পাওয়া যায়নি।'}
            </p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default StudentPage; 