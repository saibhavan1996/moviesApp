import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import TopRatedMoviesSlick from '../TopRatedMoviesSlick'

const apiStatusConstrains = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRatedMovies extends Component {
  state = {
    topRatedMoviesList: [],
    apiStatus: apiStatusConstrains.initial,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusConstrains.process})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        title: each.title,
      }))
      this.setState({
        topRatedMoviesList: formateData,
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
    const {topRatedMoviesList} = this.state

    return <TopRatedMoviesSlick topRatedMoviesData={topRatedMoviesList} />
  }

  retry = () => {
    this.getTopRatedMovies()
  }

  getFailureView = () => (
    <div className="failure-retry-container">
      <BsFillExclamationTriangleFill className="failure-image-logo" />
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

export default TopRatedMovies
