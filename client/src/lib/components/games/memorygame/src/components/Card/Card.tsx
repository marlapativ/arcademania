import React from 'react';
// Types
import { CardType } from '../../setup';

type Props = {
  card: CardType;
  callback: (card: CardType) => void;
};

