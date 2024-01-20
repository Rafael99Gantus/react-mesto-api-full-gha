import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardInfo } from '../contexts/CurrentCardInfo.js';

export default function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CurrentCardInfo);



  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__overlay">
            <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : ''} alt="аватар" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__block">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
              <button id="openIconPopupProfile" className="profile__rectangle" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__activity">{currentUser.about ? currentUser.about : ''}</p>
          </div>
        </div>
        <button id="openIconPopupCards" className="profile__add-buttom" type="button" onClick={props.onAddPlace} />
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card key={card._id}

              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes}
              isOwn={card.owner._id}

              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onAnswer={props.onAnswer}

              currentUser={currentUser}
            />
          )
        })}
      </section>
    </main>
  )
}