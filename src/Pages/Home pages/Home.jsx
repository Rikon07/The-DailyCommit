import React from 'react';
import Banner from '../../Components/Home Components/Banner';
import Plans from '../../Components/Home Components/Plans';
import TrendingArticles from '../../Components/Home Components/TrendingArticles';
import AllPublisher from '../../Components/Home Components/AllPublisher';
import Statistics from '../../Components/Home Components/Statistics';
import TechNewsMap from '../../Components/Home Components/TechNewsMap';
import TopContributors from '../../Components/Home Components/TopContributors';
import HomepageModal from '../../Components/Home Components/HomeModal';


const Home = () => {
    return (
        <div>
            <HomepageModal />
            <Banner />
            <Plans />
            <TrendingArticles />
            <AllPublisher />
            <Statistics />
            <TechNewsMap />
            <TopContributors />
        </div>
    );
};

export default Home;