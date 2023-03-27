import React from "react";
import EditForm from "./EditForm";

function InitialPageForm({onSubmit, name, title, sumbitButtonName, children}) {

  return(
    <div className={'page__edit-form'}>
      <EditForm
        name={name}
        title={title}
        sumbitButtonName={sumbitButtonName}
        onSubmit={onSubmit}
        formMod={'edit-form_theme_dark'}
        titleMod={'edit-form__title_place_page'}
        sumbitButtonMod={'edit-form__submit-button_theme_dark'}

      >
        <fieldset className="edit-form__input-container edit-form__input-container_place_page">
          <label className="edit-form__input-label">
            <input
              className="edit-form__input edit-form__input_theme_dark edit-form__input_kind_user-email"
              placeholder="Email"
              type="email"
              name="user-email"
              id="user-email"
              required
              minLength="5"
              maxLength="30"
            />
            <span className="edit-form__input-error user-email-error"></span>
          </label>
          <label className="edit-form__input-label">
            <input
              className="edit-form__input edit-form__input_theme_dark edit-form__input_kind_password"
              placeholder="Пароль"
              type="password"
              name="password"
              id="password"
              required
              minLength="4"
              maxLength="30"
            />
            <span className="edit-form__input-error password-error"></span>
          </label>
        </fieldset>
      </EditForm>
      {children}
    </div>
  );
}

export default InitialPageForm;
