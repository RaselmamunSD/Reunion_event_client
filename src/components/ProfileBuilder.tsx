import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Camera, Share2, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Helper to get CSRF token from cookie
function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const ProfileBuilder = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    phone: '',
    batch: '',
    bloodType: '',
    photo: null as File | null
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showFrame, setShowFrame] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1994 }, (_, i) => String(1995 + i));

  useEffect(() => {
    if (isDialogOpen) {
      setShowFrame(false);
    }
  }, [isDialogOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "ফাইল খুব বড়",
          description: "৫ এমবি বা তার কম সাইজের ছবি ব্যবহার করুন",
          variant: "destructive"
        });
        return;
      }

      setProfileData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = src;
    });
  };

  const generateFrame = async () => {
    if (!previewUrl) {
      toast({
        title: "ছবি প্রয়োজন",
        description: "প্রোফাইল ফ্রেম তৈরি করতে একটি ছবি আপলোড করুন",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    console.log('Starting frame generation...');
    
    try {
      // Wait a small amount for canvas to be in DOM
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found');
        throw new Error('Canvas not found');
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Canvas context not available');
        throw new Error('Canvas context not found');
      }

      console.log('Canvas and context found, setting up...');

      const canvasSize = 1080;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      console.log('Loading image from:', previewUrl);
      const img = await loadImage(previewUrl);
      console.log('Image loaded successfully, drawing frame...');
      
      // Calculate photo dimensions
      const photoSize = 400;
      const photoX = (canvas.width - photoSize) / 2;
      const photoY = 100;
      
      // Draw user's photo with circular clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, photoX, photoY, photoSize, photoSize);
      ctx.restore();
      
      // Draw photo border
      ctx.strokeStyle = '#2F5233';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, Math.PI * 2);
      ctx.stroke();

      // Text area setup
      const textStartY = photoY + photoSize + 60;
      const textAreaHeight = canvas.height - textStartY - 80;
      const textAreaMargin = 40;
      
      // Draw text background with rounded rectangle
      ctx.fillStyle = '#2F5233';
      ctx.beginPath();
      ctx.roundRect(textAreaMargin, textStartY, canvas.width - (textAreaMargin * 2), textAreaHeight, 20);
      ctx.fill();
      
      // Add golden border to text area
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(textAreaMargin, textStartY, canvas.width - (textAreaMargin * 2), textAreaHeight, 20);
      ctx.stroke();

      // Set text properties
      ctx.textAlign = 'center';
      let currentY = textStartY + 80;
      
      // Main title
      ctx.font = 'bold 38px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.fillText('হাড়িভাঙ্গা তালিমুল ইনসান', canvas.width/2, currentY);
      
      currentY += 45;
      ctx.fillText('হাফেজিয়া ক্বওমী মাদ্রাসার', canvas.width/2, currentY);
      
      currentY += 45;
      ctx.fillText('৩০ বছর পূর্তি পূর্নমিলন অনুষ্ঠান', canvas.width/2, currentY);

      // Date
      currentY += 60;
      ctx.font = 'bold 44px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.fillText('১২ জুন ২০২৫', canvas.width/2, currentY);

      // User info section
      if (profileData.name || profileData.phone || profileData.address || profileData.batch || profileData.bloodType) {
        currentY += 40;
        ctx.font = '30px Arial';
        ctx.fillStyle = '#FFFFFF';
        const userInfoLineHeight = 38;
        
        if (profileData.name) {
          ctx.fillText(`নাম: ${profileData.name}`, canvas.width/2, currentY);
          currentY += userInfoLineHeight;
        }
        if (profileData.phone) {
          ctx.fillText(`ফোন: ${profileData.phone}`, canvas.width/2, currentY);
          currentY += userInfoLineHeight;
        }
        if (profileData.address) {
          ctx.fillText(`ঠিকানা: ${profileData.address}`, canvas.width/2, currentY);
          currentY += userInfoLineHeight;
        }
        if (profileData.batch) {
          ctx.fillText(`ব্যাচ/বছর: ${profileData.batch}`, canvas.width/2, currentY);
          currentY += userInfoLineHeight;
        }
        if (profileData.bloodType) {
          ctx.fillText(`রক্তের গ্রুপ: ${profileData.bloodType}`, canvas.width/2, currentY);
        }
      }

      // Outer decorative border
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 12;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      
      // Inner border
      ctx.strokeStyle = '#2F5233';
      ctx.lineWidth = 6;
      ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);

      // Corner decorations
      const cornerSize = 50;
      ctx.fillStyle = '#FFD700';
      
      // Top corners
      ctx.fillRect(20, 20, cornerSize, 12);
      ctx.fillRect(20, 20, 12, cornerSize);
      ctx.fillRect(canvas.width - 20 - cornerSize, 20, cornerSize, 12);
      ctx.fillRect(canvas.width - 32, 20, 12, cornerSize);
      
      // Bottom corners
      ctx.fillRect(20, canvas.height - 32, cornerSize, 12);
      ctx.fillRect(20, canvas.height - 20 - cornerSize, 12, cornerSize);
      ctx.fillRect(canvas.width - 20 - cornerSize, canvas.height - 32, cornerSize, 12);
      ctx.fillRect(canvas.width - 32, canvas.height - 20 - cornerSize, 12, cornerSize);

      setShowFrame(true);
      setIsGenerating(false);
      
      console.log('Frame generated successfully!');
      toast({
        title: "সফল!",
        description: "ফ্রেম তৈরি হয়েছে"
      });
    } catch (error) {
      console.error('Error in generateFrame:', error);
      setIsGenerating(false);
      toast({
        title: "ত্রুটি",
        description: "ফ্রেম তৈরি করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    }
  };

  const downloadFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas || !showFrame) {
      toast({
        title: "ত্রুটি",
        description: "প্রথমে ফ্রেম তৈরি করুন",
        variant: "destructive"
      });
      return;
    }

    try {
      const link = document.createElement('a');
      link.download = `profile-frame-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "ডাউনলোড সফল",
        description: "প্রোফাইল ফ্রেম ডাউনলোড হয়েছে"
      });
    } catch (error) {
      console.error('Error downloading frame:', error);
      toast({
        title: "ডাউনলোড ত্রুটি",
        description: "ডাউনলোড করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    // Add validation check for all required fields
    if (
      !profileData.photo ||
      !profileData.name.trim() ||
      !profileData.phone.trim() ||
      !profileData.address.trim() ||
      !profileData.batch.trim() ||
      !profileData.bloodType.trim()
    ) {
      toast({
        title: "সব তথ্য আবশ্যক",
        description: "প্রোফাইল ফ্রেম তৈরি করতে অনুগ্রহ করে সব তথ্য পূরণ করুন।",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('picture', profileData.photo);
    formData.append('name', profileData.name);
    formData.append('mobile', profileData.phone);
    formData.append('address', profileData.address);
    formData.append('batch', profileData.batch);
    formData.append('blood_type', profileData.bloodType);

    setIsGenerating(true);
    console.log('Submitting profile frame data...');

    const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';
    const csrftoken = getCookie('csrftoken');

    try {
      const response = await fetch(`${API_URL}/profile-frame-submissions/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken || '',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error response:', errorData);
        throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Submission successful:', result);

      toast({
        title: "সফল!",
        description: "প্রোফাইল ফ্রেম ডেটা সফলভাবে জমা হয়েছে।"
      });

      // Reset form after successful submission
      setProfileData({
        name: '',
        address: '',
        phone: '',
        batch: '',
        bloodType: '',
        photo: null
      });
      setPreviewUrl(null);
      setShowFrame(false);
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Error submitting data:', error);
      toast({
        title: "ত্রুটি",
        description: `ডেটা জমা দিতে সমস্যা হয়েছে: ${error instanceof Error ? error.message : String(error)}`, 
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bengali-text bg-white text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-white">
          <Camera className="mr-2 h-4 w-4" />
          প্রোফাইল তৈরি করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="bengali-text text-xl text-islamic-green">ফেসবুক প্রোফাইল ফ্রেম তৈরি করুন </DialogTitle>
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Photo Upload */}
            <div>
              <Label className="bengali-text text-base block mb-2">আপনার ছবি আপলোড করুন *</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline" 
                className="w-full bengali-text"
              >
                <Camera className="mr-2 h-4 w-4" />
                ছবি নির্বাচন করুন
              </Button>
              {previewUrl && (
                <div className="mt-2">
                  <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-islamic-green" />
                </div>
              )}
            </div>

            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="bengali-text text-base block mb-2">নাম </Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="আপনার নাম লিখুন"
                className="bengali-text"
              />
            </div>

            {/* Phone Field */}
            <div>
              <Label htmlFor="phone" className="bengali-text text-base block mb-2">মোবাইল নম্বর </Label>
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="আপনার মোবাইল নম্বর লিখুন"
                className="bengali-text"
              />
            </div>

            {/* Address Field */}
            <div>
              <Label htmlFor="address" className="bengali-text text-base block mb-2">ঠিকানা </Label>
              <Textarea
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="আপনার ঠিকানা লিখুন"
                className="bengali-text"
                rows={3}
              />
            </div>

            {/* Batch/Year Field */}
            <div>
                <Label htmlFor="batch" className="bengali-text text-base block mb-2">ব্যাচ/বছর </Label>
                <Select onValueChange={(value) => handleSelectChange('batch', value)} value={profileData.batch}>
                    <SelectTrigger className="w-full bengali-text">
                        <SelectValue placeholder="আপনার ব্যাচ/বছর নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                        {batchYears.map(year => (
                            <SelectItem key={year} value={year} className="bengali-text">{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Blood Type Field */}
            <div>
                <Label htmlFor="bloodType" className="bengali-text text-base block mb-2">রক্তের গ্রুপ </Label>
                <Input
                    id="bloodType"
                    name="bloodType"
                    value={profileData.bloodType}
                    onChange={handleInputChange}
                    placeholder="আপনার রক্তের গ্রুপ লিখুন"
                    className="bengali-text"
                />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="bengali-text font-semibold text-blue-800 mb-2">ফ্রেমের তথ্য:</h3>
              <ul className="bengali-text text-sm text-blue-700 space-y-1">
                <li>• হাড়িভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসার</li>
                <li>• ৩০ বছর পূর্তি পূর্নমিলন অনুষ্ঠান</li>
                <li>• তারিখ: ১২ জুন ২০২৫</li>
                <li></li>
              </ul>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={isGenerating || !previewUrl}
              className="w-full bg-islamic-green hover:bg-islamic-green/90 text-white bengali-text"
            >
              {isGenerating ? 'ফ্রেম তৈরি হচ্ছে...' : 'প্রোফাইল ফ্রেম তৈরি করুন'}
            </Button>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            {/* Canvas is always in DOM but hidden when showFrame is false */}
            <canvas 
              ref={canvasRef} 
              className={`max-w-full h-auto border border-gray-300 rounded shadow-sm mx-auto block ${showFrame ? '' : 'hidden'}`}
              style={{ 
                maxHeight: '400px',
                maxWidth: '400px'
              }}
            />
            
            {showFrame ? (
              <div className="text-center">
                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  <Button 
                    onClick={downloadFrame}
                    variant="outline"
                    className="bengali-text flex-1 min-w-[120px] bg-white text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    ডাউনলোড করুন
                  </Button>
                </div>
                <p className="text-sm text-gray-600 bengali-text mt-2">
                  ফ্রেমটি ১০৮০x১০৮০ পিক্সেল রেজোলিউশনে তৈরি হয়েছে
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-100 rounded border-2 border-dashed border-gray-300">
                <div className="text-center p-6">
                  <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="bengali-text text-gray-500 text-lg font-medium">প্রোফাইল ফ্রেম এখানে দেখানো হবে</p>
                  <p className="bengali-text text-sm text-gray-400 mt-2">ছবি আপলোড করে "ফ্রেম তৈরি করুন" বাটনে ক্লিক করুন</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBuilder;
