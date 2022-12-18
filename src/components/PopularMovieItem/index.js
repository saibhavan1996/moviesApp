import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieItem = props => {
  const {eachMovie} = props

  return (
    <Link to={`/movies/${eachMovie.id}`}>
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
export default PopularMovieItem
