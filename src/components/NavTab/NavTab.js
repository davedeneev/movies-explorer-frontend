import React from 'react';

function NavTab() {
    return(
        <nav className="navtab">
            <ul className="navtab__links">
                <li className="navtab__link"><a className="link__desc" href="#about-project">О проекте</a></li>
                <li className="navtab__link"><a className="link__desc" href="#techs">Технологии</a></li>
                <li className="navtab__link"><a className="link__desc" href="#student">Студент</a></li>
            </ul>
        </nav>
    );
}

export default NavTab;