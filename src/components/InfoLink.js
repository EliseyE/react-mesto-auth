import React from "react";

function InfoLink({text='', linkText, infoLinkMod='', link='/'}) {

  return(
    <div className={`info-link ${infoLinkMod}`}>
      <p className="info-link__text">{text}</p>
      <a className="link" href={link} >{linkText}</a>

    </div>
  );
}

export default InfoLink;
