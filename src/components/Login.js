import React from "react";
import InitialPageForm from "./InitialPageForm";

function Login({onSubmit}) {

  return(
    <InitialPageForm
      name={'login'}
      title={'Вход'}
      sumbitButtonName={'Войти'}
      onSubmit={onSubmit}
    />
  );
}

export default Login;
