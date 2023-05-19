import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import "./../css/SearchBar.css";

export default class SearchBar extends Component {
  state = {
    currentWord: "",
    regexWords: [],
  };

  handleChange = async (e) => {
    this.setState({ currentWord: e.target.value });
    if (e.target.value !== "") {
      try {
        const result = await fetch(
          `http://localhost:3001/api/wordsByRegex/${e.target.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ).then((res) => {
          return res.json();
        });
        this.setState({
          regexWords: result.data,
        });
      } catch (error) {
        window.alert(error.message);
      }
    } else {
      this.setState({
        regexWords: [],
      });
    }
  };

  handleSuggestClick = (selectedWord) => {
    this.setState({
      currentWord: selectedWord,
      regexWords: [],
    });
  };

  searchWord = (event) => {
    event.preventDefault();
    this.props.parentCallBack(this.state.currentWord);
    this.setState({
      regexWords: [],
    });
  };

  resetRegex = (event) => {
    this.setState({
      regexWords: [],
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.searchWord}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth={true}
            value={this.state.currentWord}
            onChange={this.handleChange}
            onBlur={this.resetRegex}
          />
        </form>
        {this.state.regexWords.length !== 0 ? (
          <div className="list-group">
            {this.state.regexWords.map((value, index) => {
              return (
                <>
                  <div
                  className="list-group-item list-group-item-action list-group-item-light"
                  role="alert"
                  onMouseDown={() => {
                    this.handleSuggestClick(value.word);
                  }}
                >
                  {value.word}
                </div>
                </>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
