import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OriginalMoviesSlick = props => {
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
  const {originalMoviesData} = props

  return (
    <>
      <Slider {...settings}>
        {originalMoviesData.map(eachVideo => (
          <Link to={`/movies/${eachVideo.id}`} key={eachVideo.id}>
            <img
              className="thumbnail"
              src={eachVideo.posterPath}
              alt={eachVideo.name}
            />
          </Link>
        ))}
      </Slider>
    </>
  )
}

export default OriginalMoviesSlick
