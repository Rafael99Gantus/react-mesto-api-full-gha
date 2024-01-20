export default function ImagePopup({ card, closeFunc }) {
  const className = card ? 'popup_opened' : '';
  return (
    <div className={`popup popup_opacity ${className}`} id={card?.name}>
      <div className="popup__containerImage">
        <button id="closedIconPopupImage" className="popup__closed" type="button" onClick={closeFunc} />
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__titleImage">{card?.name}</h2>
      </div>
    </div>

  )
}