import React from 'react';

interface EventFrameProps {
  imageUrl: string; // URL of the uploaded image to be used as background
}

const EventFrame: React.FC<EventFrameProps> = ({ imageUrl }) => {
  return (
    // Main container for the frame, 128x128 px with yellow border
    <div
      className="w-32 h-32 border-4 border-yellow-400 relative overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* This area would typically contain the logo/image from the original.
          Since we don't have the logo file, this will just be part of the background image */}
      <div className="flex flex-col justify-end h-full p-1">
        {/* Dark green background area for the text */}
        <div className="bg-green-800 text-white text-center text-[8px] leading-tight py-1">
          {/* Event Title and Date */}
          <p>হাড়িভাঙ্গা তালিমুল ইনসান</p>
          <p>হাফেজিয়া ক্বওমী মাদ্রাসার</p>
          <p>৩০ বছর পূর্তি পূর্নমিলন অনুষ্ঠান</p>
          <p>১২ জুন ২০২৫</p>
        </div>
      </div>
    </div>
  );
};

export default EventFrame; 