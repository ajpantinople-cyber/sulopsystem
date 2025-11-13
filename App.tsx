import React, { useState } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { MOCK_RECORDS, MOCK_USERS } from './constants';
import { Record, User, UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RecordList from './components/RecordList';
import RecordFormModal from './components/RecordFormModal';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import PublicRecordView from './components/PublicRecordView';

function App() {
  const [records, setRecords] = useState<Record[]>(MOCK_RECORDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = sessionStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const navigate = useNavigate();

  const handleOpenModal = (record: Record | null = null) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingRecord(null);
    setIsModalOpen(false);
  };

  const handleSaveRecord = (recordToSave: Omit<Record, 'id'> & { id?: string }) => {
    if (recordToSave.id && editingRecord) {
      setRecords(records.map(r => r.id === recordToSave.id ? (recordToSave as Record) : r));
    } else {
      const newRecord: Record = {
        ...recordToSave,
        id: new Date().toISOString(),
      };
      setRecords([newRecord, ...records]);
    }
    handleCloseModal();
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleLogin = (username: string) => {
    const user = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } else {
      alert('Invalid credentials. Try "admin" or "staff".');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/public" element={<PublicRecordView records={records} onSaveRecord={handleSaveRecord} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar user={currentUser} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<MainLayout onAddNew={() => handleOpenModal()} />}>
                <Route index element={<Dashboard records={records} />} />
                <Route
                  path="records"
                  element={
                    <RecordList
                      records={records}
                      onEdit={handleOpenModal}
                      onDelete={handleDeleteRecord}
                    />
                  }
                />
                {currentUser.role === UserRole.ADMIN && (
                  <Route path="users" element={<UserManagement />} />
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <RecordFormModal
          record={editingRecord}
          onClose={handleCloseModal}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
}

const MainLayout: React.FC<{onAddNew: () => void}> = ({ onAddNew }) => {
    return (
        <>
            <Header onAddNew={onAddNew} />
            <Outlet />
        </>
    );
};

export default App;