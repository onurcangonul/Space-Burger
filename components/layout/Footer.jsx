import React from "react";
import Title from "../ui/Title";

const Footer = () => {
  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex md:justify-between justify-center text-center
        flex-wrap md:gap-y-0 gap-y-6">
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <i className="fas fa-map-marker-alt"></i>
                <span className="inline-block ml-2">Location</span>
              </div>
              <div>
                <i className="fas fa-phone-alt"></i>
                <span className="inline-block ml-2">
                  Phone +90 0555 555 55 55
                </span>
              </div>
              <div>
                <i className="far fa-envelope"></i>
                <span className="inline-block ml-2">burger@burger.com</span>
              </div>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[38px]">Feane</Title>
            <p className="mt-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus inventore vitae saepe ex tenetur debitis quaerat
              minima temporibus perspiciatis sequi. Sit vitae non nemo pariatur
              sequi sed ab illum exercitationem?
            </p>
            <div className="flex items-center justify-center mt-5 gap-x-2  ">
              <a
                href="#"
                className="w-8 h-8 grid place-content-center hover:text-primary"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 grid place-content-center hover:text-primary"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 grid place-content-center hover:text-primary"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 grid place-content-center hover:text-primary"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 grid place-content-center hover:text-primary"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">Everyday</span>
              </div>
              <div>
                <span className="inline-block ml-2">10.00 AM - 10.00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          © 2022 All Rights Reserved By Free Html Templates
        </p>
      </div>
    </div>
  );
};
export default Footer;
