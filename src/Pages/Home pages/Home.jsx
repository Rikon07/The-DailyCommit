import React from 'react';
import Banner from '../../Components/Home Components/Banner';
import Plans from '../../Components/Home Components/Plans';
import TrendingArticles from '../../Components/Home Components/TrendingArticles';
import AllPublisher from '../../Components/Home Components/AllPublisher';
const Home = () => {
    return (
        <div>
            <Banner />
            <Plans />
            <TrendingArticles />
            <AllPublisher />
        </div>
    );
};

export default Home;