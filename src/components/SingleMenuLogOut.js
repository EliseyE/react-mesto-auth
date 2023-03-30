import React, { useContext } from "react";
import SingleMenu from "./SingleMenu";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SingleMenuLogOut({text, link, linkText, singleMenuMod, textMod, linkMod, onClick }) {
  const currentUser = useContext(CurrentUserContext);

  return(
      <SingleMenu
        text={text || currentUser.email}
        link={link || ''}
        linkText={linkText || 'Выйти'}
        singleMenuMod={singleMenuMod || ''}
        textMod={textMod || ''}
        linkMod={linkMod || ''}
        onClick={onClick || ''}
      />
  );
}

export default SingleMenuLogOut;
