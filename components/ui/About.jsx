import React from "react";
import Image from "next/image";
import Title from "./Title";
const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div
        className="container mx-auto flex 
          items-center text-white gap-20
          sm:flex-auto justify-center flex-wrap-reverse"
      >
        <div className="flex justify-center">
          <div
            className="relative sm:w-[445px] sm:h-[600px]
                  flex justify-center w-[300px] h-[450px]
                  "
          >
            <Image src="/images/about-img.png" alt="about-burger" fill />
          </div>
        </div>
        <div className="md:w-1/2">
          <Title addClass="text-[40px]">We Are Space Burger</Title>
          <p className="my-10 text-sm">
            I have a company called Space Burger that offers gourmet burgers and
            breathtaking pizzas, taking your taste buds on a journey through the
            space age. With a menu where flavors are worthy of the stars, we
            invite our guests to embark on a culinary adventure. Our burgers are
            crafted with carefully selected, high-quality ingredients, offering
            perfect flavors and unique combinations. Each bite provides an
            explosion of taste, even in space, delivering an astonishing
            experience. Our pizzas, resembling the richness of planets in the
            infinite expanse of space, offer a diverse range of flavors with
            meticulously chosen toppings on thin crusts. At Space Burger, we pay
            attention to every detail to become the culinary destination of your
            space exploration. Join us in experiencing the joy of flavor beyond
            earthly limits and indulge in the enchanting atmosphere of space!
            Take a Bite, Explore Space!
          </p>
          <button className="btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};
export default About;
