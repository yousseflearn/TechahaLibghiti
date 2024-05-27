import './ExploreMenu.css';
import Slider from '../Slider/Slider';
import { useState } from 'react';

const ExploreMenu = () => {
  const [category, setCategory] = useState('All');
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      <Slider category={category} setCategory={setCategory} />
      <hr />
    </div>
  );
};

export default ExploreMenu;
