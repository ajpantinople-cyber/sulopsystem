import React, { useState, useEffect } from 'react';
import { Record, RecordCategory, RecordStatus } from '../types';

interface RecordFormModalProps {
  record: Record | null;
  onClose: () => void;
  onSave: (record: Record) => void;
}

const RecordFormModal: React.FC<RecordFormModalProps> = ({ record, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Record, 'id'>>({
    title: '',
    category: RecordCategory.ZONING,
    dateReceived: new Date().toISOString().split('T')[0],
    status: RecordStatus.PENDING,
    description: '',
    submittedBy: 'MPDO Staff',
    documentUrl: '',
  });

  useEffect(() => {
    if (record) {
        const { id, ...dataToEdit } = record;
        // Format date for input type="date"
        dataToEdit.dateReceived = new Date(dataToEdit.dateReceived).toISOString().split('T')[0];
        setFormData(dataToEdit);
    } else {
      // Reset to default for new record
       setFormData({
        title: '',
        category: RecordCategory.ZONING,
        dateReceived: new Date().toISOString().split('T')[0],
        status: RecordStatus.PENDING,
        description: '',
        submittedBy: 'MPDO Staff',
        documentUrl: '',
      });
    }
  }, [record]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recordToSave = {
      ...formData,
      id: record?.id || '',
      dateReceived: new Date(formData.dateReceived).toISOString(),
    };
    onSave(recordToSave);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">{record ? 'Edit Record' : 'Add New Record'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        {Object.values(RecordCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        {Object.values(RecordStatus).map(stat => <option key={stat} value={stat}>{stat}</option>)}
                    </select>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dateReceived" className="block text-sm font-medium text-gray-700">Date Received</label>
                    <input type="date" name="dateReceived" id="dateReceived" value={formData.dateReceived} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700">Submitted By</label>
                    <input type="text" name="submittedBy" id="submittedBy" value={formData.submittedBy} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"/>
                 </div>
            </div>
            <div>
              <label htmlFor="documentUrl" className="block text-sm font-medium text-gray-700">Document URL (optional)</label>
              <input type="url" name="documentUrl" id="documentUrl" value={formData.documentUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordFormModal;