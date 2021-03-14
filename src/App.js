import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">404</Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
