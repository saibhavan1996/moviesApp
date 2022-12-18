import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'

class Header extends Component {
  state = {showMenu: false, currentPath: '', searchInput: ''}

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  showSearchInput = () => {
    const {currentPath} = this.state
    return currentPath === '/search'
  }

  onShowSearchInput = () => {
    const {getSearchApiData} = this.props
    const showInput = this.showSearchInput()
    if (showInput) {
      getSearchApiData()
    }
  }

  showHamDetails = () => {
    const {showMenu} = this.state
    this.setState({showMenu: !showMenu})
  }

  getUserEntered = event => {
    const {changeSearchInput} = this.props
    this.setState({searchInput: event.target.value})
    changeSearchInput(event.target.value)
  }

  onClickEnter = () => {
    const {getSearchApiData} = this.props
    const {searchInput} = this.state
    if (searchInput.length !== 0) {
      getSearchApiData()
    }
  }

  render() {
    const {searchInput, currentPath, showMenu} = this.state

    const showInput = this.showSearchInput()
    const homeClassName = currentPath === '/' ? 'selected' : null
    const popularClassName = currentPath === '/popular' ? 'selected' : null
    const accountClassName = currentPath === '/account' ? 'selected' : null

    return (
      <div className="nav-main-container">
        <nav className="nav-bar-container">
          <div className="logo-category-container">
            <Link to="/" className="link">
              <img
                src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660479354/Group_7399_nn7x3u.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <ul className="category">
              <Link to="/" className="link">
                <li className={`category-list-item ${homeClassName}`}>Home</li>
              </Link>

              <Link to="/popular" className="link">
                <li className={`category-list-item ${popularClassName}`}>
                  Popular
                </li>
              </Link>
            </ul>
          </div>
          <div className="image-icons-container">
            {showInput ? (
              <div className="search-container">
                <input
                  type="search"
                  className="search-bar"
                  onChange={this.getUserEntered}
                  value={searchInput}
                />
                <button
                  className="enter-btn"
                  type="button"
                  testid="searchButton"
                  onClick={this.onClickEnter}
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </div>
            ) : (
              <button
                className="search-btn"
                type="button"
                onClick={this.showSearchBar}
                testid="searchButton"
              >
                <Link to="/search">
                  <HiOutlineSearch size={25} className="search-icon-btn" />
                </Link>
              </button>
            )}

            <button
              type="button"
              className="hamburger-btn"
              onClick={this.showHamDetails}
            >
              <MdMenuOpen className="hamburger-icon" />
            </button>
            <div className="profile-container">
              <Link to="/account" className="link">
                <img
                  src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
                  className="profile-image"
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        </nav>
        {showMenu && (
          <ul className="category-list">
            <Link to="/" className="link">
              <li className="category-item">Home</li>
            </Link>
            <Link to="/popular" className="link">
              <li className="category-item">Popular</li>
            </Link>
            <Link to="/account" className="link">
              <li className={`category-item ${accountClassName}`}>Account</li>
            </Link>
            <button
              type="button"
              className="close-btn"
              onClick={this.showHamDetails}
            >
              <AiOutlineCloseCircle size={20} color="#ffffff" />
            </button>
          </ul>
        )}
      </div>
    )
  }
}
export default Header
