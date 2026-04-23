import RatingStars from "./RatingStars";

function ProductCard({
  name,
  description,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  inStock,
  category,
  image,
  isNew,
  isHot,
  freeShipping
}) {
  function handleAddToCart() {
    if (inStock) {
      alert(`Added "${name}" to cart! Price: $${price.toFixed(2)}`);
    }
  }

  return (
    <article className={`product-card${!inStock ? " unavailable" : ""}`}>
      <div className="product-top-tags">
        {discount > 0 && <span className="promo-badge sale">-{discount}%</span>}
        {isNew && <span className="promo-badge new">New</span>}
        {isHot && <span className="promo-badge hot">Hot</span>}
      </div>

      <div className={`stock-badge ${inStock ? "stock-in" : "stock-out"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </div>

      <div className="product-image-wrap">
        <img
          src={image}
          alt={name}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/700x500?text=No+Image";
          }}
        />
      </div>

      <div className="product-content">
        <div className="product-meta-row">
          <span className="category">{category}</span>
          {freeShipping && <span className="shipping-tag">Free Shipping</span>}
        </div>

        <h3 className="product-title">{name}</h3>

        <p className="product-description">{description}</p>

        <RatingStars rating={rating} reviews={reviews} />

        <div className="price-block">
          <div className="price-row">
            <strong className="price-current">${price.toFixed(2)}</strong>
            {originalPrice > price && (
              <span className="price-original">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {originalPrice > price && (
            <p className="save-text">
              You save ${(originalPrice - price).toFixed(2)}
            </p>
          )}
        </div>

        <div className="card-footer">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="add-btn"
          >
            {inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;