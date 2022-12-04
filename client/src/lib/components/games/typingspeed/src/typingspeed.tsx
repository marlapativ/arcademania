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

componentDidMount() {
    this.setState({words: this.state.typeTest.split(' ')})
  }

  wordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor((charsTyped / 5) / (millis / 60000))

  checkFinished = (): void => {
    if (!this.state.words.length) {
      if (this.state.startTime) {
        const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
        const wpm = this.wordsPerMinute(this.state.typeTest.length, timeMillis)
        this.setState({wordsPerMinute: wpm})
      }
    }
  }

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!this.state.started) {
      this.setState({started: true, startTime: new Date()})  
    }

    console.log(e.currentTarget.value)
    const enteredText = e.currentTarget.value.trim()
    this.setState({enteredText})
    if (enteredText === this.state.words[0]) {
      console.log('Right')
      this.setState({correctCount: this.state.correctCount + 1})
      this.setState({enteredText: ''})
      this.setState({words: this.state.words.slice(1)},
                    (): void => this.checkFinished())
    }
  }
export default TypingSpeed
