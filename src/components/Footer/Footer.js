import React from 'react';
import { Route, Routes, Link } from "react-router-dom";

function Footer() {
    return(
        <Routes>
            <Route path="*" element={
                <footer className="footer">
                    <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer__container">
                        <p className="footer__copyright">© 2023</p>
                        <div className="footer__links">
                            <Link to="https://practicum.yandex.ru" className="footer__link" target="_blank">Яндекс.Практикум</Link>
                            <Link to="https://github.com/davedeneev" className="footer__link" target="_blank">Github</Link>
                        </div>
                    </div>
                </footer>
            } />
        </Routes>
    );
}

export default Footer;