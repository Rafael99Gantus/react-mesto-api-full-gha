import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { useRef, useEffect } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

    useEffect(() => {
        if (!props.isOpen) {
            avatarRef.current.value = '';
        }
    },[props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

  return (
    <PopupWithForm
      name='editAvatar'
      title='Обновить аватар'
      buttonText='Создать'
      closeFunc={props.closeFunc}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}>

      <input id="fieldLinkPopupAvatar"
        className="popup__field"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        ref={avatarRef} />

      <span className="fieldLinkPopupAvatar-error popup__input-error" />
    </PopupWithForm>
  )
}