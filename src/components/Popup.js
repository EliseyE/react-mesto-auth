import React from "react";

function Popup({name, children, isOpen, onClose}) {

  return(
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}
      onMouseDown={onClose}
    >
      <div className="popup__container" onMouseDown={e => e.stopPropagation()}>
        <button
          className={`popup__close-button popup__close-button_type_${name}`}
          type="button"
          onClick={onClose}
        ></button>
        {children}
      </div>
  </section>
  );
}

export default Popup;
