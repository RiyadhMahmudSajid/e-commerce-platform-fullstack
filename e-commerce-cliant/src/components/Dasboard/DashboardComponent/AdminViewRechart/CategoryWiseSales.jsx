import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hooks/useAxios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const CategoryWiseSales = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allorder = [], isLoading } = useQuery({
        queryKey: ['allorder'],
        queryFn: async () => {
            const result = await axiosSecure.get('/allorder');
            return result.data;
        }
    });

    const chartData = allorder.reduce((acc, order) => {
        const category = order.productCategory || "Other";
        const amount = order.totalAmount || 0;

        const existing = acc.find(item => item.name === category);
        if (existing) {
            existing.value += amount;
        } else {
            acc.push({ name: category, value: amount });
        }
        return acc;
    }, []);

    const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

    if (isLoading) return <div className="p-10 text-center font-bold text-text-muted">Loading Analytics...</div>;

    return (
  
        <div className="bg-surface p-6 md:p-8 rounded-[2rem] border border-border-color shadow-sm">
            <div className="mb-8">
                <h3 className="text-xl font-black text-text-main tracking-tight uppercase">
                    Category Wise Sales
                </h3>
                <p className="text-sm text-text-muted font-medium">Revenue generated per product category</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
             
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border-color" opacity={0.2} />
                        
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            className="text-text-muted fill-current"
                            tick={{ fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            className="text-text-muted fill-current"
                            tick={{ fontSize: 12 }} 
                        />

                        <Tooltip 
                            cursor={{ fill: 'currentColor', opacity: 0.05 }}
                            contentStyle={{
                                backgroundColor: 'var(--color-bg-primary)', 
                                borderRadius: '12px',
                                border: '1px solid var(--color-border-color)',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                fontSize: '13px'
                            }}
                            itemStyle={{ fontWeight: 'bold' }}
                            labelStyle={{ color: 'var(--color-text-main)', marginBottom: '4px' }}
                        />

                        <Bar 
                            dataKey="value" 
                            radius={[8, 8, 0, 0]} 
                            barSize={40}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CategoryWiseSales;