import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";

function App() {
  const availableCount = products.filter((p) => p.inStock).length;
  const discountedCount = products.filter((p) => p.discount > 0).length;

  const categoryOrder = ["Audio", "Computer", "Accessories", "Wearables"];

  const sortedProducts = [...products].sort((a, b) => {
    if (a.inStock !== b.inStock) {
      return a.inStock ? -1 : 1;
    }

    if (b.discount !== a.discount) {
      return b.discount - a.discount;
    }

    const categoryCompare =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);

    if (categoryCompare !== 0) return categoryCompare;

    return a.name.localeCompare(b.name);
  });

  return (
    <div className="page-bg">
      <div className="overlay">
        <div className="app">
          <header className="hero">
            <p className="hero-subtitle">Premium Tech Collection</p>
            <h1>Tech Shop</h1>
            <p className="hero-text">
              Discover premium gadgets, smart accessories, and stylish tech deals
              designed for everyday life.
            </p>

            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-number">{products.length}</span>
                <span className="stat-label">Products</span>
              </div>

              <div className="stat-box">
                <span className="stat-number">{availableCount}</span>
                <span className="stat-label">Available</span>
              </div>
            </div>
          </header>

          <section className="section-header">
            <div>
              <p className="section-mini">Curated Collection</p>
              <h2>Featured Products</h2>
            </div>
          </section>

          <section className="gallery-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;