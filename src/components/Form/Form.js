import React, { Component } from 'react';
import "./form.scss";

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name:'',
            password:'',
            loginStatus:'',
            errorMessage:"Your login credentials don't match any in our records.  Please try again",
            errorDisplay:0,
            formType:'signin'
        }
    }

    updateName = (event) =>{
        this.setState({name:event.target.value});
    }

    updatePassword = (event) =>{
        this.setState({password:event.target.value});
    }

    attemptLogin = (event) =>{
        console.log('fire');
        event.preventDefault();
        const url = 'http://localhost:8888/movies_to_see/admin/login.php';
        const user = {
            name: this.state.name,
            password: this.state.password
        };
        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
        .then((resp) => { 
            return resp.text();
        })
        .then((text) => {
            var trimmedResponse = text.substring(0,17);
            this.setState({loginStatus:trimmedResponse});
            this.parseLogin();
            console.log(this.state.loginStatus);
        })
        .catch(function(error) {
        console.log(error);
    });
        
    }

    parseLogin = () =>{
        if(this.state.loginStatus === 'unsuccesful login' || this.state.loginStatus === ''){
            this.setState({errorDisplay:1});
        }else{
            this.props.onRouteChange('home2');
            this.props.updateStatus(this.state.loginStatus);
        }
    }

    registerUser = (event) =>{
        event.preventDefault();
        const url = 'http://localhost:8888/movies_to_see/admin/user.php';
        const user = {
            name: this.state.name,
            password: this.state.password
        };
        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
            .then(() => { 
                this.setState({formType:'signin'})
            })
            .catch(function(error) {
            console.log(error);
        });
        
    }

    onFormChange = (formType) =>{
        this.setState({formType:formType});
    }


    render() {
        return (
            <div>
                { this.state.formType === 'signin' ?
                    <div className='form-cont'>
                        <h1>Please Sign In</h1>
                        <form className='form-styles'>
                            <input placeholder='Your Name' type='email' onChange={this.updateName}/>
                            <input placeholder='Your Password' type='password' onChange={this.updatePassword}/>
                            <input type='submit' value='Sign In' onClick={this.attemptLogin} className='submit'/>
                            <p className='register-link'>Need to create an account? <span onClick={() => this.onFormChange('register')}>Register Here</span></p>
                        </form>
                        <div className='login-error' style={{opacity:this.state.errorDisplay}}>
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>
                :(
                    <div className='form-cont'>
                        <h1>Please Enter The Appropriate Information</h1>
                        <form className='form-styles'>
                            <input placeholder='Your Name' type='text' onChange={this.updateName}/>
                            <input placeholder='Your Password' type='password' onChange={this.updatePassword}/>
                            <input type='submit' value='Register' onClick={this.registerUser} className='submit'/>
                        </form>
                    </div>
                )
            }
            </div>
            
        );
    
        }
    }


export default Form;