
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldsProps {
  formData: {
    name: string;
    batch: string;
    profession: string;
    mobile: string;
    email: string;
    familyMembers: string;
    specialRequests: string;
    paymentMethod: string;
    transactionId: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  batchYears: number[];
}

const FormFields = ({ formData, handleChange, handleSelectChange, batchYears }: FormFieldsProps) => {
  return (
    <>
      {/* Name */}
      <div>
        <Label htmlFor="name" className="bengali-text text-base block mb-2">পূর্ণ নাম</Label>
        <Input 
          id="name" 
          name="name"
          value={formData.name} 
          onChange={handleChange} 
          placeholder="আপনার পূর্ণ নাম লিখুন" 
          required 
          className="bengali-text w-full" 
        />
      </div>

      {/* Batch/Year */}
      <div>
        <Label htmlFor="batch" className="bengali-text text-base block mb-2">ব্যাচ/সাল</Label>
        <Select 
          value={formData.batch} 
          onValueChange={(value) => handleSelectChange('batch', value)}
        >
          <SelectTrigger className="bengali-text w-full">
            <SelectValue placeholder="ব্যাচ/সাল নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {batchYears.map((year) => (
              <SelectItem key={year} value={year.toString()} className="bengali-text">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Profession */}
      <div>
        <Label htmlFor="profession" className="bengali-text text-base block mb-2">বর্তমান পেশা</Label>
        <Input 
          id="profession" 
          name="profession"
          value={formData.profession} 
          onChange={handleChange} 
          placeholder="আপনার বর্তমান পেশা" 
          required 
          className="bengali-text w-full" 
        />
      </div>

      {/* Mobile */}
      <div>
        <Label htmlFor="mobile" className="bengali-text text-base block mb-2">মোবাইল নম্বর</Label>
        <Input 
          id="mobile" 
          name="mobile"
          value={formData.mobile} 
          onChange={handleChange} 
          placeholder="আপনার মোবাইল নম্বর" 
          required 
          className="bengali-text w-full" 
          type="tel"
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="bengali-text text-base block mb-2">ইমেইল (ঐচ্ছিক)</Label>
        <Input 
          id="email" 
          name="email"
          value={formData.email} 
          onChange={handleChange} 
          placeholder="আপনার ইমেইল ঠিকানা" 
          type="email"
          className="bengali-text w-full" 
        />
      </div>

      {/* Family Members */}
      <div>
        <Label htmlFor="familyMembers" className="bengali-text text-base block mb-2">পরিবারের সদস্য সংখ্যা</Label>
        <Select 
          value={formData.familyMembers.toString()} 
          onValueChange={(value) => handleSelectChange('familyMembers', value)}
        >
          <SelectTrigger className="bengali-text w-full">
            <SelectValue placeholder="সদস্য সংখ্যা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()} className="bengali-text">
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Special Requests */}
      <div>
        <Label htmlFor="specialRequests" className="bengali-text text-base block mb-2">বিশেষ আবেদন (ঐচ্ছিক)</Label>
        <Textarea 
          id="specialRequests" 
          name="specialRequests"
          value={formData.specialRequests} 
          onChange={handleChange} 
          placeholder="আপনার বিশেষ কোন আবেদন থাকলে লিখুন" 
          className="bengali-text w-full h-24" 
        />
      </div>

      {/* Payment Method */}
      <div>
        <Label className="bengali-text text-base block mb-2">পেমেন্ট মাধ্যম</Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="bkash"
              name="paymentMethod"
              value="bkash"
              checked={formData.paymentMethod === 'bkash'}
              onChange={handleChange}
              className="mr-2"
            />
            <Label htmlFor="bkash" className="bengali-text cursor-pointer">বিকাশ</Label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="nagad"
              name="paymentMethod"
              value="nagad"
              checked={formData.paymentMethod === 'nagad'}
              onChange={handleChange}
              className="mr-2"
            />
            <Label htmlFor="nagad" className="bengali-text cursor-pointer">নগদ</Label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="rocket"
              name="paymentMethod"
              value="rocket"
              checked={formData.paymentMethod === 'rocket'}
              onChange={handleChange}
              className="mr-2"
            />
            <Label htmlFor="rocket" className="bengali-text cursor-pointer">রকেট</Label>
          </div>
        </div>
      </div>

      {/* Transaction ID */}
      <div>
        <Label htmlFor="transactionId" className="bengali-text text-base block mb-2">ট্রানজেকশন আইডি</Label>
        <Input 
          id="transactionId" 
          name="transactionId"
          value={formData.transactionId} 
          onChange={handleChange} 
          placeholder="পেমেন্ট ট্রানজেকশন আইডি" 
          required 
          className="bengali-text w-full" 
        />
      </div>
    </>
  );
};

export default FormFields;
