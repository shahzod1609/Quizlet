import React, { useState } from 'react';
import './FlashApp.css';

const Posts = ({posts, loading}) => {
    const [flip, setFlip] = useState(false)
    if(loading){
        return <h2>Loading....</h2>;
    }
    return <div className="card-group">
        {posts.map(post =>(
            <div
            className={`card  ${flip ? 'flip' : ''}`} 
            onClick={() => setFlip(!flip)}>
                <div className="front" key={post.id}>
                    {post.Image}
                </div>
                <div className="back">{post.name}</div>
            </div>
        ))}
    </div>
}

export default Posts;