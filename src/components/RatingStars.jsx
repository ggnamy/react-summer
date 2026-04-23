function RatingStars({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="rating-row">
      <div className="rating-stars" aria-label={`Rating: ${rating} out of 5`}>
        <span className="stars-filled">
          {"★".repeat(fullStars)}
          {hasHalf ? "✦" : ""}
        </span>
        <span className="stars-empty">{"☆".repeat(emptyStars)}</span>
      </div>
      <span className="rating-value">{rating.toFixed(1)}</span>
      <span className="review-count">({reviews} reviews)</span>
    </div>
  );
}

export default RatingStars;