import {Link} from 'react-router-dom'

const SearchMovieItem = props => {
  const {eachMovie} = props
  const {id} = eachMovie

  return (
    <Link to={`/movies/${id}`}>
      <li className="popular-movie-item">
        <img
          src={eachMovie.posterPath}
          alt={eachMovie.title}
          className="popular-movie-image"
        />
      </li>
    </Link>
  )
}
export default SearchMovieItem
