import { useState } from "react";
import "./Nav.scss";

const Nav = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <section class="navigation">
    <div class="nav-container">
      <div class="brand">
        <a href="#!">🍀 Clothes shoping</a>
      </div>
      <nav>
    <div class="nav-mobile">
      <a id="nav-toggle" href="#!"><span></span></a>
    </div>
    <ul class="nav-list">
      <li><a href="#!">Home</a></li>
      <li><a href="#!">Shop</a></li>
      <li>
      </li>
      <li><a href="#!">About Us</a></li>
      <li><a href="#!">Contact</a></li>
    </ul>
  </nav>
      </div>
  </section>
  );
};
export default Nav;
