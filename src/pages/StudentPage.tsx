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

const StudentPage = () => {
  const [showYears, setShowYears] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1995 + 1 }, (_, i) => String(1995 + i));

  useEffect(() => {
    // Fetch all students when the component mounts or if 'Batch-All' is active initially
    // Or fetch students for a selected batch if selectedBatch is not null
    if (!showYears) { // Fetch all or default batch if needed on initial load
       fetchStudents(null); // Fetch all students initially
    } else if (selectedBatch) {
       fetchStudents(selectedBatch);
    }
  }, [showYears, selectedBatch]); // Re-run effect if showYears or selectedBatch changes

  const fetchStudents = async (batchYear: string | null) => {
    setLoading(true);
    setError(null);
    let url = '/api/students/';
    if (batchYear) {
      url = `/api/students/?batch=${batchYear}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('ছাত্রদের তথ্য লোড করতে সমস্যা হয়েছে।');
      setStudents([]); // Clear students on error
    } finally {
      setLoading(false);
    }
  };

  const handleBatchAllClick = () => {
    setShowYears(!showYears);
    setSelectedBatch(null); // Clear selected batch when toggling Batch-All
    setStudents([]); // Clear students when toggling
  };

  const handleYearClick = (year: string) => {
    setSelectedBatch(year);
    setShowYears(true);
    fetchStudents(year); // Fetch students for the selected year
  };

  return (
    <MainLayout>
      <section className="py-16">
        <div className="container-custom text-center">
          <h1 className="bengali-text text-3xl font-bold mb-8">আমাদের সাকসেসফুল ছাত্রদের তথ্য</h1>

          <button
            onClick={handleBatchAllClick}
            className={`font-bold py-2 px-6 rounded-md transition-colors duration-300 mb-8 ${!showYears ? 'bg-islamic-green text-white hover:bg-islamic-gold' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
          >
            Batch-All
          </button>

          {showYears && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
              {batchYears.map(year => (
                <div 
                  key={year} 
                  className={`islamic-card py-2 px-4 text-islamic-dark font-semibold hover:bg-islamic-light cursor-pointer ${selectedBatch === year ? 'bg-islamic-gold text-white' : ''}`}
                  onClick={() => handleYearClick(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}

          {/* Display Loading/Error messages */}
          {loading && <p className="bengali-text text-center">ছাত্রদের তথ্য লোড হচ্ছে...</p>}
          {error && <p className="bengali-text text-center text-red-500">{error}</p>}

          {/* Display Students */}
          {!loading && !error && students.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(student => (
                <div key={student.id} className="islamic-card text-left">
                  <div className="flex items-center mb-4">
                     {student.photo && (
                       <img 
                         src={student.photo} 
                         alt={student.name}
                         className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-islamic-green"
                       />
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

          {!loading && !error && showYears && students.length === 0 && (
              <p className="bengali-text text-center text-gray-600 mt-8">এই বছরের জন্য কোন ছাত্রের তথ্য পাওয়া যায়নি।</p>
          )}
           {!loading && !error && !showYears && students.length === 0 && (
              <p className="bengali-text text-center text-gray-600 mt-8">ছাত্রদের তথ্য লোড হয়নি বা পাওয়া যায়নি।</p>
          )}

        </div>
      </section>
    </MainLayout>
  );
};

export default StudentPage; 