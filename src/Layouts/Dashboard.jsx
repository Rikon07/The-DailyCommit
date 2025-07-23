import React, { useState } from 'react';
import DashboardSidebar from '../Components/Dashboard Components/DashboardSidebar';
import { Outlet } from 'react-router';
import DashboardNavbar from '../Components/Dashboard Components/DashboardNavbar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex min-h-screen pt-20"> {/* pt-20 for fixed navbar */}
        <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 bg-white dark:bg-[#1e293b] p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;