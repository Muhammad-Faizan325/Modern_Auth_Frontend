import Hero from "@/components/Hero";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1>${import.meta.env.VITE_VITE_BASE_URL}</h1>
    </div>
  );
};

export default Home;
