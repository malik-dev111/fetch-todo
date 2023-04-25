  import React, { useEffect, useState } from 'react';
  import './style.scss';

  const Card = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [addedToCart, setAddedToCart] = useState([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
      console.log('Kart yaradıldı');
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((json) => setData(json));
    }, []);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleMinPriceChange = (event) => {
      setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
      setMaxPrice(event.target.value);
    };

    const handleAddToCart = (item) => {
      let cartItems = [...addedToCart];
      let itemIndex = cartItems.findIndex((i) => i.id === item.id);
      if (itemIndex === -1) {
        cartItems.push({...item, quantity: 1});
      } else {
        cartItems[itemIndex].quantity += 1;
      }
      setAddedToCart(cartItems);
    };

    const handleRemoveFromCart = (item) => {
      let cartItems = [...addedToCart];
      let itemIndex = cartItems.findIndex((i) => i.id === item.id);
      if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity === 1) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity -= 1;
        }
      }
      setAddedToCart(cartItems);
    };

    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (minPrice === '' || item.price >= parseInt(minPrice)) &&
        (maxPrice === '' || item.price <= parseInt(maxPrice))
    );

    return (
      <div className='card-container'>
        <div className='search-bar'>
          <input type='text' placeholder='Məhsul axtar...' onChange={handleSearch} />
          <div className='price-filter'>
            <input type='number' placeholder='Min qiymət' value={minPrice} onChange={handleMinPriceChange} />
            <span>-</span>
            <input type='number' placeholder='Max qiymət' value
  ={maxPrice} onChange={handleMaxPriceChange} />
  <button onClick={() => {setMinPrice(''); setMaxPrice('');}}>Təmizlə</button>
  </div>
  </div>
          <div className='cart'>
            <h2>Səbət</h2>
            {addedToCart.length === 0 ? (
              <p>Səbət boşdur</p>
            ) : (
              <div>
                {addedToCart.map((item) => (
                  <div className='cart-item' key={item.id}>
                    <h3>{item.title}</h3>
                    <div className='cart-item-details'>
                      <span>Qiymət: {item.price} AZN</span>
                      <button onClick={() => handleRemoveFromCart(item)}>Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
  <div className='card-grid'>
  {filteredData.map((item) => (
  <div className='card-item' key={item.id}>
  <div className='card-image'>
  <img src={item.image} alt={item.title} />
  </div>
  <div className='card-details'>
  <h3>{item.title}</h3>
  <p>{item.description}</p>
  <div className='card-actions'>
  <span className='price'>{item.price} AZN</span>
  <button disabled={disabled} onClick={() => {handleAddToCart(item); setDisabled(true); setTimeout(() => {setDisabled(false)}, 1000);}}>
  {disabled ? 'Əlavə edildi' : 'Səbətə at'}
  </button>
  </div>
  </div>
  </div>
  ))}
  </div>
  </div>
  );
  };

  export default Card;