import React from "react";
import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Customers = () => {

  const NextArrow = ({onClick}) => {
    return (
      <button className="bg-primary absolute -bottom-12 left-1/2 flex item-center justify-center items-center text-white w-10 h-10 rounded-full" onClick={onClick}><IoIosArrowForward /></button>
    )
  }
  const PrevArrow = ({ onClick }) => {
    return (
      <button className="bg-primary absolute -bottom-12 right-1/2 flex item-center justify-center items-center text-white w-10 h-10 rounded-full mr-2" onClick={onClick}><IoIosArrowBack /></button>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow:<NextArrow/>,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows:false
        }
      }
    ]
  };

  return (
    <div className="container mx-auto mb-20 mt-16">
      <Title addClass="text-[40px] text-center">What Says Our Customers</Title>
        <Slider {...settings}>
        <CustomerItem imgSrc="/images/client1.jpg" />
        <CustomerItem imgSrc="/images/client2.jpg" />
        <CustomerItem imgSrc="/images/client1.jpg" />
        <CustomerItem imgSrc="/images/client2.jpg" />
        </Slider>
    </div>
  );
};
export default Customers;
