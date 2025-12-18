
import React from 'react';
import { useApp } from '../store/AppContext';
import { UserRole } from '../types';
// Fix: Added missing Users and User (aliased as UserIcon) imports from lucide-react.
import { ShieldAlert, UserX, UserCheck, Eye, EyeOff, BarChart2, Users, User as UserIcon } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { currentUser, users, events, blockUser, blockEvent } = useApp();

  if (!currentUser || currentUser.role !== UserRole.SUPER_ADMIN) {
    return <div className="p-20 text-center font-bold">Access Denied</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Platform Control</h1>
          <p className="text-gray-500 mt-1">Manage users, moderation, and system stats.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <BarChart2 className="text-emerald-600" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Events</p>
              <p className="text-xl font-bold text-emerald-700">{events.length}</p>
            </div>
          </div>
          <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 flex items-center gap-3">
            {/* Fix: Users icon component is now correctly imported */}
            <Users className="text-teal-600" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Platform Users</p>
              <p className="text-xl font-bold text-teal-700">{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* User Management */}
        <section className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {/* Fix: UserIcon component is now correctly imported and aliased from User */}
              <UserIcon className="text-emerald-500" /> User Management
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {users.map(user => (
              <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    user.role === UserRole.SUPER_ADMIN ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{user.name} {user.isBlocked && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">Blocked</span>}</h4>
                    <p className="text-xs text-gray-400">{user.email} • <span className="uppercase">{user.role}</span></p>
                  </div>
                </div>
                {user.role !== UserRole.SUPER_ADMIN && (
                  <button 
                    onClick={() => blockUser(user.id)}
                    className={`p-3 rounded-xl transition-all ${
                      user.isBlocked 
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                    title={user.isBlocked ? 'Unblock' : 'Block'}
                  >
                    {user.isBlocked ? <UserCheck size={20} /> : <UserX size={20} />}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Event Moderation */}
        <section className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="text-emerald-500" /> Event Moderation
            </h2>
          </div>
          <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto custom-scrollbar">
            {events.map(event => (
              <div key={event.id} className="p-6 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={event.bannerUrl} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="event" />
                  <div>
                    <h4 className="font-bold text-gray-900 line-clamp-1">{event.title}</h4>
                    <p className="text-xs text-gray-400">By {event.organizerName} • {event.category}</p>
                    {event.isBlocked && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold uppercase">Blocked</span>}
                  </div>
                </div>
                <button 
                  onClick={() => blockEvent(event.id)}
                  className={`p-3 rounded-xl transition-all ${
                    event.isBlocked 
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                  title={event.isBlocked ? 'Unblock' : 'Block'}
                >
                  {event.isBlocked ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
