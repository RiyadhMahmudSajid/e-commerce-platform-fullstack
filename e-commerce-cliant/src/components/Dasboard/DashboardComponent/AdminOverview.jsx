import React from 'react';
import CategoryWiseSales from '../DashboardComponent/AdminViewRechart/CategoryWiseSales';
import OrderStatusAnalytics from './AdminViewRechart/OrderStatusAnalytics';
import { LayoutDashboard, Calendar } from 'lucide-react';

const AdminOverview = () => {

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="space-y-10 pb-10">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-color/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-accent mb-2">
            <LayoutDashboard size={18} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard Control</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-main tracking-tighter">
            System <span className="opacity-50">Overview.</span>
          </h1>
          <p className="text-sm text-text-muted font-medium mt-1">
            Welcome back, Admin. Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 bg-surface border border-border-color rounded-2xl shadow-sm self-start md:self-center">
          <Calendar size={18} className="text-accent" />
          <span className="text-xs font-bold text-text-main opacity-80 uppercase tracking-wider">
            {today}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">

        <div className="space-y-4">
          <div className="flex items-center gap-3 ml-2">
             <div className="w-1.5 h-6 bg-accent rounded-full"></div>
             <h2 className="text-lg font-black text-text-main uppercase tracking-widest">Order Life-Cycle</h2>
          </div>
          <OrderStatusAnalytics />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 ml-2">
             <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
             <h2 className="text-lg font-black text-text-main uppercase tracking-widest">Revenue Streams</h2>
          </div>
          <CategoryWiseSales />
        </div>

      </div>

    </div>
  );
};

export default AdminOverview;