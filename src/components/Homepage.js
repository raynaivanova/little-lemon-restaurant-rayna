import About from "./about/About";
import CallToAction from "./hero/CallToAction";
import Specials from "./specials/Specials";
import Testimonials from "./testimonials/Testimonials";

const Homepage = () => {
  return (
    <>
      <CallToAction />
      <Specials />
      <Testimonials />
      <About />
    </>
  );
};

export default Homepage;
