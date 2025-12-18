
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { UserRole } from '../types';
import { ImagePlus, MapPin, Calendar, Tag, ChevronRight, Check } from 'lucide-react';

const CreateEvent: React.FC = () => {
  const { currentUser, createEvent } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bannerUrl: '',
    dateTime: '',
    location: '',
    category: 'General',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!currentUser || (currentUser.role !== UserRole.ORGANIZER && currentUser.role !== UserRole.SUPER_ADMIN)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 mt-2">Only organizers can create events.</p>
        <a href="#/" className="mt-4 text-emerald-600 font-bold hover:underline">Back to Home</a>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent(formData);
    setIsSuccess(true);
    setTimeout(() => {
      window.location.hash = '/find-events';
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto my-20 p-10 bg-white rounded-3xl shadow-xl border border-emerald-100 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Created!</h2>
        <p className="text-gray-600">Your event has been published successfully. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create an Event</h1>
        <p className="text-gray-600">Tell us what you are planning and invite the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Progress bar mock */}
        <div className="h-2 bg-gray-100 w-full">
          <div className="h-full bg-emerald-600 w-1/2"></div>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          {/* Section 1: Visuals */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ImagePlus className="text-emerald-500" /> Event Banner
            </h3>
            <div className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all">
              {formData.bannerUrl ? (
                <img src={formData.bannerUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <ImagePlus size={48} className="text-gray-300 group-hover:text-emerald-400 mb-2" />
                  <p className="text-sm text-gray-400 group-hover:text-emerald-500">Click to enter image URL</p>
                </>
              )}
              <input 
                type="text" 
                placeholder="Paste Image URL (e.g. from Unsplash)" 
                className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur p-4 border-t border-gray-200 text-sm outline-none"
                value={formData.bannerUrl}
                onChange={(e) => setFormData(e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-full space-y-2">
              <label className="text-sm font-semibold text-gray-700">Event Title</label>
              <input 
                type="text" 
                required
                placeholder="Be clear and descriptive" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={14} /> Date & Time
              </label>
              <input 
                type="datetime-local" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Health</option>
                <option>Social</option>
                <option>Creative</option>
                <option>Education</option>
                <option>Sports</option>
              </select>
            </div>

            <div className="col-span-full space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={14} /> Location
              </label>
              <input 
                type="text" 
                required
                placeholder="Venue name or address" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="col-span-full space-y-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea 
                rows={5}
                required
                placeholder="Tell attendees what they can expect, including any requirements..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="pt-8 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500 italic">
              All events are currently listed as <strong>FREE</strong> to support accessibility.
            </p>
            <button 
              type="submit"
              className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              Publish Event <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
