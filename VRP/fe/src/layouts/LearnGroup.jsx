import React, { Component } from 'react';
import HeaderWeb from "../components/HeaderWeb";
import Footer from "../components/Footer";
import WordContent from '../components/WordContent'
import { authHeader } from '../helpers';
import {authenticationService} from '../services/authentication.service'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import '../css/LearnGroup.css'

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class CardFront extends React.Component {
  state = {
    text: "",
  }

  updateContent = (newWord) => {
    this.setState({
      text: newWord
    })
  }

  render() {
    return (
      <div className='card-side side-front-content'>
        <div className='container-fluid'>

          <div className="d-flex justify-content-center">

            <h1>{this.state.text}</h1>

          </div>

        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  constructor(props) {
    super(props);
    this.childContent = React.createRef();
  }

  updateContent = (newContent) => {
    this.childContent.current.updateContent(newContent);
  }

  render() {
    return (
      <div className='card-side side-back'>
        <div className="container-fluid">
          <WordContent ref={this.childContent}></WordContent>
        </div>

      </div>
    )
  }
}

class LearnGroup extends Component {

  constructor(props) {
    super(props);
    if (!authenticationService.currentUserValue) {
      window.alert("You must login");
      window.location.href = '/'
    }
    this.frontFace = React.createRef();
    this.backFace = React.createRef();
  }

  state = {
    currentIndex: 0,
    currentWord: "",
    name: "",
    currentWords: [],
    originalWords: [],
    result: [],
    wrong: 0,
    right: 0,
  }

  getData = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/wordGroups/${this.props.match.params.wordGroupId}`, {
        method: 'GET',
        headers: authHeader(),
        credentials: 'include',
      }).then((res) => { return res.json(); })
      if (result.wGroup) {
        this.setState({
          name: result.wGroup.name,
          originalWords: result.words,
        });
        this.shuffle();
      }
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  updateBackFace = (newWord) => {
    this.backFace.current.updateContent(newWord);
  }

  updateFrontFace = (newWord) => {
    this.frontFace.current.updateContent(newWord);
  }

  shuffle = () => {
    this.setState({
      currentWords: shuffle([...this.state.originalWords]),
      wrong: 0,
      right: 0
    });
    this.setState({
      currentIndex: 0
    });
    this.setState({
      currentWord: this.state.currentWords[0].word
    });
    console.log(this.state)
    this.updateFrontFace(this.state.currentWord);
    this.updateBackFace(this.state.currentWord);
  }

  wordLeft = () => {
    return this.state.originalWords.length - (this.state.wrong + this.state.right);
  }

  alertResult = () => {
    window.alert("Result:" + this.state.wrong + '/' + this.state.right)
  }

  wrongGuest = () => {
    if (this.wordLeft() > 0) {
      this.setState({
        wrong: this.state.wrong + 1
      })
      this.next();
    }
    if (this.wordLeft() === 0) {
      this.alertResult();
    }
    

  }

  rightGuest = () => {
    if (this.wordLeft() > 0) {
      this.setState({
        right: this.state.right + 1
      })
      this.next();
    }
    if (this.wordLeft() === 0) {
      this.alertResult();
    }

  }

  next = () => {
    var temp = this.state.currentIndex
    this.setState({
      currentIndex: temp + 1
    });
    this.setState({
      currentWord: this.state.currentWords[this.state.currentIndex].word
    });
    this.updateFrontFace(this.state.currentWord);
    this.updateBackFace(this.state.currentWord);
    console.log(this.state)

  }

  componentWillMount() {
    this.getData();
  }

  render() {

    return (
      <div>
        <HeaderWeb></HeaderWeb>
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <List component="nav">
                <ListItem>
                  <ListItemText primary={this.state.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={this.state.wrong + '/' + this.state.right} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Left:" + (this.wordLeft())} />
                </ListItem>
                <Divider />
                <ListItem button onClick={this.shuffle}>
                  <ListItemText primary="Reset" />
                </ListItem>
                <ListItem button onClick={() => { window.location.href = `/wordGroups/${this.props.match.params.wordGroupId}` }}>
                  <ListItemText primary="Back" />
                </ListItem>
              </List>
            </div>
            <div className="col-8">
              <div className='react-card'>
                <div className='card-container'>
                  <div className='card-body'>
                    <CardBack ref={this.backFace} />

                    <CardFront ref={this.frontFace} />
                  </div>
                </div>
                <div className="d-flex justify-content-around">
                  <button type="button" className="btn btn-primary" onClick={this.wrongGuest}>Wrong</button>
                  <button type="button" className="btn btn-primary" onClick={this.rightGuest}>Right</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



    )
  }
}

export default LearnGroup;