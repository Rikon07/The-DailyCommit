import React from 'react';
import DashboardSidebar from '../Components/Dashboard Components/DashboardSidebar';
import { Outlet } from 'react-router';
import DashboardNavbar from '../Components/Dashboard Components/DashboardNavbar';

const Dashboard = () => {
    return (
        <div>
            <div className="flex min-h-screen">
            <DashboardNavbar />
      <DashboardSidebar />
      <main className="flex-1 bg-white dark:bg-[#1e293b] p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
        </div>
    );
};

export default Dashboard;