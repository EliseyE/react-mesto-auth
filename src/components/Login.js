import React from "react";
import EmailPassPageForm from "./EmailPassPageForm";


function Login({onSubmit}) {

  function handleSubmit(loginData) {
    onSubmit(loginData);
  }

  return(
    <EmailPassPageForm
      name={'login'}
      title={'Вход'}
      sumbitButtonName={'Войти'}
      onSubmit={handleSubmit}
    />
  );
}

export default Login;
