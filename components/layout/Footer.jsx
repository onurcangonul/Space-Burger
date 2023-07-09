import React from "react";
import Title from "../ui/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../ui/Logo";
import Link from "next/link";
const Footer = () => {
  const [footer, setFooter] = useState([]);
  const { location, desc, email, phoneNumber, openingHours, socialMedia } = footer
  
  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div
          className="flex md:justify-between justify-center text-center
        flex-wrap md:gap-y-0 gap-y-6"
        >
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <a href={location} target="_blank">
                <i className="fas fa-map-marker-alt"></i>
                <span className="inline-block ml-2 hover:text-primary transition-all">
                  Address
                </span>
              </a>
              <a href={`tel:${phoneNumber}`}>
                <i className="fas fa-phone-alt"></i>
                <span className="inline-block ml-2 hover:text-primary transition-all">
                  Phone +90 {phoneNumber}
                </span>
              </a>
              <a href={`mailto:${email}`}>
                <i className="far fa-envelope"></i>
                <span className="inline-block ml-2 hover:text-primary transition-all">
                  {email}
                </span>
              </a>
            </div>
          </div>
          <div className="md:flex-1">
            <div className="flex justify-center items-center">
              <Logo />
            </div>
            <p className="mt-3">{desc}</p>
            <div className="flex items-center justify-center mt-5 gap-x-2  ">
              {socialMedia?.map((social) => (
                <a
                  key={social._id}
                  href={social.link}
                  target="_blank"
                  className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-white hover:bg-primary transition-all"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex md:flex-col flex-row gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">{openingHours?.day}</span>
              </div>
              <div>
                <span className="inline-block ml-2">{openingHours?.hour}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          © 2022 All Rights Reserved By{" "}
          <Link className="text-primary hover:underline" href="https://www.linkedin.com/in/onurcangonul/" target="_blank">
            Onurcan Gönül
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Footer;
