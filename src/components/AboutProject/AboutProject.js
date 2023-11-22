import React from 'react';

function AboutProject() {
    return(
        <section id="about-project" className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project-desc">
                <h3 className="about-project-desc__title">Дипломный проект включал 5 этапов</h3>
                <h3 className="about-project-desc__title">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project-desc__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="about-project-desc__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="project-progress">
                <p className="project-progress__duration">1 неделя</p>
                <p className="project-progress__duration">4 недели</p>
                <p className="project-progress__desc">Back-end</p>
                <p className="project-progress__desc">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;