import React from "react";

function ImagePopup({card, isOpen, onClose}) {

  return(
    <section
      className={`popup popup_type_image ${isOpen ? 'popup_is-opened' : ''}`}
      aria-label="Модальное окно с картинкой"
      onMouseDown={onClose}
    >
      <div className="popup__container" onMouseDown={e => e.stopPropagation()}>
        <button
          className="popup__close-button popup__close-button_type_image"
          type="button"
          onClick={onClose}

        ></button>
        <figure className="figure-space">
          <img
            className="figure-space__image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="figure-space__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ImagePopup;
