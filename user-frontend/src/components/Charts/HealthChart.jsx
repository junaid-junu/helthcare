import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data for demonstration
const mockBpData = [
    { name: 'Jan', sys: 120, dia: 80 },
    { name: 'Feb', sys: 122, dia: 82 },
    { name: 'Mar', sys: 118, dia: 79 },
    { name: 'Apr', sys: 125, dia: 85 },
    { name: 'May', sys: 121, dia: 81 },
];

const mockSugarData = [
    { name: 'Jan', level: 95 },
    { name: 'Feb', level: 98 },
    { name: 'Mar', level: 102 },
    { name: 'Apr', level: 99 },
    { name: 'May', level: 94 },
];

const HealthChart = ({ type }) => {
    if (type === 'bp') {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockBpData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="sys" name="Systolic" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="dia" name="Diastolic" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockSugarData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="level" name="Sugar Level (mg/dL)" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default HealthChart;
