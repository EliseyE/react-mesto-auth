import React, { useContext } from "react";
import SingleMenu from "./SingleMenu";
import EmailPassPageForm from "./EmailPassPageForm";
import { LastResponseStatusContext } from "../contexts/LastResponseStatusContext";

function Register({ onSubmit }) {

  function handleSubmit(regData) {
    onSubmit(regData);
  };

  return(
    <>
      <EmailPassPageForm
        name={'register'}
        title={'Регистрация'}
        sumbitButtonName={'Зарегистрироваться'}
        onSubmit={handleSubmit}
      />
      <SingleMenu
        text={'Уже зарегистрированы?'}
        linkText={'Войти'}
        singleMenuMod={'single-menu_place_register'}
        link={'/sign-in'}
      />
    </>
  );
}

export default Register;
