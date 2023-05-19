import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";

import qs from "../utils/questions.json";
import isEmpty from "../utils/is-empty";

import axios from "axios";
import correctNotification from "../assets/audio/correct-answer.mp3";
import wrongNotification from "../assets/audio/wrong-answer.mp3";
import buttonSound from "../assets/audio/button-sound.mp3";
import "../css/Play.css"
import { answer1,answer2, answer3, showQuestionCustom } from "../utils/helper";


class PlayPronounce extends Component {
  constructor(props) {
    super(props);
      this.state = {
      questions : [],
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
          time: {},
      id: ''
    };
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
      this.startTimer();
      this.showQuestionCustom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

   shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
    }
    
     showQuestionCustom = async () => {
         const data = await axios.get("http://localhost:3001/api/get-list-question");
         const arr = [
             {
                "question": `How is ${data.data.data[0].question[0].word} this word pronounced?`,
                "optionA": `${data.data.data[0].question[0].word}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[0].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[0].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer1(data.data.data[0].question[0].pronunciation)}`,
                "answer": `${data.data.data[0].question[0].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[1].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[1].pronunciation)}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[1].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[1].pronunciation)}`,
                "optionD": `${data.data.data[0].question[1].word}`,
                "answer": `${data.data.data[0].question[1].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[2].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[2].pronunciation)}`,
                "optionB": `${data.data.data[0].question[2].word}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[2].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer2(data.data.data[0].question[2].pronunciation)}`,
                "answer": `${data.data.data[0].question[2].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[3].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[3].pronunciation)}`,
                "optionB": `${data.data.data[0].question[3].word}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[3].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer2(data.data.data[0].question[3].pronunciation)}`,
                "answer": `${data.data.data[0].question[3].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[4].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[4].pronunciation)}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[4].pronunciation)}`,
                "optionC": `${data.data.data[0].question[4].word}`,
                "optionD": `${data.status === 200 && await answer3(data.data.data[0].question[4].pronunciation)}`,
                "answer": `${data.data.data[0].question[4].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[5].word} this word pronounced?`,
                "optionA": `${data.data.data[0].question[5].word}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[5].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[5].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer1(data.data.data[0].question[5].pronunciation)}`,
                "answer": `${data.data.data[0].question[5].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[6].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[6].pronunciation)}`,
                "optionB": `${data.data.data[0].question[6].word}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[6].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer2(data.data.data[0].question[6].pronunciation)}`,
                "answer": `${data.data.data[0].question[6].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[7].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[7].pronunciation)}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[7].pronunciation)}`,
                "optionC": `${data.data.data[0].question[7].word}`,
                "optionD": `${data.status === 200 && await answer3(data.data.data[0].question[7].pronunciation)}`,
                "answer": `${data.data.data[0].question[7].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[8].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[8].pronunciation)}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[8].pronunciation)}`,
                "optionC": `${data.data.data[0].question[8].word}`,
                "optionD": `${data.status === 200 && await answer3(data.data.data[0].question[8].pronunciation)}`,
                "answer": `${data.data.data[0].question[8].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[9].word} this word pronounced?`,
                "optionA": `${data.data.data[0].question[9].word}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[9].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer1(data.data.data[0].question[9].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer3(data.data.data[0].question[9].pronunciation)}`,
                "answer": `${data.data.data[0].question[9].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[10].word} this word pronounced?`,
                "optionA": `${data.data.data[0].question[10].word}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[10].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer1(data.data.data[0].question[10].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer3(data.data.data[0].question[10].pronunciation)}`,
                "answer": `${data.data.data[0].question[10].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[11].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[11].pronunciation)}`,
                "optionB": `${data.data.data[0].question[11].word}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[11].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer2(data.data.data[0].question[11].pronunciation)}`,
                "answer": `${data.data.data[0].question[11].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[12].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[12].pronunciation)}`,
                "optionB": `${data.status === 200 && await answer2(data.data.data[0].question[12].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[12].pronunciation)}`,
                "optionD": `${data.data.data[0].question[12].word}`,
                "answer": `${data.data.data[0].question[12].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[13].word} this word pronounced?`,
                "optionA": `${data.status === 200 && await answer1(data.data.data[0].question[13].pronunciation)}`,
                "optionB": `${data.data.data[0].question[13].word}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[13].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer2(data.data.data[0].question[13].pronunciation)}`,
                "answer": `${data.data.data[0].question[13].word}`
             },
             {
                "question": `How is ${data.data.data[0].question[14].word} this word pronounced?`,
                "optionA": `${data.data.data[0].question[14].word}`,
                "optionB": `${data.status === 200 && await answer1(data.data.data[0].question[14].pronunciation)}`,
                "optionC": `${data.status === 200 && await answer3(data.data.data[0].question[14].pronunciation)}`,
                "optionD": `${data.status === 200 && await answer2(data.data.data[0].question[14].pronunciation)}`,
                "answer": `${data.data.data[0].question[14].word}`
             }
         ]
         
         this.setState({
             ...this.state,
             questions: this.shuffle(arr),
             id: data.data.data[0]._id
        })
      };
  

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctTimeout = setTimeout(() => {
        this.correctSound.current.play();
      }, 500);
      this.correctAnswer();
    } else {
      this.wrongTimeout = setTimeout(() => {
        this.wrongSound.current.play();
      }, 500);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/");
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers:
                  prevState.previousRandomNumbers.concat(randomNumber),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                newRandomNumber !== indexOfAnswer
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);

      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 240000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance,
          },
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  endGame = () => {
    alert("Quiz has eneded!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints,
    };

    axios
    .post(`http://localhost:3001/api/add-top`, {
        idUser: localStorage.getItem("id"),
        score: (this.state.score / this.state.numberOfQuestions) * 100,
        correctAnswers: this.state.correctAnswers,
        wrongAnswers : this.state.wrongAnswers
    })
      
      axios.delete(`http://localhost:3001/api/delete-question/${this.state.id}`);
      

    setTimeout(() => {
      this.props.history.push("/quiz-summary", playerStats);
    }, 1000);
  };

    render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      fiftyFifty,
      hints,
      numberOfQuestions,
      time,
    } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <Fragment>
          <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </Fragment>
        <div className="questions">
          <h2>Quiz Mode</h2>
          <div className="lifeline-container">
            <p>
              <span
                onClick={this.handleFiftyFifty}
                className="mdi mdi-set-center mdi-24px lifeline-icon"
              >
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span
                onClick={this.handleHints}
                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
              >
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left" style={{ float: "left" }}>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
              <span
                className={`right valid ${time.distance <= 120000 && 'warning'} ${time.distance < 30000 && 'invalid'}`}
              >
                {time.minutes}:{time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>

          <div className="button-container">
            <button
              className={this.state.previousButtonDisabled && 'disable'}
              id="previous-button"
              onClick={this.handleButtonClick}
            >
              Previous
            </button>
            <button
              className={this.state.nextButtonDisabled && 'disable'}
              id="next-button"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PlayPronounce;
