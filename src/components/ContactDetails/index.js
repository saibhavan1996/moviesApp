import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const ContactDetails = () => (
  <div className="contact-container">
    <ul className="contact-list">
      <li className="contact-logo">
        <FaGoogle className="contact-logo" />
      </li>
      <li className="contact-logo">
        <FaTwitter className="contact-logo" />
      </li>
      <li className="contact-logo">
        <FaInstagram className="contact-logo" />
      </li>
      <li className="contact-logo">
        <FaYoutube className="contact-logo" />
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)
export default ContactDetails
