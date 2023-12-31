import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {loadComments} from "./commentSlice";

import {useLocation, useNavigate} from "react-router-dom";


// import { loadPosts } from "../posts/postsSlice";
import { animateScroll as scroll } from 'react-scroll';

import {formatNumber, formatTimeAgo} from "../posts/Title";

export  function Comments() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {name, subreddit, id, permalink  } = useParams();
    // console.log(name, subreddit, id,  permalink);
    // const limit = ".json?limit=60";

    useEffect(() => {
        // window.scrollTo(0, 0);
        try {
            scroll.scrollToTop({
                duration: 50, // Тривалість анімації в мілісекундах
            });
        } catch (error) {
            // Обробка помилки: ігнорування в середовищі тестування
            console.error("An error occurred during the call window.scrollTo:", error);
        }
        dispatch(loadComments(`/${name}/${subreddit}/comments/${id}/${permalink}`))
    },[name, subreddit, id, permalink, location,  dispatch]);



    const allPosts = useSelector(state => state.allPosts.posts)
    // console.log("всі пости: ", allPosts)

    const post =  allPosts.filter(topic => topic.id === id);
    // console.log("пост з коментарем:", post)

    // const post = useSelector(state => state.allPosts.posts.find(topic => topic.id === id));
    // console.log("пост з коментарем:", post);

    const allComments = useSelector((state) => state.allComments.comments)
    // console.log("коментарі:", allComments)

    useEffect(() => {
        if (!post.length) {
            navigate('/hot');
        }
    }, [post, navigate]);

    if (!post.length) {
        // navigate('/hot')
        return null;
    }

    const isComent = post[0].num_comments;

    return (
        <section className="comments-container" data-testid="all-comments-container">
            <div className="comment-post-information" data-testid="comment-post-container">

                <div className="comment-by" data-testid="comment-post-by-container">
                    <a href={`https://www.reddit.com/${post[0].subreddit_name_prefixed}`} target="_blank"  rel="noopener noreferrer">{post[0].subreddit_name_prefixed}</a>
                    <p>posted by</p>
                    <a href={`https://www.reddit.com/user/${post[0].author}`} target="_blank"  rel="noopener noreferrer">{post[0].author}</a>
                    <p>{formatTimeAgo(post[0].created)}</p>
                </div>

                <h2>{post[0].title}</h2>

                <div className="comment-post-media" data-testid="comment-post-media-container">
                    { post[0].is_video  ? (
                        <div className="comment-video" >
                            <video  controls >
                                <source src={post[0].url + "/DASHPlaylist.mpd"} type="application/dash+xml" />
                                <source src={post[0].url + "/DASH_360.mp4"} type="video/mp4"/>
                                <source src={post[0].url  + "/DASH_270.mp4"} type="video/mp4"/>
                                <source src={post[0].url  + "/DASH_96.mp4"} type="video/mp4"/>
                                <source src={post[0].url + "/DASH_360.webm"} type="video/webm" />
                                <source src={post[0].url + "/DASH_360.ogv"} type="video/ogg" />
                                <source src={post[0].url + "/DASH_360.avi"} type="video/x-msvideo" />
                                <source src={post[0].url + "/DASH_360.flv"} type="video/x-flv" />
                                <source src={post[0].url  + "/DASH_360.mkv"} type="video/x-matroska" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ) : (
                        <div className="comment-img-container">
                            <a href={post[0].url} target="_blank"  rel="noopener noreferrer">
                                {post[0].post_hint !== "image" ? (
                                        <div className="comment-img-body">
                                            {/* <img src={post[0].url} alt="" /> */}
                                            <img src={post[0].thumbnail} alt=""/>
                                        </div>
                                    ) : (
                                        <div className="comment-img-body">
                                            <img src={post[0].url} alt=""  />
                                        </div>
                                    )
                                }
                            </a>
                        </div>

                    )}
                </div>

                <p data-testid="comment-selftext-container">{post[0].selftext}</p>

                <div className="comment-post-icon-container" data-testid="comment-post-icon-container">
                    <img src="/icon/comments/comment.jpg" alt="" className="comment-icon"/>
                    {isComent ? (
                        <p>{formatNumber(post[0].num_comments)} Comments </p>
                    ) : (
                        <p>0 Comment</p>
                    )}
                </div>
                <a className="comment-link-to-reddit" href={post[0].url} target="_blank"  rel="noopener noreferrer">go to Reddit ...</a>

            </div>
            <div >
                {allComments.map((comment) => (
                    <div key={comment.data.id} className="comment-content" data-testid="comment-content-container">
                        <div className="posted-by">
                            <p>Comment by</p>
                            <a href={`https://www.reddit.com/user/${comment.data.author}`} target="_blank"  rel="noopener noreferrer">{comment.data.author}</a>
                            <p>-{formatTimeAgo(comment.data.created)}</p>
                        </div>
                        <div className="comments-body" style={{ wordWrap: "break-word" }}>{comment.data.body}</div>

                        <div className="comment-vote">
                            <img src="/icon/comments/like.png" alt="" className="comment-like"/>
                            {comment.data.score ? formatNumber(comment.data.score) : "0" }
                            <img src="/icon/comments/like.png" alt="" className="comment-like-rotation"/>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}