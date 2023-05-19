import React, { Component } from "react";
import HeaderWeb from "../components/HeaderWeb";
import Footer from "../components/Footer";
import axios from "axios";

class Translate extends Component {
 
    constructor (props) {
        super(props);

        this.state = {
            inputText: "",
            resultText: "",
            selectedLanguageKey: "",
            languagesList: [],
            detectLanguageKey: "",
        };
        
        this.languageKey = this.languageKey.bind(this);
        this.getLanguageSource = this.getLanguageSource.bind(this);
        this.translateText = this.translateText.bind(this);
        this.setInput = this.setInput.bind(this);
    }

  getLanguageSource() {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: this.state.inputText,
      })
      .then((response) => {
        this.setState({
          ...this.state,
          detectLanguageKey: response.data[0].language,
        });
      });
  }

  componentDidMount() {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      this.setState({
        ...this.state,
        languagesList: response.data,
      });
    });
    axios
      .post(`https://libretranslate.de/detect`, {
        q: this.state.inputText,
      })
      .then((response) => {
        this.setState({
          ...this.state,
          detectLanguageKey: response.data[0].language,
        });
      });
  }

  async translateText() {
    // this.setState({
    //   ...this.state,
    //   resultText: this.state.inputText,
    // });
      

    await axios
      .post(`https://libretranslate.de/detect`, {
        q: this.state.inputText,
      })
      .then((response) => {
        this.setState({
          ...this.state,
          detectLanguageKey: response.data[0].language,
        });
      });

    let data = {
      q: this.state.inputText,
      source: this.state.detectLanguageKey,
      target: this.state.selectedLanguageKey,
    };
    await axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      this.setState({
        ...this.state,
        resultText: response.data.translatedText,
      });
    });
  }

  languageKey(selectedLanguage) {
    this.setState({
      ...this.state,
      selectedLanguageKey: selectedLanguage.target.value,
    });
  }

  setInput(e) {
    this.setState({
      ...this.state,
      inputText: e.target.value,
    });
  }

  render() {
    return (
      <>
        <HeaderWeb></HeaderWeb>
        <br />
        <br />
        <br />
        <div className="container" style={{ height: "500px" }}>
          <div className="row">
            <div className="col-sm-4">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">INPUT</label>
                <textarea
                  class="form-control input_basic"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => this.setInput(e)}
                ></textarea>
              </div>
            </div>
            <div className="col-sm-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">LANGUAGE</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.languageKey}
                >
                  <option>Please Select Language..</option>
                  {this.state.languagesList.map((language) => {
                    return (
                      <option value={language.code}>{language.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
                    <div className="col-sm-5 " style={{ display: 'flex' ,alignItems:'center' }}>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">OUTPUT</label>
                <textarea
                  class="form-control input_basic"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={this.state.resultText}
                ></textarea>
              </div>
              <button className="btn btn-success ml-4" onClick={this.translateText}>Translate</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Translate;
