import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import car1 from '../car1.jpg';
import car2 from '../car2.jpg';
import car6 from '../car6.webp';

const Home = () => {
    return (
        <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car1}
        />
        <Carousel.Caption>
          <h3>Better care with best prices</h3>
          <p>We provide Best cars with the best prices. We are expert in car rental. Enjoy your holidays with us. We make your drive memorable. We care for your safety.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car2}
        />
        <Carousel.Caption>
          <h3>Best cars for the best journey</h3>
          <p>We provide Best cars with the best prices. We are expert in car rental. Enjoy your holidays with us. We make your drive memorable. We care for your safety.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car6}
        />
        <Carousel.Caption>
          <h3>Make your trip enjoyable</h3>
          <p>
          We provide Best cars with the best prices. We are expert in car rental. Enjoy your holidays with us. We make your drive memorable. We care for your safety.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}

export default Home;