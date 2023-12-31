import React from "react";
import {NavLink} from "react-router-dom";

export function formatNumber(number) {
    if (number >= 100000) {
        return (number / 1000000).toFixed(2) + "m";
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + "k";
    }
    return number.toString();
}

export function formatTimeAgo(timestamp, timetest) {
    let currentTime;
    if (timetest){
        currentTime = timetest; // for test
    } else {
        currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    }
    const timeDifference = currentTime - timestamp; // difference in seconds

    if (timeDifference < 60) {
        return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDifference < 2592000) {
        const days = Math.floor(timeDifference / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeDifference < 31536000) {
        const months = Math.floor(timeDifference / 2592000);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(timeDifference / 31536000);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}

const Title = ({ post }) => {
    const isComent = post.num_comments;
    // console.log(post.created)
    return (
        <div className="post-information-container" data-testid="post-title-container">
            <div className="posted-by" data-testid="posted-by-container">
                <a href={`https://www.reddit.com/${post.subreddit_name_prefixed}`} target="_blank"  rel="noopener noreferrer">{post.subreddit_name_prefixed}</a>
                <p>-posted by-</p>
                <a href={`https://www.reddit.com/user/${post.author}`} target="_blank"  rel="noopener noreferrer">{post.author}</a>
                <p>-{formatTimeAgo(post.created)}-</p>
            </div>
            <h2>{post.title}</h2>
            <div className="post-information-self" style={{ wordWrap: "break-word" }} data-testid="selftext-container">
                {post.selftext ? <p >{post.selftext}</p> : ""}
            </div>
            <NavLink to={post.permalink} className="post-comments" data-testid="post-comments-container">
                <img className="post-comments-icon" src="/icon/posts/comments.png" alt="icon comments"/>
                { isComent > 0 ? (
                    <p>{formatNumber(isComent)} Comments </p>
                ) : (
                    <p>0 Comment</p>
                )}
            </NavLink>
        </div>
    );
};

export default Title;