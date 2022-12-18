import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import PopularMoviesRoute from './components/PopularMoviesRoute'
import MoviesItemCard from './components/MovieItemCard'
import AccountRoute from './components/AccountRoute'
import NotFound from './components/NotFound'
import SearchRoute from './components/SearchRoute'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={PopularMoviesRoute} />
        <ProtectedRoute exact path="/search" component={SearchRoute} />
        <ProtectedRoute exact path="/account" component={AccountRoute} />
        <ProtectedRoute exact path="/movies/:id" component={MoviesItemCard} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
export default App
