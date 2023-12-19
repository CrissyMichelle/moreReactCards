import React, { useState, useEffect } from "react";
import {v1 as uuid} from "uuid";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import { useAxios } from "./hooks";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, setCards] = useState([]);
  const [responses, fetchData] = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");

  const addCard = () => {
    fetchData(); // triggers a new axios request
  };
  // update the cards state when new data is fetched
  useEffect(() => {
    if (responses.length) {
      const latestResponse = responses[responses.length - 1];

      if (latestResponse.cards && latestResponse.cards.length > 0) {
        setCards(cards => [...cards, { ...latestResponse.cards[0], id: uuid() }]);
      }
    }
  }, [responses, fetchData]);

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
