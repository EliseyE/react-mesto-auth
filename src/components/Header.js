import React from "react";
import headerLogoPath from '../images/logos/header-logo.svg';
import InfoLink from "./InfoLink";

function Header({text=''}) {
  return(
  <header className="header page__header">
    <img src={headerLogoPath} alt="Место Россия" className="header__logo" />
    <InfoLink
      linkText={'Войти'}
      infoLinkMod={'info-link_place_header'}
    />
  </header>
  );
};

export default Header;
