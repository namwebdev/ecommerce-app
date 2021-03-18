import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { commerce } from './lib/ecommerce'
import Navbar from './components/Layout/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const [cart, setCart] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const data = await commerce.cart.retrieve()
      setCart(data || {})
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  const onAddToCart = async (id, quantity) => {
    const { cart } = await commerce.cart.add(id, quantity)
    setCart(cart || {})
  }
  const onUpdateProductQuantityInCart = async (id, quantity) => {
    const { cart } = await commerce.cart.update(id, { quantity })
    setCart(cart || {})
  }
  const onRemoveProductQuantityInCart = async (id) => {
    const { cart } = await commerce.cart.remove(id)
    setCart(cart || {})
  }
  const onEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart || {})
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
              <Cart
                cart={cart}
                loading={loading}
                handleUpdateQuantity={onUpdateProductQuantityInCart}
                handleRemoveProduct={onRemoveProductQuantityInCart}
                handleEmptyCart={onEmptyCart}
              />
            </Route>
            <Route path="/checkout">
              {!loading && <Checkout cart={cart} />}
            </Route>
            <Route path="*">404</Route>
          </Switch>
        </section>
      </Router>
    </div>
  )
}

export default App
