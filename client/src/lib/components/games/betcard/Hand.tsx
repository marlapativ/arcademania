import React from 'react';
import styles from './styles/Hand.module.scss';
import Card from './Card';

type HandProps = {
  title: string,
  cards: any[]
};

const Hand: React.FC<HandProps> = ({ title, cards }) => {
  const getTitle = () => {
    if (cards.length > 0) {
      return (
        <h1 className={styles.title}>{title}</h1>
      );
    }
  }
}