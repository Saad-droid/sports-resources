import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carosuel.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useState } from "react";
import CommonForm from "./CommonForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Carosuel = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const navigate = useNavigate(); 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const handleClick = (sports) => {
    console.log("sports", sports);
    if (sports === "chess" || sports === "tabletennis" || sports === "tennis") {

      console.log("Logging sport:", sports);
      
    } else {
      // Navigate to form for other sports
      setSelectedSport(sports);
      navigate(`/form/${sports}`);
    }
  };
  
  return (
    <div>
      <div className='carousel-wrapper'>
        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className='carousel-item'>
              <div className='image-wrapper'>
                <img src={d.img} alt="" className="carousel-image"  onClick={()=>handleClick(d.name)} />
              </div>
              <div className='content-wrapper'>
                <p className="name">{d.name}</p>
                <p className="review">{d.review}</p>
                <button className='read-more' onClick={()=>handleClick(d.name)}  > Participate</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {selectedSport && <CommonForm selectedSport={selectedSport} />}
     
    </div>
  )
}

const data = [
  {
    name: `Cricket`,
    img: `/Images/sports1.jpg`,
    review: `10 march 2024`
  },
  {
    name: `BasketBall`,
    img: `/Images/sports2.jpg`,
    review: `11 march 2024`
  },
  {
    name: `Football`,
    img: `/Images/sports3.jpg`,
    review: `12 march 2024`
  },
  {
    name: `tennis`,
    img: `/Images/sports4.jpg`,
    review: `13 March 2024`
  },
  {
    name: `chess`,
    img: `/Images/sports5.jpg`,
    review: `14 march 2024`
  },
  {
    name: `tabletennis`,
    img: `/Images/sports6.jpg`,
    review: `15 march 2024`
  },
];

export default Carosuel;
