import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Main from './components/Main/Main.jsx';
import './assets/css/Home.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container-fluid bg">
          <div className="row">
            <Route exact path='/' component={SignIn} />
            <Route exact path='/SignIn' component={SignIn} />
            <Route exact path='/SignUp' component={SignUp} />
            <Route exact path='/Main' component={Main} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
