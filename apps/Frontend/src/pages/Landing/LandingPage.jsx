import React from "react";
import Navbar from "../../components/LandingPage/Navbar";
import About from "../../components/LandingPage/About";
import HeroSection from "../../components/LandingPage/HeroSection";
import Footer from "../../components/LandingPage/Footer";
import PastRecruiters from "../../components/LandingPage/PastRecruiter";

const LandingPage = () => {

  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <PastRecruiters />
      <Footer />
    </>
  );
};

export default LandingPage;
