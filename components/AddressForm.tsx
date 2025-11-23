import React, { useState } from 'react';
import { Address } from '../types';
import { parseAddressWithGemini } from '../services/geminiService';
import { Sparkles, Loader2, Eraser, MapPin, Phone, User, Building } from 'lucide-react';

interface AddressFormProps {
  title: string;
  address: Address;
  onChange: (address: Address) => void;
  colorTheme: 'blue' | 'purple';
}

export const AddressForm: React.FC<AddressFormProps> = ({ title, address, onChange, colorTheme }) => {
  const [isParsing, setIsParsing] = useState(false);
  const [unstructuredInput, setUnstructuredInput] = useState('');

  const handleInputChange = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  const handleAIParse = async () => {
    if (!unstructuredInput.trim()) return;
    
    setIsParsing(true);
    try {
      const parsedAddress = await parseAddressWithGemini(unstructuredInput);
      onChange(parsedAddress);
    } catch (error) {
      alert("Failed to parse address. Please try again.");
    } finally {
      setIsParsing(false);
    }
  };

  const themeClasses = colorTheme === 'blue' 
    ? 'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20' 
    : 'border-purple-200 focus:border-purple-500 focus:ring-purple-500/20';

  const iconColor = colorTheme === 'blue' ? 'text-blue-500' : 'text-purple-500';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className={`p-2 rounded-lg ${colorTheme === 'blue' ? 'bg-blue-50' : 'bg-purple-50'}`}>
          <MapPin className={`w-5 h-5 ${iconColor}`} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>

      {/* AI Quick Fill Section */}
      <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          AI Quick Fill
        </label>
        <textarea
          value={unstructuredInput}
          onChange={(e) => setUnstructuredInput(e.target.value)}
          placeholder="Paste full address here (e.g., 'Ali Khan, House 123, Street 4, Islamabad, Pakistan, 0300-1234567')..."
          className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none h-20"
        />
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleAIParse}
            disabled={isParsing || !unstructuredInput}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-100 ${
              isParsing ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isParsing ? 'Parsing...' : 'Auto-Fill'}
          </button>
        </div>
      </div>

      {/* Manual Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={address.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-all ${themeClasses}`}
              placeholder="Recipient or Sender Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Street Address</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={address.street1}
              onChange={(e) => handleInputChange('street1', e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-all ${themeClasses}`}
              placeholder="House #, Street #"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">City</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${themeClasses}`}
              placeholder="Islamabad"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">State / Province</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${themeClasses}`}
              placeholder="ICT"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Country</label>
            <input
              type="text"
              value={address.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${themeClasses}`}
              placeholder="Pakistan"
            />
          </div>
          {/* Replaced Zip Code with Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={address.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-all ${themeClasses}`}
                placeholder="+92 300 1234567"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => onChange({ ...address, name: '', street1: '', city: '', state: '', country: 'Pakistan', phoneNumber: '' })}
            className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <Eraser className="w-3 h-3" />
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};