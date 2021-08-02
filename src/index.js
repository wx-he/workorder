import React from 'react';
import ReactDOM from 'react-dom'
import { Component } from 'react';
import AppRouter from './AppRouter'
import Login from './pages/login'
import Signup from './pages/signup'
import history from './history'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
class Index extends Component{
    render(){
        return(
            <React.Fragment>
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/signup"  component={Signup}></Route>
                        <Route path="/" component={AppRouter}></Route>
                        
                    </Switch>
                </Router>
            </React.Fragment>
            
        )
    }
}
ReactDOM.render(<Index/>,document.getElementById('root'))
