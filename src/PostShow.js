import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class PostShow extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            posts:{},
            comments:[]
        }
    }

componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response)=>{
          const posts = response.data
          this.setState({posts})
          axios.get(`http://jsonplaceholder.typicode.com/users/${posts.userId}`)
              .then((response)=>{
                const user = response.data
                console.log(response.data)
                this.setState({user})
              })
          .catch((err)=>{
          console.log(err)
         })
    })
        .catch((err)=>{
            console.log(err)
        })

        axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${id}`)
                .then((response)=>{
                    const comments = response.data
                    console.log(response.data)
                    this.setState({comments})
                })
                .catch((err)=>{
                    console.log(err)
                })
  
    }

render(){
    return(
        <div>
            <h3>USER NAME: {this.state.user.name}</h3>

            <h3>TITLE:{this.state.posts.title}</h3>

            <h3>BODY:{this.state.posts.body}</h3>

            <hr/>

            <h3>COMMENTS:</h3>

            <ul>
                 {
                     this.state.comments.map(comment=>{
                     return <li key={comment.id}>{comment.body}</li>
                     })
                 }
             </ul>

                <h5><Link to={`/users/${this.state.user.id}`}>More posts of author - {this.state.user.name}</Link></h5>

                  
        </div>
    )
}

}
    
export default PostShow