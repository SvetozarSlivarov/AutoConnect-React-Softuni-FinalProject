import React, { useEffect, useState } from "react";
import CarCard from "../components/HomePage/CarCardHome.jsx";
import HowItworks from "../components/HomePage/HowItWorks.jsx";
import HeroHomeSection from "../components/HomePage/HeroHomeSection.jsx";
import WhyChooseUs from "../components/HomePage/WhyChooseUs.jsx";

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cars");
        const data = await res.json();

        // Сортиране по дата (от най-ново към най-старо)
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Вземаме само 6-те най-нови
        setFeaturedCars(sorted.slice(0, 6));
      } catch (err) {
        console.error("Failed to load cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCars();
  }, []);

  return (
    <>
      <HeroHomeSection />
      <main className="container py-5">
        <HowItworks />

        <section className="featured-cars text-center mb-5">
          <div className="container">
            <h2 className="featured-title">Featured Cars</h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row">
                {featuredCars.length > 0 ? (
                  featuredCars.map((car) => <CarCard key={car._id} car={car} />)
                ) : (
                  <p>No cars available</p>
                )}
              </div>
            )}
          </div>
        </section>

        <WhyChooseUs />
      </main>
    </>
  );
};

export default HomePage;
