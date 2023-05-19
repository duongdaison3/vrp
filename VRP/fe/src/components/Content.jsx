import React, { Component } from 'react'
import WordContent from './WordContent'
import { authHeader } from '../helpers';
//import hihi from '../static/image/138254.svg'
export default class Content extends Component {

	constructor(props) {
		super(props);
		this.childContent = React.createRef();
		this.state = {
			wordGroups: [],
		  }
	}

	updateContent = (newContent) => {
		this.childContent.current.updateContent(newContent);
	}

	getData = async () => {
		try {
			const id = localStorage.getItem("id");
		  const result = await fetch(`http://localhost:3001/api/wordGroups`, {
			method: 'GET',
			headers: authHeader(),
			  credentials: 'include',
		  }).then((res) => {
			return res.json();
		  })
		  this.setState({
			wordGroups: result
		  });
		  console.log(this.state.wordGroups);
		}
		catch (error) {
		  window.alert(error.message);
		}
	  }
	
	  componentWillMount() {
		this.getData();
	  }

	render() {

		return (
			<div className="container">
				<div className="row">
					<div className="col-8">
						<WordContent ref={this.childContent}></WordContent>
					</div>
					<div className="col-4">
						<div className="container">

							<div className="row d-flex justify-content-center">

								<div className="col-md-10">
									<div className="card my-4">
										<h5 className="card-header">WORDS GROUP</h5>
										<div className="card-body">
											<div className="row">
												<div className="col-lg-6">
													<ul className="list-unstyled mb-0">
														{this.state.wordGroups.map((value, index) => {
															let url = `http://localhost:3000/wordGroups/${value._id}`;
														return (
															<li><a href={url} style={{ textTransform: 'uppercase' }}>{value.name}</a></li>
														)
														})}
													</ul>
												</div>
												
											</div>
										</div>
									</div>
								</div>

							</div>

						</div>

					</div>
				</div>
			</div>





		)
	}
}