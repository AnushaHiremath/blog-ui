import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class UserShow extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            posts:[]
        }
    }
componentDidMount(){
    const id=this.props.match.params.id
            axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
                .then((response)=>{
                    const user = response.data
                    this.setState({user})
                })
                .catch((err)=>{
                    console.log(err)
                })

          axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
                .then((response)=>{
                    const posts = response.data
                    this.setState({posts})
                })  
                .catch((err)=>{
                    console.log(err)
                })   
}

 
render(){
    return(
        <div>
            <h3>USER NAME: {this.state.user.name}</h3>
            <h4>POSTS WRITTEN BY USER</h4>
             <ul>
                 {
                     
                     this.state.posts.map(post=>{
                     return <li key={post.id}><Link to = {`/posts/${post.id}`} >{post.title}</Link>
                     </li>
                     
                     })
                 }
             </ul>       
        </div>
    )
}

}
    
export default UserShow