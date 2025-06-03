import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Calendar, Clock } from 'lucide-react';

const EventDetails = () => {
  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-islamic-green py-10 mb-10">
        <div className="container-custom">
          <h1 className="bengali-text text-white text-3xl md:text-4xl font-bold text-center">অনুষ্ঠান বিবরণ</h1>
        </div>
      </div>

      {/* Madrasa History */}
      <section className="py-8">
        <div className="container-custom">
          <h2 className="heading-secondary bengali-text">মাদ্রাসার সংক্ষিপ্ত ইতিহাস</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <p className="bengali-text text-lg leading-relaxed mb-4">
                হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা ১৯৯৫ সালে প্রতিষ্ঠিত হয়। মৌলানা আবদুল হাকিম সাহেব এর প্রচেষ্টায় ও স্থানীয় মুসলিম জনসাধারণের সহযোগিতায় এই প্রতিষ্ঠান গড়ে তোলা হয়।
              </p>
              <p className="bengali-text text-lg leading-relaxed mb-4">
                প্রতিষ্ঠার পর থেকে মাদ্রাসাটি হাজার হাজার শিক্ষার্থীকে কুরআন হাফেজ, আলিম ও ফাজিল স্তরের শিক্ষা প্রদান করেছে। বর্তমানে এই প্রতিষ্ঠানে ৫০০ এর অধিক ছাত্র এবং ৩০ জন শিক্ষক রয়েছেন।
              </p>
              <p className="bengali-text text-lg leading-relaxed">
                ৩০ বছরে মাদ্রাসা থেকে উত্তীর্ণ অনেক ছাত্র আজ দেশের বিভিন্ন প্রান্তে ইমাম, মাওলানা, শিক্ষক এবং বিভিন্ন পেশায় সম্মানজনক অবস্থানে কর্মরত রয়েছেন।
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="মাদ্রাসার ছবি" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Purpose */}
      <section className="py-8 bg-islamic-light">
        <div className="container-custom">
          <h2 className="heading-secondary bengali-text">অনুষ্ঠানের উদ্দেশ্য</h2>
          <div className="islamic-card mt-6">
            <ul className="bengali-text text-lg space-y-4 list-disc pl-6">
              <li>মাদ্রাসার ৩০ বছর পূর্তি উদযাপন করা।</li>
              <li>প্রাক্তন ছাত্রদের মধ্যে পুনর্মিলনের সুযোগ সৃষ্টি করা।</li>
              <li>প্রাক্তন ছাত্র ও শিক্ষকদের সাথে বর্তমান শিক্ষার্থীদের পরিচয় করিয়ে দেওয়া।</li>
              <li>মাদ্রাসার ভবিষ্যৎ উন্নয়নের জন্য প্রাক্তন ছাত্রদের সহযোগিতা আহবান করা।</li>
              <li>নতুন প্রজন্মের মধ্যে ধর্মীয় শিক্ষার গুরুত্ব তুলে ধরা।</li>
              <li>মাদ্রাসার ইতিহাস ও ঐতিহ্য সংরক্ষণ করা।</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Program Schedule */}
      <section className="py-10">
        <div className="container-custom">
          <h2 className="heading-secondary bengali-text">অনুষ্ঠান সূচি</h2>
          <div className="mt-6 space-y-6">
            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">সকাল ১০:০০ - ১১:০০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">রেজিস্ট্রেশন ও অতিথি আগমন</p>
              <p className="bengali-text">অংশগ্রহণকারীদের স্বাগত জানানো ও রেজিস্ট্রেশন প্রক্রিয়া সম্পন্ন করা।</p>
            </div>

            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">সকাল ১১:০০ - ১২:৩০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">উদ্বোধনী অনুষ্ঠান</p>
              <p className="bengali-text">স্বাগত বক্তব্য এবং প্রধান অতিথির উদ্বোধনী ভাষণ।</p>
            </div>

            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">দুপুর ১২:৩০ - ১:৩০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">জোহরের নামাজ ও মধ্যাহ্ন বিরতি</p>
              <p className="bengali-text">জামাতে নামাজ আদায় এবং দুপুরের খাবার।</p>
            </div>

            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">বিকাল ১:৩০ - ৩:৩০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">প্রাক্তন ছাত্রদের স্মৃতিচারণ ও বক্তব্য</p>
              <p className="bengali-text">বিভিন্ন ব্যাচের প্রাক্তন ছাত্রদের অভিজ্ঞতা বিনিময় ও স্মৃতিচারণ।</p>
            </div>

            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">বিকাল ৩:৩০ - ৫:০০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">সাংস্কৃতিক সন্ধ্যা</p>
              <p className="bengali-text">বিশেষ সাংস্কৃতিক অনুষ্ঠান ও বিভিন্ন পরিবেশনা।</p>
            </div>

            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">সন্ধ্যা ৫:০০ - ৬:০০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">মাগরিবের নামাজ ও বিরতি</p>
              <p className="bengali-text">জামাতে নামাজ আদায় এবং চা-নাশতা।</p>
            </div>

            <div className="islamic-card relative border-l-4 border-islamic-green pl-6">
              <div className="absolute left-[-15px] top-5 w-7 h-7 bg-islamic-green rounded-full flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
              <h3 className="bengali-text font-bold text-xl mb-2">রাত ৬:০০ - ১০:০০</h3>
              <p className="bengali-text text-lg font-medium text-islamic-green mb-2">সম্মাননা প্রদান ও সমাপনী অনুষ্ঠান</p>
              <p className="bengali-text">প্রাক্তন শিক্ষক ও বিশিষ্ট ছাত্রদের সম্মাননা প্রদান, সমাপনী বক্তব্য ও দোয়া মাহফিল।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-10 bg-islamic-gold text-islamic-dark my-10">
        <div className="container-custom text-center">
          <h2 className="bengali-text text-2xl md:text-3xl font-bold mb-4">এই ঐতিহাসিক অনুষ্ঠানে যোগ দিন</h2>
          <p className="bengali-text text-lg mb-6">
            অনুষ্ঠানে যোগদানের জন্য অগ্রিম রেজিস্ট্রেশন করুন এবং আপনার উপস্থিতি নিশ্চিত করুন।
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/registration" className="btn-primary bengali-text">রেজিস্ট্রেশন করুন</a>
            <a href="/contact" className="bg-white text-islamic-green font-medium bengali-text py-2 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300">
              যোগাযোগ করুন
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EventDetails;
