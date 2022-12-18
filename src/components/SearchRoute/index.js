import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import ContactDetails from '../ContactDetails'
import SearchMovieItem from '../SearchMovieItem'

const apiStatusConstrains = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchMovies extends Component {
  state = {
    SearchMoviesList: [],
    apiStatus: apiStatusConstrains.initial,
    query: '',
  }

  getSearchApiData = async () => {
    const {query} = this.state
    this.setState({apiStatus: apiStatusConstrains.process})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${query}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const formateData = data.results.map(each => ({
        id: each.id,
        backDropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        SearchMoviesList: formateData,
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
    const {SearchMoviesList, query} = this.state

    return SearchMoviesList.length === 0 ? (
      <>
        <div className="failure-container">
          <img
            src="https://ik.imagekit.io/dtcgyiilh/Group_7394_AvznGf3fA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671118355915"
            className="failure-image"
            alt="no movies"
          />
          <p className="failure-msg">
            Your search for {query} did not find any matches.
          </p>
        </div>
        <ContactDetails />
      </>
    ) : (
      <>
        <ul className="popular-movie-list">
          {SearchMoviesList.map(eachMovie => (
            <SearchMovieItem key={eachMovie.id} eachMovie={eachMovie} />
          ))}
        </ul>
        <ContactDetails />
      </>
    )
  }

  retry = () => {
    this.getSearchApiData()
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

  changeSearchInput = value => {
    this.setState({query: value})
  }

  renderHeader = () => (
    <Header
      changeSearchInput={this.changeSearchInput}
      getSearchApiData={this.getSearchApiData}
    />
  )

  render() {
    return (
      <div className="popular-background">
        {this.renderHeader()}
        <div className="status-bg-container">{this.getStatusOfApi()}</div>
      </div>
    )
  }
}

export default SearchMovies
