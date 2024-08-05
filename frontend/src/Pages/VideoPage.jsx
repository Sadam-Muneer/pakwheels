import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FAQ from "../components/FAQ";
import Testimonials from "../components/TestimonialSlider";

const videos = [
  {
    id: 1,
    title: "Mercedes-Maybach S 680 Haute Voiture 1 of 150",
    description: "Price: €618.799.",
    url: "https://www.youtube.com/embed/Fa3iEAn2d7Y",
    thumbnail: "https://img.youtube.com/vi/Fa3iEAn2d7Y/hqdefault.jpg",
  },
  {
    id: 2,
    title: "Bentley Flying Spur (2024) - The Peak of Luxury!",
    description: "Price: €318.799.",
    url: "https://www.youtube.com/embed/NngFqk_Degk?si=9N7Rd1CZ-ty7x9qy",
    thumbnail: "https://img.youtube.com/vi/NngFqk_Degk/hqdefault.jpg",
  },
  {
    id: 3,
    title: "2024 Range Rover SV LWB P615 - Is There Anything Missing?",
    description: "Price: €420.799.",
    url: "https://www.youtube.com/embed/qG6KPM3loCY?si=x9y9AxiBA0RwflQ9",
    thumbnail: "https://img.youtube.com/vi/qG6KPM3loCY/hqdefault.jpg",
  },
  {
    id: 4,
    title: "Rolls-Royce Phantom Series 2 (2024) - Visual Review",
    description: "Price: €220.799.",
    url: "https://www.youtube.com/embed/kbt-IxcHVok",
    thumbnail: "https://img.youtube.com/vi/kbt-IxcHVok/hqdefault.jpg",
  },
  {
    id: 5,
    title: "Range Rover SV (2024) - Dreamy Ultra Luxury Large SUV!",
    description: "Comparing the top SUVs in the market.",
    url: "https://www.youtube.com/embed/DrJAh6JX-9E?si=TaZDiEtpYjjnYA6A",
    thumbnail: "https://img.youtube.com/vi/DrJAh6JX-9E/hqdefault.jpg",
  },
  {
    id: 6,
    title:
      "2025 Mercedes Maybach SL Mythos Series - Mercedes-Benz's New Pinnacle of Opulence!",
    description: "Price: €728.749.",
    url: "https://www.youtube.com/embed/_0XndlhVA9w?si=KayW09QzqSCAVnMK",
    thumbnail: "https://img.youtube.com/vi/_0XndlhVA9w/hqdefault.jpg",
  },
  {
    id: 7,
    title: "Rolls-Royce Phantom Series II Extended (2023)",
    description: "Price: €414.799.",
    url: "https://www.youtube.com/embed/qG6KPM3loCY?si=x9y9AxiBA0RwflQ9",
    thumbnail: "https://img.youtube.com/vi/qG6KPM3loCY/hqdefault.jpg",
  },
  {
    id: 8,
    title: "Rolls-Royce Phantom Series 2 (2024) - Visual Review",
    description: "Price: €220.799.",
    url: "https://www.youtube.com/embed/BVvnSzMqI3M?si=9hkthcMXACsCLG1s",
    thumbnail: "https://img.youtube.com/vi/BVvnSzMqI3M/hqdefault.jpg",
  },
  {
    id: 9,
    title: "Range Rover SV (2024) - Dreamy Ultra Luxury Large SUV!",
    description: "Comparing the top SUVs in the market.",
    url: "https://www.youtube.com/embed/PkkV1vLHUvQ?si=9QWQGZoWk6oPkAqp",
    thumbnail: "https://img.youtube.com/vi/PkkV1vLHUvQ/hqdefault.jpg",
  },
];

const VideoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [playlist, setPlaylist] = useState(videos.slice(1));

  const filteredPlaylist = playlist.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVideoClick = (video) => {
    setPlaylist((prevPlaylist) => [
      currentVideo,
      ...prevPlaylist.filter((v) => v.id !== video.id),
    ]);
    setCurrentVideo(video);
  };

  return (
    <>
      <main className="max-padd-container my-[99px]">
        <div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
          <input
            type="text"
            placeholder="Search Video"
            className="bg-transparent border-none outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="relative right-4 text-xl hover:text-secondary cursor-pointer" />
        </div>
        <h1 className="text-3xl font-bold mt-10">Today’s Featured Videos</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <div>
              <iframe
                src={currentVideo.url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentVideo.title}
                className="w-full h-[400px] rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">{currentVideo.title}</h2>
              <p className="mt-2 text-gray-600">{currentVideo.description}</p>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Other Videos</h3>
            <div className="h-[calc(68vh-5rem)] overflow-y-auto space-y-4">
              {filteredPlaylist.length > 0 ? (
                filteredPlaylist.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center space-x-4 cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-15 rounded-md"
                    />
                    <div>
                      <h4 className="text-md font-medium line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-full">
                  <h4 className="text-lg font-bold">
                    No videos available based on your search
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <FAQ />
      <Testimonials />
    </>
  );
};

export default VideoPage;
