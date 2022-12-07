import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  enum GameState {
    bet,
    init,
    userTurn,
    dealerTurn
  }

  enum Deal {
    user,
    dealer,
    hidden
  }

  enum Message {
    bet = 'Place a Bet!',
    hitStand = 'Hit or Stand?',
    bust = 'Bust!',
    userWin = 'You Win!',
    dealerWin = 'Dealer Wins!',
    tie = 'Tie!'
  }

}