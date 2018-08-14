import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Main from './components/Main/Main.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import './assets/css/Home.css';

class App extends React.Component {

  render() {
    let jwt = sessionStorage.getItem('jwt');
    return (
      <Router>
        <div className="container-fluid bg">
          <div className="row">
            <Switch>
              <Route exact path="/" component={SignIn}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/main" component={Main} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
