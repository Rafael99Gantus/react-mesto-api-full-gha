import React from 'react';

export default function InfoTooltip(props) {
    const className = props.isOpen ? 'popup_opened' : '';

    return (
        <div className={`popup ${className}`} >
            <div className="popup__container">
                <button id="closedIconPopupImage" className="popup__closed" type="button" onClick={props.closeFunc} />
                <div className={`popup__tooltip ${props.loggedIn? 'popup__tooltip_success': 'popup__tooltip_failure' }`} alt={'Image'} />
                <p className="popup__text">{`${props.loggedIn? 'Вы успешно зарегистрировались!': 'Что-то пошло не так! Попробуйте ещё раз.'}`}</p>
            </div>
        </div>
    )
}

// ${props.loggedIn? 'src/images/Success.svg': '../images/Failure.svg'}