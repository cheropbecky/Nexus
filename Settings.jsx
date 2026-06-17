import React, { useState } from 'react';
import Layout from '../components/Layout';
import RequestModal from '../components/RequestModal';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout onOpenModal={() => setIsModalOpen(true)}>
      <h2 className="text-2xl font-bold mb-8">Settings</h2>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl border shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Profile Information</h3>
          <button className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Edit</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">AR</div>
          <div>
            <p className="font-bold">Alex Rivers</p>
            <p className="text-sm text-gray-500">alex.rivers@nexus-hq.com</p>
            <div className="flex gap-2 mt-1">
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">Admin Access</span>
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account & Notifications Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            {['Email notifications', 'Push alerts', 'Desktop alerts'].map((item) => (
              <div key={item} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item}</span>
                <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Account</h3>
          <div className="space-y-4 text-sm text-gray-600 cursor-pointer">
            <p className="hover:text-black">Billing & Subscription &gt;</p>
            <p className="hover:text-black">Security & Password &gt;</p>
            <p className="text-red-500 pt-4 border-t">Log Out</p>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Team Management</h3>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">+ Add Member</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr><th className="pb-2">Member</th><th className="pb-2">Role</th><th className="pb-2">Status</th></tr>
          </thead>
          <tbody>
            {['Jordan Doe', 'Sarah Kim', 'Marcus Lee'].map((name, i) => (
              <tr key={name} className="border-b last:border-0">
                <td className="py-3 font-medium">{name}</td>
                <td className="py-3 text-gray-500">{i === 0 ? 'Admin' : i === 1 ? 'Editor' : 'Viewer'}</td>
                <td className="py-3 text-blue-600">● Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default Settings;