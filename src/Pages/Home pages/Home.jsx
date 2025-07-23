import React from 'react';
import Banner from '../../Components/Home Components/Banner';
import Plans from '../../Components/Home Components/Plans';
import TrendingArticles from '../../Components/Home Components/TrendingArticles';
const Home = () => {
    return (
        <div>
            <Banner />
            <Plans />
            <TrendingArticles />
        </div>
    );
};

export default Home;