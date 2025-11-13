
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Record, RecordCategory, RecordStatus } from '../types';
import StatCard from './StatCard';
import { DocumentIcon, CheckCircleIcon, ClockIcon } from './Icons';

interface DashboardProps {
  records: Record[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard: React.FC<DashboardProps> = ({ records }) => {

  const analyticsData = useMemo(() => {
    const totalRecords = records.length;
    const pendingRecords = records.filter(r => r.status === RecordStatus.PENDING).length;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const approvedLast30Days = records.filter(r => 
      r.status === RecordStatus.APPROVED && new Date(r.dateReceived) > thirtyDaysAgo
    ).length;

    const recordsByCategory = Object.values(RecordCategory).map(category => ({
      name: category,
      count: records.filter(r => r.category === category).length
    }));
    
    const recordsByStatus = Object.values(RecordStatus).map((status, index) => ({
      name: status,
      value: records.filter(r => r.status === status).length,
      color: COLORS[index % COLORS.length]
    })).filter(s => s.value > 0);

    return { totalRecords, pendingRecords, approvedLast30Days, recordsByCategory, recordsByStatus };
  }, [records]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Records" value={analyticsData.totalRecords.toString()} icon={<DocumentIcon className="w-8 h-8 text-blue-500"/>} />
        <StatCard title="Pending Applications" value={analyticsData.pendingRecords.toString()} icon={<ClockIcon className="w-8 h-8 text-yellow-500"/>} />
        <StatCard title="Approved (Last 30 Days)" value={analyticsData.approvedLast30Days.toString()} icon={<CheckCircleIcon className="w-8 h-8 text-green-500"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Records by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.recordsByCategory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-25} textAnchor="end" height={80} interval={0} tick={{fontSize: 10}}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Records by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                 <PieChart>
                    <Pie
                        data={analyticsData.recordsByStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {analyticsData.recordsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
