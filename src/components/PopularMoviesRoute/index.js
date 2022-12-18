import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import PopularMovieItem from '../PopularMovieItem'
import ContactDetails from '../ContactDetails'

const apiStatusConstrains = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularMoviesRoute extends Component {
  state = {
    PopularMoviesList: [],
    apiStatus: apiStatusConstrains.initial,
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstrains.process})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const formateData = data.results.map(each => ({
        id: each.id,
        backDropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        PopularMoviesList: formateData,
        apiStatus: apiStatusConstrains.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstrains.failure,
      })
    }
  }

  getLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" className="loader-image" />
    </div>
  )

  getSuccessView = () => {
    const {PopularMoviesList} = this.state
    return (
      <>
        <ul className="popular-movie-list">
          {PopularMoviesList.map(eachMovie => (
            <PopularMovieItem key={eachMovie.id} eachMovie={eachMovie} />
          ))}
        </ul>
      </>
    )
  }

  retry = () => {
    this.getPopularMoviesList()
  }

  getFailureView = () => (
    <div className="failure-container">
      <img
        src="https://ik.imagekit.io/dtcgyiilh/Background-Complete__1__nMtd0FQbYp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671004541585"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button type="button" className="try-again-btn" onClick={this.retry}>
        Try Again
      </button>
    </div>
  )

  getStatusOfApi = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstrains.process:
        return this.getLoadingView()
      case apiStatusConstrains.success:
        return this.getSuccessView()
      case apiStatusConstrains.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-background">
        <Header />
        <div className="status-bg-container">{this.getStatusOfApi()}</div>
        <ContactDetails />
      </div>
    )
  }
}

export default PopularMoviesRoute
