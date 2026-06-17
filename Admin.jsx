import React, { useState } from 'react';
import Layout from '../components/Layout';
import RequestModal from '../components/RequestModal';

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data to match the structure in image_05ecfe.png
  const requests = [
    { id: 'REQ-8429', requester: 'Alex Rivera', product: 'Acme Corp.', type: 'Feature', priority: 'Critical', status: 'IN REVIEW', date: 'Oct 24, 2023' },
    { id: 'REQ-8428', requester: 'Sarah Chen', product: 'Globex Solutions', type: 'Bug Report', priority: 'High', status: 'PENDING', date: 'Oct 24, 2023' },
  ];

  return (
    <Layout onOpenModal={() => setIsModalOpen(true)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <div className="text-sm text-gray-500">Workspace &gt; Global Requests</div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <input type="checkbox" />
          <button className="text-sm text-red-600 font-medium">Delete Selected</button>
          <input placeholder="Filter requests..." className="border p-2 rounded w-64" />
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4"><input type="checkbox" /></th>
              <th className="p-4 text-xs font-semibold text-gray-500">#ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500">REQUESTER</th>
              <th className="p-4 text-xs font-semibold text-gray-500">PRODUCT</th>
              <th className="p-4 text-xs font-semibold text-gray-500">STATUS</th>
              <th className="p-4 text-xs font-semibold text-gray-500">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" /></td>
                <td className="p-4 text-blue-600 font-medium">{req.id}</td>
                <td className="p-4">{req.requester}</td>
                <td className="p-4">{req.product}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">
                    {req.status}
                  </span>
                </td>
                <td className="p-4 space-x-3">
                  <button className="text-gray-500 hover:text-black">✎</button>
                  <button className="text-red-500 hover:text-red-700">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default AdminPanel;