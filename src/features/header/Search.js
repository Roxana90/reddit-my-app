import React from "react";
import { useSelector, useDispatch} from "react-redux";
import {setSearchValue, setSearchTerm, selectSearchValue} from "./searchSlice";
import {useNavigate} from "react-router-dom";



export default function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchValue = useSelector(selectSearchValue).toString();

    const onSearchChangeHandler = ( e ) => {
        dispatch(setSearchValue(e.target.value));
    }
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/search/?q=${searchValue}`)
        dispatch(setSearchTerm(searchValue));
        dispatch(setSearchValue(""));
    }

    return (
        <form className="search-box" onSubmit={submitHandler}>
            <input
                className="search-input"
                type="text"
                placeholder='Search'
                value={searchValue}
                onChange={onSearchChangeHandler}
            />
            <button className="search-button">
                <img className="search-icon" src="/icon/navigator/search.svg" alt="search"/>
            </button>
        </form>
    )
}

