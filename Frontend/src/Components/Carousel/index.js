import React from "react";
import { Carousel } from 'react-bootstrap';

const CarouselBox = (props) => {
    return(
        <Carousel>
        <Carousel.Item interval={2000}>
            <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/3970332/pexels-photo-3970332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="First slide"
            style={{height: '90vh'}}
            />
            <Carousel.Caption>
            <h3 style={{color: 'black'}}>https://www.manchestereveningnews.co.uk/sport/</h3>
            <p>Scrape News From above mentioned URL</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
            <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/3866816/pexels-photo-3866816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Second slide"
            style={{height: '90vh'}}
            />
            <Carousel.Caption>
            <h3 style={{color: 'black'}}>https://www.manchestereveningnews.co.uk/sport/</h3>
            <p>Scrape News From above mentioned URL</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
};

export default CarouselBox