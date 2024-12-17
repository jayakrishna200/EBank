import './App.css'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import NotFoundRoute from './components/NotFoundRoute'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
    <NotFoundRoute/>
  </Switch>
)

export default App
