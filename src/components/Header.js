import React from "react";
import headerLogoPath from '../images/logos/header-logo.svg';
import SingleMenu from "./SingleMenu";

function Header() {
  return(
  <header className="header page__header">
    <img src={headerLogoPath} alt="Место Россия" className="header__logo" />
    <SingleMenu
      linkText={'Регистрация'}
      singleMenuMod={'single-menu_place_header'}
      link={'/sign-up'}
    />
  </header>
  );
};

export default Header;
