import React from "react";
import SingleMenu from "./SingleMenu";
import EmailPassPageForm from "./EmailPassPageForm";
import SingleMenuLogIn from "./SingleMenuLogIn";

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
      <SingleMenuLogIn
        text={'Уже зарегистрированы?'}
        singleMenuMod={'single-menu_place_register'}
      />

    </>
  );
}

export default Register;
