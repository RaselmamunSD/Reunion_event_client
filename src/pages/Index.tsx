import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const eventDate = new Date('2025-06-12T10:00:00'); // Your event date and time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-islamic-gold mb-1">{timeLeft.days}</div>
        <div className="bengali-text text-sm">দিন</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-islamic-gold mb-1">{timeLeft.hours}</div>
        <div className="bengali-text text-sm">ঘন্টা</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-islamic-gold mb-1">{timeLeft.minutes}</div>
        <div className="bengali-text text-sm">মিনিট</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl md:text-4xl font-bold text-islamic-gold mb-1">{timeLeft.seconds}</div>
        <div className="bengali-text text-sm">সেকেন্ড</div>
      </div>
    </div>
  );
};

const Index = () => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/your-endpoint/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      // Update your state with the data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-islamic-green text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic-pattern"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="bengali-text text-islamic-gold font-bold mb-6 text-xl">বিসমিল্লাহির রাহমানির রাহিম</h2>
            <h1 className="bengali-text text-3xl md:text-5xl font-bold mb-4">৩০ বছর পূর্তি পূনর্মিলন অনুষ্ঠান</h1>
            <div className="h-1 w-32 bg-islamic-gold mx-auto my-6"></div>
            <p className="bengali-text text-lg md:text-xl mb-8">
              হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা ও লিল্লাহ্ বোর্ডিং
            </p>
            
            <CountdownTimer />
            
            <div className="mt-8">
              <Link to="/registration" className="inline-block bg-islamic-gold text-islamic-dark font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 bengali-text">
                রেজিস্ট্রেশন করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info Cards */}
      <section className="py-10 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date and Time */}
            <div className="islamic-card flex">
              <div className="mr-4 text-islamic-green">
                <Calendar size={36} />
              </div>
              <div>
                <h3 className="bengali-text font-bold text-lg mb-2">তারিখ ও সময়</h3>
                <p className="bengali-text">১২ জুন, ২০২৫</p>
                <p className="bengali-text">সকাল ১০:০০ - রাত ১০:০০</p>
              </div>
            </div>

            {/* Location */}
            <div className="islamic-card flex">
              <div className="mr-4 text-islamic-green">
                <MapPin size={36} />
              </div>
              <div>
                <h3 className="bengali-text font-bold text-lg mb-2">স্থান</h3>
                <p className="bengali-text">মাদ্রাসা সংলগ্ন মাঠ</p>
                <p className="bengali-text">হাড়ীভাঙ্গা, এয়ারপোর্ট সংলগ্ন, লালমনিরহাট</p>
              </div>
            </div>

            {/* Attendees */}
            <div className="islamic-card flex">
              <div className="mr-4 text-islamic-green">
                <Users size={36} />
              </div>
              <div>
                <h3 className="bengali-text font-bold text-lg mb-2">অংশগ্রহণকারী</h3>
                <p className="bengali-text">প্রাক্তন ছাত্র, শিক্ষক</p>
                <p className="bengali-text">এবং শুভাকাঙ্ক্ষী</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-12 bg-islamic-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-secondary islamic-decoration bengali-text">স্বাগতম</h2>
            <div className="islamic-card mt-8">
              <p className="bengali-text text-lg leading-relaxed mb-6">
                প্রিয় প্রাক্তন ছাত্র, শিক্ষক ও সুধীবৃন্দ, আপনাদের সাদর আমন্ত্রণ জানাচ্ছি হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা ও লিল্লাহ্ বোর্ডিং-এর ৩০ বছর পূর্তি পূর্ণ মিলনী অনুষ্ঠানে। আপনাদের উপস্থিতি আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ।
              </p>
              <p className="bengali-text text-lg leading-relaxed mb-6">
                এই মিলনী অনুষ্ঠানের মাধ্যমে আমরা আমাদের সম্মানিত শিক্ষকগণ ও প্রাক্তন ছাত্রদের প্রতি কৃতজ্ঞতা জ্ঞাপন করতে চাই, যারা এই প্রতিষ্ঠানকে এগিয়ে নিতে সহায়তা করেছেন। আমাদের প্রতিষ্ঠানের ৩০ বছর পূর্তি উৎসবে আপনাদের সবার অংশগ্রহণ কামনা করছি।
              </p>
              <div className="mt-6">
                <Link to="/event" className="btn-primary bengali-text">বিস্তারিত দেখুন</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message & Biography Section */}
      <section className="py-12 bg-blue-50">
        <div className="container-custom flex flex-col md:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="md:w-2/3 w-full">
            <h2 className="bengali-text text-2xl md:text-3xl font-bold mb-4 text-islamic-green">মুহতামিম এর বাণী</h2>
            <div className="bg-blue-100 border-l-4 border-blue-400 p-4 mb-4">
              <span className="bengali-text font-semibold">হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা
                      ও লিল্লাহ্ বোর্ডিং</span>
            </div>
            <div className="bengali-text text-gray-800 space-y-3">
              <p>আসছে আগামী ১২ জুন ২০২৫ রোজ বৃহস্পতি-বার হাজীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা এর সাবেক ছাত্রদের উদ্যোগে ঈদ পূনর্মিলনী। যার মাধ্যমে শর্ত 
              ব্যস্ততার মাঝেও অনেকগুলো আত্মাত্রিক আত্মস পরিনত হওমার প্রয়াসা করে আসবে সেই দিন ভেদা ভেদ ভুলে একদিত হয়ে একদিন দেখা হবে, কথা হয়ে সম্পর্ক হবে গারো, সঙ্গি এই রকম অনুষ্ঠান প্রতিবছর করতে পারো সকল ছাত্র অনুষ্ঠানে উপস্থিত হবে চিধই কাম্য, তবেই অনুষ্ঠান হবে পরিপূর্ণ। পরিগেতে উচ্চ অনুষ্ঠানের মঙ্গল কামনায় 
              সকলের অর্বাত্মক সরবার্থক সহযোগিতা কামনায় আল্লাহ হাফেজ।</p> 
            </div>
          </div>
          {/* Image */}
          <div className="md:w-1/3 w-full flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg border-4 border-blue-200 bg-white p-2">
              <img src="/lovable-uploads/principal.jpg" alt="Principal" className="w-64 h-80 object-cover" />
              <div className="mt-4 text-center">
                <span className="bengali-text font-bold text-islamic-green">মুহতামিম<br/>মোহাম্মদ নুর আলম সিদ্দিক</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Events Overview */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="heading-secondary text-center mb-10 bengali-text">অনুষ্ঠানের মূল আকর্ষণ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="islamic-card">
              <h3 className="bengali-text text-xl font-semibold mb-3 text-islamic-green">সাংস্কৃতিক সন্ধ্যা</h3>
              <p className="bengali-text">বিশেষ সাংস্কৃতিক অনুষ্ঠান এবং বিভিন্ন সাংস্কৃতিক পরিবেশনা উপভোগ করুন।</p>
            </div>

            <div className="islamic-card">
              <h3 className="bengali-text text-xl font-semibold mb-3 text-islamic-green">প্রাক্তন ছাত্রদের সম্মাননা প্রদান</h3>
              <p className="bengali-text">বিভিন্ন ক্ষেত্রে সফল প্রাক্তন ছাত্রদের সম্মাননা প্রদান করা হবে।</p>
            </div>

            <div className="islamic-card">
              <h3 className="bengali-text text-xl font-semibold mb-3 text-islamic-green">আলোচনা সভা</h3>
              <p className="bengali-text">মাদ্রাসার ভবিষ্যৎ উন্নয়ন ও পরিকল্পনা নিয়ে বিশেষ আলোচনা অনুষ্ঠিত হবে।</p>
            </div>

            <div className="islamic-card">
              <h3 className="bengali-text text-xl font-semibold mb-3 text-islamic-green">ঐতিহাসিক প্রদর্শনী</h3>
              <p className="bengali-text">মাদ্রাসার ৩০ বছরের ইতিহাস, অর্জন ও স্মৃতি নিয়ে বিশেষ প্রদর্শনীর আয়োজন করা হয়েছে।</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/event" className="btn-secondary bengali-text">সম্পূর্ণ কর্মসূচি দেখুন</Link>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-islamic-green text-white">
        <div className="container-custom text-center">
          <h2 className="bengali-text text-3xl font-bold mb-4">আজই রেজিস্ট্রেশন করুন</h2>
          <p className="bengali-text text-xl mb-8 max-w-2xl mx-auto">
            আপনার অংশগ্রহণ নিশ্চিত করতে এবং এই ঐতিহাসিক মিলনী অনুষ্ঠানের অংশ হতে রেজিস্ট্রেশন করুন।
          </p>
          <Link to="/registration" className="bg-white text-islamic-green font-bold bengali-text py-3 px-8 rounded-md hover:bg-islamic-gold hover:text-islamic-dark transition-all duration-300">
            রেজিস্ট্রেশন ফর্ম
          </Link>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-secondary islamic-decoration bengali-text text-center mb-12">স্পন্সরশিপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ভাই ভাই ট্রেডার্স */}
            <div className="islamic-card hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20"></div>
                <div className="aspect-square flex items-center justify-center p-4">
                  <div className="w-32 h-32 border-4 border-islamic-gold rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/vai-vai.jpg" alt="ভাই ভাই ট্রেডার্স proprietor" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="bengali-text text-xl font-semibold mb-2 text-islamic-green">ভাই ভাই ট্রেডার্স</h3>
                <p className="bengali-text text-gray-600 mb-2">প্রোঃ হাফেজ মোঃ মজিদুল ইসলাম</p>
                <p className="bengali-text text-sm text-gray-500">বড়বাড়ী, সদর, লালমনিরহাট</p>
              </div>
            </div>

            {/* সিয়াম টেলিকম */}
            <div className="islamic-card hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20"></div>
                <div className="aspect-square flex items-center justify-center p-4">
                  <div className="w-32 h-32 border-4 border-islamic-gold rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/seam-Talikom.jpg" alt="সিয়াম টেলিকম proprietor" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="bengali-text text-xl font-semibold mb-2 text-islamic-green">সিয়াম টেলিকম</h3>
                <p className="bengali-text text-gray-600 mb-2">প্রোঃ হাফেজ মোঃ আসাদুজ্জামান</p>
                <p className="bengali-text text-sm text-gray-500">হাড়ীভাঙ্গা, সদর, লালমনিরহাট</p>
              </div>
            </div>

            {/* রতন ষ্টোর */}
            <div className="islamic-card hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20"></div>
                <div className="aspect-square flex items-center justify-center p-4">
                  <div className="w-32 h-32 border-4 border-islamic-gold rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/roton-stor.jpg" alt="রতন ষ্টোর proprietor" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="bengali-text text-xl font-semibold mb-2 text-islamic-green">রতন ষ্টোর</h3>
                <p className="bengali-text text-gray-600 mb-2">প্রোঃ সাইদুর রহমান রতন</p>
                <p className="bengali-text text-sm text-gray-500">হাড়ীভাঙ্গা, সদর, লালমনিরহাট</p>
              </div>
            </div>

            {/* মাসুদ এন্টারপ্রাইজ */}
            <div className="islamic-card hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20"></div>
                <div className="aspect-square flex items-center justify-center p-4">
                  <div className="w-32 h-32 border-4 border-islamic-gold rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/masud-interparice.jpg" alt="মাসুদ এন্টারপ্রাইজ proprietor" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="bengali-text text-xl font-semibold mb-2 text-islamic-green">মাসুদ এন্টারপ্রাইজ</h3>
                <p className="bengali-text text-gray-600 mb-2">প্রোঃ মোঃ কাজী মাসুদ পারভেজ</p>
                <p className="bengali-text text-sm text-gray-500">হাড়ীভাঙ্গা, সদর, লালমনিরহাট</p>
              </div>
            </div>

            {/* মেসার্স আরিফ ষ্টোর */}
            <div className="islamic-card hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20"></div>
                <div className="aspect-square flex items-center justify-center p-4">
                  <div className="w-32 h-32 border-4 border-islamic-gold rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/arif-store.jpg" alt="মেসার্স আরিফ ষ্টোর proprietor" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="bengali-text text-xl font-semibold mb-2 text-islamic-green">মেসার্স আরিফ ষ্টোর</h3>
                <p className="bengali-text text-gray-600 mb-2">প্রোঃ মোঃ আনিছুর রহমান</p>
                <p className="bengali-text text-sm text-gray-500">১নং ফুলগাছ, রেলগেট বাজার, লালমনিরহাট</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
