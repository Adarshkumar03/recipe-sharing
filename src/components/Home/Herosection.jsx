import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-teal-600 text-white mt-20 mb-5 p-8 shadow-md rounded-md">
      <div className="container flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover and Share Delicious Recipes
        </h1>
        <p className="text-lg text-slate-200">
          Explore a world of culinary creations from passionate home cooks. 
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
