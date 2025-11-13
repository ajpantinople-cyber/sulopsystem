import React, { useState, useMemo } from 'react';
import { Record, RecordStatus } from '../types';
import { EditIcon, TrashIcon, DownloadIcon } from './Icons';

interface RecordListProps {
  records: Record[];
  onEdit?: (record: Record) => void;
  onDelete?: (id: string) => void;
  publicView?: boolean;
}

const RecordList: React.FC<RecordListProps> = ({ records, onEdit, onDelete, publicView = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filteredRecords = useMemo(() => {
    return records.filter(record =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredRecords.slice(startIndex, startIndex + recordsPerPage);
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const getStatusBadge = (status: RecordStatus) => {
    switch (status) {
      case RecordStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case RecordStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case RecordStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case RecordStatus.ARCHIVED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Submitted By</th>
              <th scope="col" className="px-6 py-3">Date Received</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Document</th>
              {!publicView && <th scope="col" className="px-6 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map(record => (
              <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{record.title}</td>
                <td className="px-6 py-4">{record.category}</td>
                <td className="px-6 py-4">{record.submittedBy}</td>
                <td className="px-6 py-4">{new Date(record.dateReceived).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {record.documentUrl ? (
                    <a
                      href={record.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-900"
                      title="Download Document"
                    >
                      <DownloadIcon className="w-5 h-5"/>
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                {!publicView && (
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => onEdit?.(record)} className="text-blue-600 hover:text-blue-900 mr-4">
                      <EditIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => onDelete?.(record.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="w-5 h-5"/>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-700">
            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of {filteredRecords.length} Records
          </span>
          <div className="flex">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordList;