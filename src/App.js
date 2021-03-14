import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { commerce } from './lib/ecommerce'
import Navbar from './components/Layout/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'

function App() {
  const [cart, setCart] = useState({})

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve()
    setCart(data || {})
  }
  const onAddToCart = async (id, quantity) => {
    const product = await commerce.cart.add(id, quantity)
    setCart(product.cart)
  }

  return (
    <div className="App">
      <Router className="mt-3">
        <Navbar cart={cart} />
        <section className="container">
          <Switch>
            <Route exact path="/">
              <Home handleAddToCart={onAddToCart} />
            </Route>
            <Route exact path="/cart">
              <Cart cart={cart} />
            </Route>
            <Route path="*">404</Route>
          </Switch>
        </section>
      </Router>
    </div>
  )
}

export default App
