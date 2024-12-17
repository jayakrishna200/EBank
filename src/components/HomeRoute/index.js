import './index.css'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

const HomeRoute = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-main-cont">
      <Header />
      <div className="home-cont">
        <div className="card">
          <h1 className="home-head">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    </div>
  )
}
export default HomeRoute
