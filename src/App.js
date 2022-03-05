import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeComponent from './components/home';
import { Provider } from 'react-redux'
import { store } from './store';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';


function App() {
  return (

    <Provider store={store}>
      <Router>
          <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>
            <HomeComponent />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/my-profile'>
            <User />
          </Route>
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
