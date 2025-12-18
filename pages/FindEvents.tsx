
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Calendar, MapPin, Search, Filter, X } from 'lucide-react';

const FindEvents: React.FC = () => {
  const { events } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Health', 'Social', 'Creative', 'Education', 'Sports'];

  const filteredEvents = events.filter(e => {
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && !e.isBlocked;
  });

  return (
    <div className="pb-20">
      {/* Banner */}
      <div className="relative h-64 bg-emerald-900 overflow-hidden">
        <img src="https://picsum.photos/id/1020/1600/400" className="w-full h-full object-cover opacity-50" alt="banner" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl font-bold mb-2">Find Events Near You</h1>
          <p className="text-emerald-100">Showing events in Health City and surrounding areas.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-[-40px] relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-50">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by keyword, venue, or title..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    filterCategory === cat 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} found
            </h2>
            {(searchTerm || filterCategory !== 'All') && (
              <button 
                onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:underline"
              >
                <X size={16} /> Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <a 
                key={event.id}
                href={`#/event/${event.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
              >
                <img src={event.bannerUrl} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">
                      {event.category}
                    </span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 min-h-[3.5rem]">{event.title}</h3>
                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} className="text-emerald-500" />
                      {event.dateTime}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="text-emerald-500" />
                      {event.location}
                    </div>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center text-xs text-gray-400">
                    <span>By {event.organizerName}</span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      {event.joinedCount} joined
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900">No events found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindEvents;
