import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-islamic-dark text-white pt-10 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="bengali-text text-xl font-bold mb-4 border-b border-islamic-gold pb-2">আমাদের সম্পর্কে</h3>
            <p className="bengali-text mb-4">হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা ও লিল্লাহ্ বোর্ডিং ইসলামিক শিক্ষার প্রচার ও প্রসারে নিবেদিত।</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white p-1 rounded-full mr-2">
                <img src="/lovable-uploads/8dc1cd31-e052-46f8-a753-de8ee590954e.png" alt="মাদ্রাসা লোগো" className="w-full h-full object-contain" />
              </div>
              <span className="bengali-text font-semibold">৩০ বছর পূর্তি</span>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="bengali-text text-xl font-bold mb-4 border-b border-islamic-gold pb-2">দ্রুত লিংক</h3>
            <ul className="bengali-text space-y-2">
              <li><Link to="/" className="hover:text-islamic-gold transition-colors">হোম</Link></li>
              <li><Link to="/event" className="hover:text-islamic-gold transition-colors">অনুষ্ঠান বিবরণ</Link></li>
              <li><Link to="/registration" className="hover:text-islamic-gold transition-colors">রেজিস্ট্রেশন</Link></li>
              <li><Link to="/financial-report" className="hover:text-islamic-gold transition-colors">আর্থিক প্রতিবেদন</Link></li>
              <li><Link to="/committee" className="hover:text-islamic-gold transition-colors">আয়োজন কমিটি</Link></li>
              <li><Link to="/contact" className="hover:text-islamic-gold transition-colors">যোগাযোগ করুন</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="bengali-text text-xl font-bold mb-4 border-b border-islamic-gold pb-2">যোগাযোগ</h3>
            <address className="bengali-text not-italic">
              <p className="mb-2">হাড়ীভাঙ্গা, এয়ারপোর্ট সংলগ্ন, লালমনিরহাট</p>
              <p className="mb-2">মোবাইল:01768807226</p>
              <p className="mb-2">ইমেইল:rasel.mamun329@gmail.com</p>
            </address>
          </div>

          {/* Column 4: Developer */}
          <div>
            <h3 className="bengali-text text-xl font-bold mb-4 border-b border-islamic-gold pb-2">ডেভেলপার</h3>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white p-1 rounded-full mb-3">
                <img 
                  src="/lovable-uploads/developer-photo2.jpg" 
                  alt="Developer" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="bengali-text font-semibold text-lg mb-1"> মোঃ রাসেল মামুন</h4>
              <p className="bengali-text text-islamic-gold mb-2">সফটওয়্যার ইঞ্জিনিয়ার</p>
              <p className="bengali-text mb-2">মোবাইল: 01738060329</p>
              <a 
                href="https://facebook.com/rasel.mamun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-islamic-gold hover:text-white transition-colors"
              >
                ফেসবুক প্রোফাইল
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="bengali-text text-sm">© {new Date().getFullYear()} হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>

        {/* Website Maintenance Section */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col items-center">
            <h3 className="bengali-text text-xl font-bold mb-4">ওয়েবসাইট মেইনটেন্যান্স</h3>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white p-1 rounded-full">
                <img 
                  src="/lovable-uploads/maintenance-photo.jpg" 
                  alt="Website Maintenance" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center">
                <h4 className="bengali-text font-semibold text-lg mb-1">মো:ইয়াসিন আরাফাত</h4>
                <p className="bengali-text text-islamic-gold mb-2"></p>
                <p className="bengali-text mb-2">মোবাইল: 01920027144</p>
                <a 
                  href="mailto:yasin.arafat.1999@gmail.com"
                  className="text-islamic-gold hover:text-white transition-colors"
                >
                  ইমেইল করুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
