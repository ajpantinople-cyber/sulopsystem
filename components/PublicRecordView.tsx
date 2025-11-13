import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Record } from '../types';
import RecordList from './RecordList';
import PublicRequestForm from './PublicRequestForm';
import { PlusIcon } from './Icons';

interface PublicRecordViewProps {
  records: Record[];
  onSaveRecord: (record: Omit<Record, 'id'>) => void;
}

const PublicRecordView: React.FC<PublicRecordViewProps> = ({ records, onSaveRecord }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (record: Omit<Record, 'id'>) => {
    onSaveRecord(record);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-6 py-8">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">LGU-SULOP MPDO RMS</h1>
            <p className="text-gray-600">Public Records Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
              >
              <PlusIcon className="w-5 h-5 mr-1" />
              Submit a New Request
            </button>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              Admin/Staff Login
            </Link>
          </div>
        </header>
        <RecordList records={records} publicView={true} />
      </div>
      {isModalOpen && (
        <PublicRequestForm 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PublicRecordView;