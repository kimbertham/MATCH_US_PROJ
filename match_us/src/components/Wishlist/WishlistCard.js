import React from 'react' 

const WishlistCard = ({ r }) => {
  return (

    <a href={`https://www.amazon.co.uk/dp/${r.asin}`}>
      <p><b>{r.productDescription.length > 50 ? `${r.productDescription.slice(0,50)}...` : r.productDescription}</b></p>
      <p>£{r.price}</p>
      <p>{r.productRating}</p>
      <div className='wishlist-img-cont center'>
        <img src={r.imgUrl} className='wishlist-img' alt='wishlist-img'/>
      </div>
    </a>

  )
}

export default WishlistCard