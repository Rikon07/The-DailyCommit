import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from "../Components/Home Components/Navbar";
import Footer from '../Components/Home Components/Footer';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/UseAuth';
const MainLayout = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

useEffect(() => {
  const promoteToAdmin = async () => {
    // console.log(user.email);
    if (user?.email === "rik.shelby@gmail.com") {
      try {
        const res = await axiosSecure.get(`/users/make-admin/${user.email}`);
        // console.log(res.data);
        if (res.data?.role !== "admin") {
          // const patchRes = await axiosSecure.patch(`/users/make-admin/${user.email}`);
          await axiosSecure.patch(`/users/make-admin/${user.email}`);
          // console.log("Admin promotion done ✅", patchRes.data);
        }
      } catch (err) {
        console.error("Failed to promote to admin ❌", err);
      }
    }
  };
  promoteToAdmin();
}, [user]);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;