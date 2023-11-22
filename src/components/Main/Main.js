import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab.js'
import AboutProject from '../AboutProject/AboutProject.js'
import Techs from '../Techs/Techs.js'
import AboutMe from '../AboutMe/AboutMe.js'
import Portfolio from '../Portfolio/Portfolio.js'
import Footer from "../Footer/Footer";

function Main(){
    return(
        <>
            <main className="content">
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer/>
        </>
    )
}

export default Main;
