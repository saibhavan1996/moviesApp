import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

import ContactDetails from '../ContactDetails'

import Header from '../Header'

const AccountRoute = props => {
  const onClickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-background-container">
      <Header />
      <div className="account-container">
        <div className="account-details-container">
          <h1 className="account-heading">Account</h1>
          <hr className="separator" />
          <div className="member-container">
            <p className="membership-head">Member ship</p>
            <ul className="account-details-list">
              <li className="user-id">userId</li>
              <p className="Password">Password:*****</p>
            </ul>
          </div>
          <hr className="separator" />
          <div className="plan-details">
            <p className="Plan-head">Plan Details</p>
            <p className="user">Premium</p>
            <p className="premium-quality">ultra HD</p>
          </div>
        </div>
        <hr className="separator" />
        <button type="button" className="logout-btn" onClick={onClickToLogout}>
          Logout
        </button>
      </div>
      <ContactDetails />
    </div>
  )
}
export default withRouter(AccountRoute)
