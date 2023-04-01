import React, { useContext, useEffect, useState } from "react";
import SingleMenu from "./SingleMenu";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SingleMenuLogOut({link, linkText, singleMenuMod, textMod, linkMod, onClick }) {

  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(currentUser.email);
  }, [currentUser]);

  return(
      <SingleMenu
        text={email}
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
