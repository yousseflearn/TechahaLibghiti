import './Navbar.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import Link from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('Home');

  return (
    <div className="navbar">
      <img src={assets.logo1} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu('Home')}
          className={menu === 'Home' ? 'active' : ''}
        >
          Home
        </Link>
        <a
          href="/exploreMenu"
          onClick={() => setMenu('Menu')}
          className={menu === 'Menu' ? 'active' : ''}
        >
          Menu
        </a>
        <a
          href="/appDownload"
          onClick={() => setMenu('Mobile-app')}
          className={menu === 'Mobile-app' ? 'active' : ''}
        >
          Mobile-app
        </a>
        <a
          href="/footer"
          onClick={() => setMenu('Contact Us')}
          className={menu === 'Contact Us' ? 'active' : ''}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
