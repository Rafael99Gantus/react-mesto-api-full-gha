export default function PopupWithForm(props) {
  const className = props.isOpen ? 'popup_opened' : '';
  return (
    <div className={`popup ${className}`} id={props.name}>
      <div className="popup__container">
        <button id="closedIconPopupCards" className="popup__closed" type="button" onClick={props.closeFunc}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} id="cardsEdit">
          {props.children}
          <button type="submit" className="popup__button">{props.buttonText}</button>
        </form>
      </div>
    </div>

  )
} 
//popup__button_disabled