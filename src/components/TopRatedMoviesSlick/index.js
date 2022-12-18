import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const TopRatedMoviesSlick = props => {
  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const {topRatedMoviesData} = props

  return (
    <>
      <Slider {...settings}>
        {topRatedMoviesData.map(eachVideo => (
          <Link to={`/movies/${eachVideo.id}`} key={eachVideo.id}>
            <img
              className="thumbnail"
              src={eachVideo.posterPath}
              alt={eachVideo.title}
            />
          </Link>
        ))}
      </Slider>
    </>
  )
}

export default TopRatedMoviesSlick
