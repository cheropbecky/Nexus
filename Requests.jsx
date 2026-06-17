import React, { useState } from 'react';
import Layout from '../components/Layout';
import RequestModal from '../components/RequestModal';

const Requests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Example list of requests
  const requests = [
    { id: '#TF-9042', title: 'Integration with Slack API', status: 'IN REVIEW', requester: 'James Smith', date: '2h ago' },
    { id: '#TF-9041', title: 'Checkout Form CSS Bug', status: 'NEW', requester: 'Laura White', date: '5h ago' },
    { id: '#TF-9040', title: 'Update Privacy Policy', status: 'RESOLVED', requester: 'Mark Brown', date: '1d ago' },
  ];

  const filteredRequests = requests.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout onOpenModal={() => setIsModalOpen(true)}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Requests</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + New Request
        </button>
      </div>

      {/* Filter/Search Bar */}
      <div className="bg-white p-4 rounded-lg border mb-6 flex gap-4">
        <input 
          type="text" 
          placeholder="Search requests..." 
          className="flex-1 border p-2 rounded-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="border p-2 rounded-lg">
          <option>Filter by Status</option>
          <option>New</option>
          <option>In Review</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* Request List */}
      <div className="bg-white rounded-lg border shadow-sm">
        {filteredRequests.map((req) => (
          <div key={req.id} className="grid grid-cols-4 p-4 border-b items-center hover:bg-gray-50">
            <div className="text-blue-600 font-medium">{req.id}</div>
            <div className="font-semibold">{req.title}</div>
            <div className={`px-2 py-1 rounded text-xs w-max ${
              req.status === 'NEW' ? 'bg-blue-100' : 
              req.status === 'IN REVIEW' ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              {req.status}
            </div>
            <div className="text-gray-500 text-sm text-right">{req.date}</div>
          </div>
        ))}
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
    
  );
  const RequestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Only render if true

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        {/* Your Form Content Here */}
        <button onClick={onClose} className="text-red-500">Close</button>
      </div>
    </div>
  );
};
};

export default Requests;