import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

import format from 'date-fns/format'

import Header from '../Header'

import SimilarMovies from '../SimilarMovies'

import ContactDetails from '../ContactDetails'

const apiStatusConstrains = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MoviesItemCard extends Component {
  state = {
    movieItemList: {},
    genresList: [],
    similarMovies: [],
    spokenLanguages: [],
    apiStatus: apiStatusConstrains.initial,
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstrains.process})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const changeData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overView: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }

      const formateData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))

      const similarMovies = data.movie_details.similar_movies.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const spokenLanguages = data.movie_details.spoken_languages.map(each => ({
        englishName: each.english_name,
        id: each.id,
      }))
      this.setState({
        movieItemList: changeData,
        genresList: formateData,
        similarMovies,
        spokenLanguages,
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
    const {
      movieItemList,
      genresList,
      similarMovies,
      spokenLanguages,
    } = this.state
    console.log(similarMovies)

    const age = movieItemList.adult ? 'A' : 'U/A'

    const d = new Date(movieItemList.releaseDate)
    const year = d.getFullYear()

    const fullYear = format(new Date(movieItemList.releaseDate), 'do MMMM yyyy')

    const hours = Math.floor(movieItemList.runtime / 60)
    const mins = movieItemList.runtime % 60

    return (
      <div className="container">
        <div
          style={{backgroundImage: `url(${movieItemList.backdropPath})`}}
          className="bg-image"
        >
          <Header />

          <div className="movie-heading-container">
            <h1 className="movie-name">{movieItemList.title}</h1>
            <ul className="movie-details">
              <p className="duration">
                {hours}h {mins}m
              </p>
              <p className="certificate">{age}</p>
              <p className="duration">{year}</p>
            </ul>
            <p className="movie-description">{movieItemList.overView}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="details-background">
          <div className="movie-details-section">
            <ul className="genre-list">
              <h1 className="genres-details">Genres</h1>
              {genresList.map(each => (
                <p className="list-item" key={each.id}>
                  {each.name}
                </p>
              ))}
            </ul>
            <ul className="languages-list">
              <h1 className="genres-details">Audio Available</h1>
              {spokenLanguages.map(each => (
                <p className="list-item" key={each.id}>
                  {each.englishName}
                </p>
              ))}
            </ul>
            <div className="rating-container">
              <ul className="rating-list">
                <h1 className="genres-details">Rating Count</h1>
                <p className="list-item">{movieItemList.voteCount}</p>
              </ul>
              <ul className="rating-list">
                <h1 className="genres-details">Rating Average</h1>
                <p className="list-item">{movieItemList.voteAverage}</p>
              </ul>
            </div>

            <div className="rating-container">
              <ul className="budget-list">
                <h1 className="genres-details">Budget</h1>
                <p className="list-item">{movieItemList.budget}</p>
              </ul>
              <ul className="release-list">
                <h1 className="genres-details">Release date</h1>
                <p className="list-item">{fullYear}</p>
              </ul>
            </div>
          </div>
          <h1 className="section-title">More like this</h1>
          <ul className="popular-movie-list">
            {similarMovies.map(each => (
              <SimilarMovies key={each.id} similarMovies={each} />
            ))}
          </ul>
        </div>
        <ContactDetails />
      </div>
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
      <>
        <div className="status-bg-container">{this.getStatusOfApi()}</div>
      </>
    )
  }
}

export default MoviesItemCard
