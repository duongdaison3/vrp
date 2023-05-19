import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import HeaderWeb from '../components/HeaderWeb';
import axios from "axios";
import "../css/QuizSummary.css"

class PronouncePlay extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listItem: [],
            listQuestion: []
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount () {
        this.getData()
    }

     getData() {
         axios
          .get(`http://localhost:3001/api/show-all-word`)
             .then((response) => {
              console.log('====================================');
              console.log(response);
              console.log('====================================');
            this.setState({
                ...this.state,
                listItem: response.data.data,
          })
          });
    }
    
    chooseItem(id,pronunciation) {
        if (this.state.listQuestion.length < 15) {
            const check = this.state.listQuestion.length > 0 && this.state.listQuestion.find((i) => i.word === id);
        if (check) {
            var index = this.state.listQuestion.indexOf(check);
            if (index !== -1) {
                this.state.listQuestion.splice(index, 1);
            }
        } else {
            this.state.listQuestion.push({
                'word': id,
                'pronunciation':pronunciation
            });
        }
        } else {
            alert('The number of questions cannot exceed 16 questions')
        }
    }

     handleSubmit = async() =>  {
        const res = await axios.post(`http://localhost:3001/api/save-question`, {
            question: this.state.listQuestion
        });
        if (res.status === 200) {
            alert('Create Success');
            this.props.history.push("/quiz-play-pronounce");
        }
    }

    render () {

        return (
            <div>
                    <HeaderWeb></HeaderWeb>
                <br />
                <br />
                <br />
                <Fragment>
                    <div className="col-9" style={{ margin: '0 auto' }}>
                        <div className="btn btn-success m-4"
                            onClick={this.handleSubmit}
                            style={{ 
                            position: 'fixed',
                            right: 0
                         }}>
                            Choose
                        </div>
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Name</th>
                        <th scope="col">Pronounce</th>
                        </tr>
                    </thead>
                    <tbody>
                                {this.state.listItem.map((e) => (
                            <tr key = {e._id}>
                                        <th scope="row">
                                            <input type="checkbox" value={e._id} onChange={()=> this.chooseItem(e.word,e.pronunciation)} />
                            </th>
                                        <td>{e.word}</td>
                                        <td>{e.pronunciation}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </Fragment>
                </div>
        );
    }
}

export default PronouncePlay;