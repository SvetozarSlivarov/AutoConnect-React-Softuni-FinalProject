import React from "react";
import CarCard from "../components/CarCardHome.jsx";
import HowItworks from "../components/HowItWorks.jsx";
import HeroHomeSection from "../components/HeroHomeSection.jsx";

const featuredCars = [
  {
    id: 1,
    name: "Mercedes GTR AMG",
    price: "$29,999",
    year: "2023",
    mileage: "14km",
    transmission: "Automatic",
    fuel: "Petrol",
    color: "Blue",
    image: "./images/cars/mercedes-gt-r-amg/01.jpg",
  },
  {
    id: 2,
    name: "Audi R8",
    price: "$38,965",
    year: "2023",
    mileage: "25km",
    transmission: "Manual",
    fuel: "Diesel",
    color: "Grey",
    image: "./images/cars/audi-r8/01.jpg",
  },
];

const HomePage = () => {
  return (
    <>
    <HeroHomeSection />
    <main className="container py-5">
      <HowItworks />
      <section className="featured-cars text-center mb-5">
        <div className="container">
          <h2 className="featured-title">Featured Cars</h2>
          <div className="row">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </main>
  </>
);
};

export default HomePage;
