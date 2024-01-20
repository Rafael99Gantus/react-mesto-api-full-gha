import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	function handleClick() {
		props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card)
	}

	function handleDeleteCard() {
		props.onCardDelete(props.card)
	}

	const isOwn = props.isOwn === currentUser._id;
	const isLiked = props.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (`elements__heart ${isLiked ? 'elements__heart_active' : ''}`);;

	return (
		<article id='elements__element' className="elements__element">
			{isOwn && <button id="trash" type="button" className='elements__trash' onClick={handleDeleteCard} />}
			{/* {props.onAnswer} Будет использоваться для открытия попапа Answer*/}
			<div className="elements__box">
				<img className="elements__image" src={props.link} alt={props.name} onClick={handleClick} />
			</div>
			<div className="elements__blocks">
				<h2 className="elements__name">{props.name}</h2>
				<div className="elements__group">
					<button id="first-heart" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<p id="first-number" className='elements__number'>{props.likes.length}</p>
				</div>
			</div>
		</article>
	)
};