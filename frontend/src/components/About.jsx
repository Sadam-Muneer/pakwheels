import CarImage from "../assets/about.webp";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const About = () => {
  const statistics = [
    { label: "Cars Sold", value: 1200 },
    { label: "Happy Customers", value: 950 },
    { label: "Years in Business", value: 15 },
  ];
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const visible = top < window.innerHeight - 100;
        setIsVisible(visible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section id="about" className="max-padd-container py-16 xl:py-28">
      <div className="flex ">
        <div className="flex-1 relative">
          <img
            src={CarImage}
            alt="CarImage"
            className="rounded-xl wow fadeInUp animate-spin"
          />
          <div
            className={`bg-white absolute bottom-0 left-3 sm:left-16 max-w-xs p-4 rounded-lg flexCenter flex-col ${
              isVisible ? "block" : "hidden"
            }`}
          >
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="font-2xl" />
            </span>
            <p className="text-center relative bottom-3">
              Discover exceptional driving experiences with us, where every car
              is crafted to offer unparalleled performance and style.
            </p>
          </div>
        </div>
        <div className="flex flex-1 justify-center flex-col">
          <span className="medium-18">Our Journey in the Automotive World</span>
          <h2 className="h2">
            Committed to Delivering Excellence in Every Drive
          </h2>
          <p className="py-5">
            At PakWheels, we are passionate about delivering top-notch vehicles
            that redefine driving pleasure. Our dedication to innovation and
            customer satisfaction ensures that each car we offer meets the
            highest standards of quality and performance.
          </p>
          <div className="flex flex-wrap gap-4">
            {statistics.map((statistic, index) => (
              <div key={index} className="bg-primary p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistic.value}
                    duration={5}
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <h3
                        ref={countUpRef}
                        className="text-2xl font-semibold"
                      ></h3>
                    )}
                  </CountUp>
                  <h4 className="bold-22">+</h4>
                </div>
                <p>{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
