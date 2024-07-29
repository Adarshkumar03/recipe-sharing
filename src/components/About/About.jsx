import React from 'react';

import ChefImage from '../../assets/happy-chef.png'; 

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg mt-20 flex flex-col justify-center items-center"> 
      <h1 className="text-4xl font-bold text-teal-600 mb-5">
        Our Story: A Pinch of Passion, A Dash of Code
      </h1> 

      <div className="flex flex-col md:flex-row items-center justify-center gap-8"> 
        <img 
          src={ChefImage} 
          alt="Happy chef cartoon" 
          className="w-96 rounded-xl  bg-gray-100 " 
        />
        <div className="text-center md:text-left"> 
          <p className="text-lg mb-6 w-2/3">
            Foodie at heart and coder by trade, I have built this recipe app to celebrate the culinary adventures we all crave.  Whether you're a master chef or bravely wielding your first spatula, this is your space to share those delicious dishes!
          </p>
          <p className="text-lg w-2/3">
            Imagine a digital cookbook brimming with flavors from every corner of the globe, where grandma's secret recipe rests comfortably beside your latest experimental creation. That's the community I am trying to build, one recipe at a time.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-teal-600 mb-3">Mission</h2>
      <p className="text-center text-lg w-4/5">
        To empower home cooks everywhere to discover, share, and unleash their kitchen creativity!
      </p>
    </div>
  );
};

export default About;
