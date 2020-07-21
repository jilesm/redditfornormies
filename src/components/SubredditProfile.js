import React from 'react';
import Profile from './Profile';
import {getProfile} from '../actions';

class SubredditProfile extends React.Component{
	constructor(props){
		super(props);
		this.state={
			obj: {},
			datafetched: false
		}
	}
	getObj=(data)=>{
		const {id,title,created,description,display_name_prefixed: name,header_img,icon_img,public_description,subscribers,banner_background_color}=data
		const obj={
			id,
			title,
			created,
			description,
			name,
			header_img,
			icon_img,
			public_description,
			subscribers,
			banner_background_color
		}
		return obj
	}
	componentDidMount(){
		if(this.props.match.path!=='/user'){
			fetch(`https://www.reddit.com/r/${this.props.match.params.subreddit}/about/.json`)
				.then(res=> res.json())
				.then(json=> this.getObj(json.data))
				.then(obj=> this.setState({obj: {isuser: false,...obj},datafetched: true}))
		}
		else{
			this.setState({
				obj: {
					isuser: true,
					id: 'user101',
					title: 'u/reddituser',
					created: '',
					description: '',
					name: 'reddit user',
					header_img: '',
					icon_img: 'https://theme.zdassets.com/theme_assets/2219439/89cbe072bbb76fc29a82367bd19b511df487d018.png',
					public_description: '',
					subscribers: '0',
					banner_background_color: ''
				},
				datafetched: true
			})
		}
	}
	render(){
		return(
			<div>
				{this.state.datafetched && <Profile data={this.state.obj}/>}
			</div>
		);
	}
}

export default SubredditProfile;