import { useState, useEffect } from 'react'
import { commerce } from '../lib/ecommerce'
import ProductCard from '../components/Product/ProductCard'

const HomePage = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  // method
  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list()
      setProducts(data || [])
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <div className="text-center">Loading...</div>}
      {!loading && (
        <div className="h-auto grid grid-cols-3 grid-rows-1 grid-flow-col gap-4">
          {!products.length && (
            <div className="text-center text-lg mt-10">No products</div>
          )}
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
