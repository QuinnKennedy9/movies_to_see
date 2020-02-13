import React from "react";
import './movieresult.scss';


const Movieresult= ({data, addToList, seen}) => {
    return (
        <div>
            <div className='searched-movie' style = {{opacity:seen}}>
                <img src={data.Poster} alt={data.Title}/>
                <h2>{data.Title}</h2>
                <h3>{data.Genre}</h3>
                <p>{data.Plot}</p>
                <span onClick={addToList}>Add this movie to your list?</span>
            </div>
        </div>
    );
}

export default Movieresult;