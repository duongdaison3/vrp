import React, { Component } from 'react';
import MeaningContent from './MeaningContent';

class DataContent extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <br></br>
          <h3 className='types'>{this.props.type}</h3>
        </div>
        {this.props.meanings.map((value, index) => {
          return (
            <>
              <MeaningContent data={value.data} examples={value.examples}></MeaningContent>            
            </>
          )
        })}
        <br></br>
        <br></br>
      </div>

    );
  }
}

export default DataContent;