import React, { Component } from 'react';
import ExampleContent from './ExampleContent'
class MeaningContent extends Component {

  render() {
    return (

      <div>
        <div className="row">
          <br></br>
        
          <h5 className='tile_data'>{this.props.data}</h5>
        </div>
        {this.props.examples.map((value, index) => {
          return (
            <ExampleContent data={value.data} examples={value.examples}></ExampleContent>
          )
        })}
      </div>

    );
  }
}

export default MeaningContent;