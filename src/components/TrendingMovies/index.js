import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import TrendingMoviesSlick from '../TrendingMovieSlick'

const apiStatusConstrains = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingMovies extends Component {
  state = {
    TrendingMoviesList: [],
    apiStatus: apiStatusConstrains.initial,
  }

  componentDidMount() {
    this.getTrendingMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstrains.process})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        TrendingMoviesList: formateData,
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
      <Loader type="TailSpin" className="loader" />
    </div>
  )

  getSuccessView = () => {
    const {TrendingMoviesList} = this.state

    return <TrendingMoviesSlick trendingVideoData={TrendingMoviesList} />
  }

  retry = () => {
    this.getTrendingMoviesList()
  }

  getFailureView = () => (
    <div className="failure-retry-container">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-image"
      />
      <p className="failure-des">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={this.retry}>
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
    return <>{this.getStatusOfApi()}</>
  }
}

export default TrendingMovies
