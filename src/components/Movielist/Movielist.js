import React, { Component } from 'react';
import "./movielist.scss";

class Movielist extends Component {
    constructor() {
        super();
        this.state = {
        }
    }



    render() {
        return (
        <div className='list-width-setter'>
            <h3>{this.props.title}</h3>
            <div >
            {this.props.type === 'to watch' ?
                <div className='inner-list-container'>
                    {this.props.data.map(item =>
                        <div className='movie-icon' key={item.Title}>
                            <img src={item.Poster} alt={item.Title}/>
                            <div className='toggle-container'>
                                <p>Did You like this movie?</p>
                                <span onClick = {() => this.props.swapList(item.Title, 'liked')}>Yes</span>
                                <span onClick = {() => this.props.swapList(item.Title, 'disliked')}>No</span>
                            </div>
                        </div>
                    )}
                </div>
            :(
            <div className='inner-list-container'>
                {this.props.data.map(item =>
                    <div className='movie-icon' key={item.Title}>
                        {item.Status === 'liked'?
                            <div className='overlay green'><p>Liked</p></div>
                            :(
                                <div className='overlay red'><p>Disliked</p></div>
                            )
                        }
                        <img src={item.Poster} alt={item.Title}/>
                    </div>
                )}
            </div>
            )
            }
            </div>
            
      </div>
        );
    }
}


export default Movielist;