import React, { Component } from 'react'
//import hihi from '../static/image/138254.svg'
import DataContent from './DataContent'
import { authHeader } from '../helpers';
import { createBrowserHistory } from "history";
export default class WordContent extends Component {

	state = {
		id:"",
		word: "",
		pronunciation: "",
		datas: [],
		collocations: [],
		wordGroups: [],
		wordText:''
	}

	updateContent = async (content) => {

		try {
			const result = await fetch(`http://localhost:3001/api/wordByName/${content}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}).then((res) => {
				return res.json();
			});
			if (result.success) {
				this.setState({
					id: result.data._id,
					word: result.data.word,
					pronunciation: result.data.pronunciation,
					datas: result.data.datas
				})
			}
			else {
				window.alert(result.message);
			}

		}
		catch (error) {
			window.alert(error.message);
		}
	}


	getData = async () => {
		try {
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
		if(this.props.initWord)
			this.updateContent(this.props.initWord)
			this.getData();
	}

	 isEmpty(str) {
		return (!str || str.length === 0 );
	}

	async handleAddGroup(dataA) {
		// add
		const { word, wordText, id,wordGroups } = dataA;

		console.log(dataA);

		if (this.isEmpty(word) || this.isEmpty(wordText) || this.isEmpty(id) ) {
			alert('Please Choose Group or Name');
		} else {
			
			try {
				const result = await fetch(`http://localhost:3001/api/wordByName/${word}`, {
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/json',
				  },
				  credentials: 'include',
				}).then((res) => {
				  return res.json();
				});
				if (result.success) {
				  try {
					await fetch(`http://localhost:3001/api/wordGroups/${wordText}/words/${id}`, {
					  method: 'PUT',
					  headers: authHeader(),
					  credentials: 'include',
					}).then((res) => {
						alert('add group success');
						return res.json;
					});
					this.getData();
				  }
				  catch (error) {
					window.alert(error.message);
				  }
				}
				else {
				  window.alert(result.message);
				}
		  
			  }
			  catch (error) {
				window.alert(error.message);
			  }

		}
	}

	handleChangeSelector(e) {
		this.setState({
			...this.state,
			wordText: e.target.value

		})
	}

	render() {

		const history = createBrowserHistory()

		return (
			<div className="container">
				<div className="row justify-content-between">				
				<div className="col-sm-4"></div>
					<div className="col-sm-2"></div>
					{
						history.location.pathname == '/homepage'&&<div className="col-sm-6 pt-2">
						<div className="row">
							<div className="col-sm-8">
							<select class="custom-select" onChange={(e)=>this.handleChangeSelector(e)}>
							<option selected></option>
							{this.state.wordGroups.map((value, index) => {
								return (
									<option value={value._id} >{value.name}</option>
								)
							})}
						</select>
						</div>
							<div className="col-sm-4 pb-3">
							<button onClick ={()=>this.handleAddGroup(this.state)} class = "btn btn-success">Add Group</button>
						</div>
						</div>
					</div>
					}
					<h1 className='title_main'>{this.state.word}</h1>
					<h3 className='spelling'>{this.state.pronunciation}</h3>					
				</div>
				{this.state.datas.map((value, index) => {
					return (
						<DataContent key={index} type={value.type} meanings={value.meanings}></DataContent>
					)
				})}
			</div>
		)
	}
}