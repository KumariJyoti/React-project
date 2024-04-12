import React, { Component } from "react";
import {QUESTIONS} from "./questions";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 1,
      yesCount: 0,
      totalRuns: 0,
      totalScore: 0,
      questionslength:  Object.keys(QUESTIONS).length,
      showScore: false
    };
 }

  handleAnswer = (answer) => {
    if (answer === 'Yes') {
      this.setState(prevState => ({ yesCount: prevState.yesCount + 1 }));
    }
    this.setState(prevState => ({ currentQuestion: prevState.currentQuestion + 1 }), () => {
      if (this.state.currentQuestion > this.state.questionslength) {
        this.calculateScore();
      }
    });
  };

  calculateScore = () => {
    const score = (100 * this.state.yesCount) / this.state.questionslength;
    this.setState(prevState => ({
      totalRuns: prevState.totalRuns + 1,
      totalScore: prevState.totalScore + score,
      showScore: true
    }));
  };

  reset = () => {
    this.setState({ currentQuestion: 1, yesCount: 0, showScore: false });
  };

  render() {
    if (!this.state.showScore) {
       return (
          <div className="App">
            <h1>{QUESTIONS[this.state.currentQuestion]}</h1>
            <button onClick={() => this.handleAnswer('Yes')}>Yes</button>
            <button onClick={() => this.handleAnswer('No')}>No</button>
          </div>
        );
  } else {
    const averageScore = this.state.totalScore / this.state.totalRuns;
    return (
      <div className="App">
        <h1>Your score is: {this.state.totalScore}</h1>
        <h1>Average score: {averageScore}</h1>
        <button onClick={this.reset}>Play again</button>
      </div>
    );
  }
}
}

export default App;
