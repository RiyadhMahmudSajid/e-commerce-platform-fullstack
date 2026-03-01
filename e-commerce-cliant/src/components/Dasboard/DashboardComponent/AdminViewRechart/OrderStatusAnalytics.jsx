import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const OrderStatusAnalytics = () => {
  
    const axiosSecure = useAxiosSecure()
    const { data: allorder = [], isLoading } = useQuery({
        queryKey: ['allorder'],
        queryFn: async () => {
            const result = await axiosSecure.get('/allorder');
            return result.data;
        }
    });

 
    const statusCounts = allorder.reduce((acc, order) => {
        const status = order.status || 'pending';
    
        const label = status.charAt(0).toUpperCase() + status.slice(1);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});


    const chartData = Object.entries(statusCounts).map(([name, value]) => ({
        name,
        value
    }));

   
    const COLORS = {
        Success: '#10B981', 
        Pending: '#F59E0B', 
        Canceled: '#EF4444', 
        Default: '#6366F1'  
    };

    if (isLoading) return <div className="p-10 text-center text-text-muted font-bold">Loading...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
         
            <div className="lg:col-span-1 space-y-4">
                {chartData.map((item) => (
                    <div key={item.name} className="bg-surface p-6 rounded-[2rem] border border-border-color flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl" 
                                 style={{ backgroundColor: `${COLORS[item.name] || COLORS.Default}15`, color: COLORS[item.name] || COLORS.Default }}>
                                {item.name === 'Success' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{item.name} Orders</p>
                                <h3 className="text-2xl font-black text-text-main">{item.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        
            <div className="lg:col-span-2 bg-surface p-8 rounded-[2.5rem] border border-border-color h-[400px] flex flex-col shadow-sm">
                <div className="mb-4">
                    <h3 className="text-sm font-black text-text-main uppercase tracking-[0.2em]">Order Distribution</h3>
                    <p className="text-xs text-text-muted font-medium">Real-time status breakdown</p>
                </div>

                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={10}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[entry.name] || COLORS.Default} 
                                        className="focus:outline-none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ 
                                    backgroundColor: 'var(--color-bg-primary)', 
                                    borderRadius: '16px', 
                                    border: '1px solid var(--color-border-color)',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}
                            />
                            <Legend 
                                verticalAlign="middle" 
                                align="right" 
                                layout="vertical" 
                                iconType="circle"
                                formatter={(value) => <span className="text-text-main font-bold text-xs ml-2">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default OrderStatusAnalytics;