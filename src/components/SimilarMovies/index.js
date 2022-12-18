import {Link} from 'react-router-dom'

const SimilarMovies = props => {
  const {similarMovies} = props
  const {id} = similarMovies
  return (
    <Link to={`/movies/${id}`}>
      <li className="popular-movie-item">
        <img
          src={similarMovies.posterPath}
          alt={similarMovies.title}
          className="popular-movie-image"
        />
      </li>
    </Link>
  )
}
export default SimilarMovies
