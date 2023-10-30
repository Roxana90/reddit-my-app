import React from "react";


import SubredditLinks from "./SubredditLinks";
import { TopButton } from "./TopButton";
import SubredditMenu from "./SubredditMenu";
// import { NavLink } from "react-router-dom";

export default function Subreddits() {

    return (
        <div className="subreddits-container">
            <SubredditMenu/>
            <h2>Subreddits</h2>
            <SubredditLinks/>
            <div className="button-top-container">
                <TopButton/>
            </div>
        </div>
    )
}