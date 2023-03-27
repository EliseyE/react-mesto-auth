import React from "react";
import InfoLink from "./InfoLink";
import InitialPageForm from "./InitialPageForm";


function Register({onSubmit}) {

  return(
      <InitialPageForm
        name={'register'}
        title={'Регистрация'}
        sumbitButtonName={'Зарегистрироваться'}
        onSubmit={onSubmit}
      >
        <InfoLink
          text={'Уже зарегистрированы?'}
          linkText={'Войти'}
          infoLinkMod={'info-link_place_register'}
          link={'/sign-in'}
        />
      </InitialPageForm>
  );
}

export default Register;
