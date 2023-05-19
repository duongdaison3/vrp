import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import HeaderWeb from '../components/HeaderWeb';
import axios from "axios";
import "../css/QuizSummary.css"
import { formatDate } from '../utils/helper';


class ShowStatistical extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listItem: [],
            name : ''
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount () {
        this.getData()
    }

    getData() {
        const idUser = localStorage.getItem('id');
         axios
          .get(`http://localhost:3001/api/get-top/${idUser}`)
          .then((response) => {
              this.setState({
                  ...this.state,
                  listItem: response.data.data,
                 name : response.data.name.name
            })
          });
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
                        <h2 className='font-weight-bold text-uppercase'>Show Statistical</h2>
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                                {
                                    this.state.listItem.map((e) => (
                                        <tr key={e._id}>
                                            <th scope="row">{this.state.name}</th>
                                        <td>{e.score}</td>
                                        <td>{formatDate(e.createdAt)}</td>
                                        </tr>
                                    ))
                        }
                    </tbody>
                    </table>
                </div>
                </Fragment>
                </div>
        );
    }
}

export default ShowStatistical;