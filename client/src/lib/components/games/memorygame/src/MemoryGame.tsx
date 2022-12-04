import React from 'react';

const MemoryGame = () => {
  const [cards, setCards] = React.useState<CardType[]>(shuffleArray(createBoard()));
  const [gameWon, setGameWon] = React.useState(false);
  const [matchedPairs, setMatchedPairs] = React.useState(0);
  const [clickedCard, setClickedCard] = React.useState<undefined | CardType>(undefined);

  React.useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      console.log('Game Won!');
      setGameWon(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (currentClickedCard: CardType) => {
    // Flip the card
    setCards(prev =>
      prev.map(card => (card.id === currentClickedCard.id ? { ...card, flipped: true, clickable: false } : card))
    );
    // If this is the first card that is flipped
    // just keep it flipped
    if (!clickedCard) {
      setClickedCard({ ...currentClickedCard });
      return;
    }

    

export default MemoryGame;
