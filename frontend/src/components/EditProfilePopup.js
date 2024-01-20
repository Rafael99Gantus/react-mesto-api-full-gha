import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='editProfilePopup'
      title='Редактировать профиль'
      buttonText='Сохранить'
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
        value={name || ''}
        onChange={handleChangeName} />

      <span className="fieldNamePopupProfile-error popup__input-error" />

      <input id="fieldWorkPopupProfile"
        className="popup__field"
        type="text"
        placeholder="Род деятельности"
        name="activity"
        minLength={2}
        maxLength={200}
        required
        value={description || ''}
        onChange={handleChangeDescription} />

      <span className="fieldWorkPopupProfile-error popup__input-error" />
    </PopupWithForm>
  )
}