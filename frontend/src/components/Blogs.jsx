import { BLOGS } from "../constants/data";
import CarImage from "../assets/hel.png";
import icon from "../assets/icon.webp";
const Blogs = () => {
  return (
    <>
      <section className="max-padd-container">
        <div className="max-padd-container py-16 xl:py-28 rounded-3xl">
          <span className="medium-18">Stay Updated with the latest news!</span>
          <h2 className="h2">Our Expert BLOGS</h2>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-24">
            {BLOGS.map((blog) => (
              <div
                key={blog.title}
                className="rounded-3xl border-[11px] border-primary shadow-sm overflow-hidden relative"
              >
                <img src={blog.image} alt={blog.title} />
                <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
                <div className="absolute bottom-4 left-4 text-white text-[15px]">
                  <h3 className="font-[600] text-[16px] pr-4 leading-5">
                    {blog.title}
                  </h3>
                  <h4 className="medium-14 pb-3 pt-1">{blog.category}</h4>
                  <button className="bg-white rounded-xl font-semibold text-tertiary px-3 py-1">
                    Continue Reading
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-padd-container about-section relative py-16 pt-0">
        <div className="container mx-auto">
          <div className="about-wrapper">
            <div className="flex flex-wrap -mx-4">
              <div className="lg:w-1/2 px-4 mb-8 lg:mb-0">
                <div className="relative">
                  <div className="absolute top-0 left-0">
                    <img src={CarImage} alt="shape-img" />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 px-4">
                <div className="about-content">
                  <div className="section-title">
                    <img src={icon} alt="icon-img" />
                    <span
                      className=" font-semibold mt-4 block wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      Get to know us
                    </span>
                    <h2
                      className="text-3xl font-bold mt-4 wow fadeInUp"
                      data-wow-delay=".4s"
                    >
                      Services with a Wide Range of Cars
                    </h2>
                  </div>
                  <h4
                    className="mt-6 text-xl wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    Committed to providing our customers with exceptional
                    service.
                  </h4>
                  <p className="mt-4 text-lg wow fadeInUp" data-wow-delay=".5s">
                    Lorem ipsum is simply ipun txns mane so dummy text of free
                    available in market the printing and typesetting industry
                    has been the industry's standard dummy text ever.
                  </p>
                  <div className="mt-6 wow fadeInUp" data-wow-delay=".7s">
                    <ul className="list-disc pl-5">
                      <li className="mb-2">Many Pickup Locations</li>
                      <li>Offering Low Prices</li>
                    </ul>
                    <ul className="list-disc pl-5 mt-4">
                      <li className="mb-2">Many Pickup Locations</li>
                      <li>Offering Low Prices</li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    className="inline-block mt-6 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-black transition transform hover:scale-110 duration-300 ease-in-out wow fadeInUp animate-pulse"
                    data-wow-delay=".8s"
                  >
                    Discover More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Blogs;
