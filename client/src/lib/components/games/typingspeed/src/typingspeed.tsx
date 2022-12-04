import React, { ChangeEvent, Component } from 'react'

interface State {
  typeTest: string
  words: Array<string>
  enteredText: string
  correctCount: number
  started: boolean
  startTime: Date | null
  wordsPerMinute: number | null
}

class TypingSpeed extends Component {
  state: State = {
    typeTest : 'Hello welcome to ArcadeMania',
    words: [],
    enteredText: '',
    correctCount: 0,
    started: false,
    startTime: null,
    wordsPerMinute: null
  } 


export default TypingSpeed
