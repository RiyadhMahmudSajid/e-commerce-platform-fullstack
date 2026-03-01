import React from 'react';
import DashboardSidebar from '../../Dasboard/DashboardSideBar/DashboardSideBar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-bg-primary overflow-x-hidden">
           
            <div className="w-0 lg:w-72 flex-shrink-0">
                <DashboardSidebar />
            </div>

   
            <main className="flex-1 flex flex-col min-w-0 relative z-10">
                <div className="p-4 md:p-8 mt-16 lg:mt-0">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </div>

                <footer className="mt-auto p-5 text-center text-text-muted text-xs font-bold uppercase tracking-widest border-t border-border-color bg-bg-primary">
                    &copy; 2026 ShopHub. All rights reserved.
                </footer>
            </main>
        </div>
    );
};

export default DashboardLayout;