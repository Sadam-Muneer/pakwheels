import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="max-padd-container pt-[99px]">
      <div className="max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl">
        <div className="relative top-32 xs:top-52">
          <span className="medium-18">Welcome to PakWheels</span>
          <h1 className="h1 capitalize max-w-[40rem]">
            Discover Your Next Car with PakWheels
          </h1>
          <p className="my-10 max-w-[33rem]">
            Explore our listings and find your perfect car today. Start your
            journey to car ownership with us.
          </p>
          <div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
            <div className="text-center regular-14 leading-tight pl-5">
              <h5 className="uppercase font-bold">10% Off</h5>
              <p className="regular-14">On All Car Listings</p>
            </div>
            <Link
              to={"/listing"}
              className="btn-secondary rounded-xl flexCenter !py-4"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
