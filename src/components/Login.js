import React from "react";
import EmailPassPageForm from "./EmailPassPageForm";

function Login({onSubmit}) {

  return(
    <EmailPassPageForm
      name={'login'}
      title={'Вход'}
      sumbitButtonName={'Войти'}
      onSubmit={onSubmit}
    />
  );
}

export default Login;
