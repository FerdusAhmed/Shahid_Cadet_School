import React from "react";
import Hero from "./Hero/Hero";
import AcademicPrograms from "../../components/Home/AcademicPrograms";
import NoticeBoard from "../../components/Home/NoticeBoard";
import SecureCloudSystem from "../../components/Home/SecureCloudSystem";
import Testimonials from "../../components/Home/Testimonials";
import Container from "../../Layouts/Container";
import Collaboration from "../../components/Home/Collaboration";
import SocialProof from "../../components/Home/SocialProof";
import HowItWorks from "../../components/Home/HowItWorks";
import FAQ from "../../components/Home/FAQ";
import Contact from "../../components/Home/Contact";

const Home = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue', minHeight: '100vh' }}>
      <Hero></Hero>
      <AcademicPrograms></AcademicPrograms>
      <NoticeBoard></NoticeBoard>
      <SecureCloudSystem></SecureCloudSystem>
      <Testimonials></Testimonials>
      <Collaboration></Collaboration>
      <SocialProof></SocialProof>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
      <Contact></Contact>

    </div>
  );
};

export default Home;
