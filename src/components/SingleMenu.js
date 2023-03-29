import React from "react";
import { Link } from 'react-router-dom'

function SingleMenu({text='', link='/', linkText='', singleMenuMod='', textMod='', linkMod='' }) {

  return(
    <nav className={`single-menu ${singleMenuMod}`}>
      <p className={`text ${textMod}`}>{text}</p>
      <Link className={`link ${linkMod}`} to={link} >{linkText}</Link>
    </nav>
  );
};

export default SingleMenu;
