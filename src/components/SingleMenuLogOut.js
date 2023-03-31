import React, { useContext } from "react";
import SingleMenu from "./SingleMenu";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SingleMenuLogOut({link, linkText, singleMenuMod, textMod, linkMod, onClick }) {

  const currentUser = useContext(CurrentUserContext);

  return(
      <SingleMenu
        text={currentUser.email}
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
