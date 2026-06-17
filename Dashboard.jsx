import React, { useState } from 'react';
import Layout from '../components/Layout';
import RequestModal from '../components/RequestModal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data for Statistics
  const stats = [
    { label: 'Total Requests', value: '248', change: '+12%' },
    { label: 'Open Requests', value: '42', change: 'Priority High' },
    { label: 'Resolved This Week', value: '18', change: 'On Track' },
    { label: 'Avg. Response Time', value: '4h', change: '-20m vs LW' },
  ];

  return (
    <Layout onOpenModal={() => setIsModalOpen(true)}>
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-xs text-blue-600 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-6">Requests by Type</h3>
          {/* Progress bar placeholder */}
          <div className="space-y-4">
            {['Bug', 'Feature', 'Support', 'Other'].map((type) => (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1"><span>{type}</span><span>...</span></div>
                <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full w-3/4"></div></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-6">Requests by Status</h3>
          <div className="flex justify-center items-center h-40">
             {/* Simple visual placeholder for the Donut Chart */}
            <div className="w-32 h-32 rounded-full border-8 border-indigo-600 border-r-transparent"></div>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-semibold">Recent Active Requests</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm">Filter</button>
            <button className="px-3 py-1 border rounded text-sm">Search</button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-4">Request ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Requester</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through your actual request data here */}
            <tr className="border-t text-sm">
              <td className="p-4 text-blue-600 font-medium">#TF-9042</td>
              <td className="p-4">Integration with Slack API</td>
              <td className="p-4">James Smith</td>
              <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">IN REVIEW</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default Dashboard;