import React from "react";
import Card from "./Card";
import "../Styles/Carrousel.css";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Carrousel({publicaciones}) {

    const responsive = {
        brakepoint1: {
          breakpoint: { max: 3000, min: 1600 },
          items: 5,
          slidesToSlide: 1
        },
        brakepoint2: {
            breakpoint: { max: 1600, min: 1330 },
            items: 4,
            slidesToSlide: 1
          },
          brakepoint3: {
          breakpoint: { max: 1330, min: 1075 },
          items: 3,
          slidesToSlide: 1
        },
        brakepoint4: {
          breakpoint: { max: 1075, min: 800 },
          items: 2,
          slidesToSlide: 1
        },
        brakepoint5: {
            breakpoint: { max: 800, min: 0 },
            items: 1,
            slidesToSlide: 1
          }
      };
      
  return (

    <Carousel responsive={responsive} 
            infinite={true} 
            autoPlay={true}
            autoPlaySpeed={2000}
            draggable={true}
            swipeable={true}
            dotListClass="custom-dot-list-style"
            showDots={true}>

        {publicaciones.map((url) => (
            <div className="displayImages" key={url.postId}>
                <Card url={url}/>
            </div>
            ))}

    </Carousel>
  );
}

export default Carrousel;
