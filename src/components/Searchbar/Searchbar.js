import React from "react";
import "./searchbar.scss"


const Searchbar= ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='searchbar-cont'> 
            <input type='text' onChange={onInputChange} />
            <div  className='search-button' onClick={onButtonSubmit}>
                <p>Search</p>
            </div>
        </div>
    );
}

export default Searchbar;