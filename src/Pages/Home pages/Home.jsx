import React from 'react';
import Banner from '../../Components/Home Components/Banner';
import Plans from '../../Components/Home Components/Plans';
import TrendingArticles from '../../Components/Home Components/TrendingArticles';
import AllPublisher from '../../Components/Home Components/AllPublisher';
import Statistics from '../../Components/Home Components/Statistics';
import TechNewsMap from '../../Components/Home Components/TechNewsMap';
import TopContributors from '../../Components/Home Components/TopContributors';
import HomepageModal from '../../Components/Home Components/HomeModal';
import useAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import  Features  from '../../Components/Home Components/Features';
import  ResourceLibrary  from '../../Components/Home Components/ResourceLibrary';
import FaqSection from '../../Components/Home Components/Faq';


const Home = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

//   console.log("User Info:", userInfo);

  return (
    <div>
      <HomepageModal />
      <Banner />
      <Plans userInfo={userInfo} />
      <TrendingArticles userInfo={userInfo} />
      <Features />
      <AllPublisher />
      <Statistics />
      <FaqSection />
      <TopContributors />
      <ResourceLibrary />

    </div>
  );
};

export default Home;