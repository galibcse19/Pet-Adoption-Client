import React from 'react';
import Banner from './Banner';
import PetsCategory from './PetsCategory';
import CallToAction from './CallToAction';
import AboutUs from './AboutUs';
import PetCareTips from './PetCareTips';
import VolunteerSupportSection from './VolunteerSupportSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <PetCareTips></PetCareTips>
            <VolunteerSupportSection></VolunteerSupportSection>
        </div>
    );
};

export default Home;