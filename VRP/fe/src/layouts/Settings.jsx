import React, { Fragment } from 'react';
import HeaderWeb from "../components/HeaderWeb";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import "../css/Setting.css"

const Settings = () => {

  return (
    <div>

        <HeaderWeb></HeaderWeb>
        <br />
        <br />
        <br />
        <Fragment>
        <Helmet><title>Home - Quiz Test</title></Helmet>
        <div id="home">
            <section>
                <div style={{ textAlign: 'center' }}>
                    <span className="mdi mdi-cube-outline cube"></span>
                </div>
                <h1>Quiz Test</h1>
                <div className="play-button-container mt-3">
                    <ul>
                        <li><Link className="play-button mb-3" to="/quiz-play">Play Choose the Meaning</Link></li>
                        <li><Link className="play-button" to="/pronounce-play">Play Pronounce</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link to="/quiz-instruction" className="auth-buttons" id="signup-button">Instruction</Link>
                    <Link to="/show-score" className="auth-buttons" id="signup-button">Show Statistical</Link>
                </div>
            </section>
        </div>
    </Fragment>

      </div>
  );
};

export default Settings;
