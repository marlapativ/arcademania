import React, { useState, useEffect } from 'react';
import styles from './styles/Controls.module.scss';

type ControlsProps = {
  balance: number,
  gameState: number,
  buttonState: any,
  betEvent: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

