import React from 'react';

function Techs() {
    return(
        <section id="techs" className="techs">
            <h2 className="techs__title">Технологии</h2>
            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__desc">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__list">
                <li className="techs__list__item">HTML</li>
                <li className="techs__list__item">CSS</li>
                <li className="techs__list__item">JS</li>
                <li className="techs__list__item">React</li>
                <li className="techs__list__item">Git</li>
                <li className="techs__list__item">Express.js</li>
                <li className="techs__list__item">mongoDB</li>
            </ul>
        </section>
    );
}

export default Techs;