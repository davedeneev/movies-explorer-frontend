import React from 'react';
import { Link } from 'react-router-dom';
import studentImg from '../../images/student-img.png';

function AboutMe() {
    return(
        <section id="student" className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me-desc">
                <h3 className="about-me-desc__title">Виталий</h3>
                <p className="about-me-desc__subtitle">Фронтенд-разработчик, 30 лет</p>
                <p className="about-me-desc__detail">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                    У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                    С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                    начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <Link
                    to="https://github.com/davedeneev"
                    target="_blank"
                    className="about-me-desc__github">Github</Link>
            </div>
            <img className="about-me__img" src={studentImg} alt="Фото студента" />
        </section>
    );
}

export default AboutMe;