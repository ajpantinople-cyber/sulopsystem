import React, { useState } from 'react';
import { Record, RecordCategory, RecordStatus } from '../types';

interface PublicRequestFormProps {
  onClose: () => void;
  onSave: (record: Omit<Record, 'id'>) => void;
}

const PublicRequestForm: React.FC<PublicRequestFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    submittedBy: '',
    title: '',
    category: RecordCategory.ZONING,
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: Omit<Record, 'id'> = {
      ...formData,
      dateReceived: new Date().toISOString(),
      status: RecordStatus.PENDING,
      documentUrl: '',
    };
    onSave(newRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Submit a New Request</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="submittedBy" id="submittedBy" value={formData.submittedBy} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Request Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    {Object.values(RecordCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description of Request</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicRequestForm;