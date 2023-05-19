import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./layouts/HomePage";
import LoginPage from "./layouts/LoginPage";
import SignUpPage from "./layouts/SignUpPage";
import LearningPage from "./layouts/LearningPage";
import WordGroupPage from "./layouts/WordGroupPage";
import LearnGroup from "./layouts/LearnGroup";
import Translate from "./layouts/Translate";
import Questions from "./layouts/Question";
import FinalScreen from "./layouts/FinalScreen";
import Settings from "./layouts/Settings";
import QuizInstructions from "./layouts/QuizInstructions";
import Play from "./layouts/Play";
import QuizSummary from "./layouts/QuizSummary";
import PronouncePlay from "./layouts/PronouncePlay";
import ShowStatistical from "./layouts/ShowStatistical";
import PlayPronounce from "./layouts/PlayPronounce";

export default class App extends Component {
  render() {
    return (
      <div class="App">
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/homepage" />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/learning" component={LearningPage} />
            <Route exact path="/translate" component={Translate} />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/score" component={FinalScreen} />
            <Route exact path="/home-questions" component={Settings} />
            <Route exact path="/quiz-play" component={Play} />
            <Route exact path="/quiz-summary" component={QuizSummary} />
            <Route exact path="/pronounce-play" component={PronouncePlay} />
            <Route exact path="/show-score" component={ShowStatistical} />
            <Route
              exact
              path="/quiz-play-pronounce"
              component={PlayPronounce}
            />
            <Route
              exact
              path="/quiz-instruction"
              component={QuizInstructions}
            />

            <Route
              exact
              path="/wordGroups/:wordGroupId"
              component={WordGroupPage}
            />
            <Route
              exact
              path="/learnGroup/:wordGroupId"
              component={LearnGroup}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
