import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { useRef, useEffect } from "react";

export default function AddPlacePopup(props) {
    const nameRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
        if (!props.isOpen) {
            nameRef.current.value = '';
            linkRef.current.value = '';
        }
    },[props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='editCardsPopup'
            title='Новое место'
            buttonText='Создать'
            closeFunc={props.closeFunc}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}>

            <input id="fieldNamePopupProfile" 
            className="popup__field" 
            type="text" 
            placeholder="Имя" 
            name="fullname" 
            minLength={2} 
            maxLength={40} 
            required 
            ref={nameRef} />

            <span className="fieldNamePopupProfile-error popup__input-error" />

            <input id="fieldWorkPopupProfile" 
            className="popup__field" 
            type="link" 
            placeholder="Ссылка на изображение" 
            name="link" 
            minLength={2} 
            maxLength={200} 
            required 
            ref={linkRef} />

            <span className="fieldWorkPopupProfile-error popup__input-error" />
        </PopupWithForm>
    )
}