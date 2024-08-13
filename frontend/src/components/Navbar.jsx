import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MdAddHome, MdHomeWork, MdVideoLibrary } from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { useState } from "react";
import AddPropertyModel from "../components/AddPropertyModel";
import UseAuthChck from "../hooks/UseAuthChck";

const Navbar = ({ containerStyles, closeMenu }) => {
  const [modelOpened, setModelOpened] = useState(false);
  const { validateLogin } = UseAuthChck();

  const handleAddCarClick = () => {
    if (validateLogin()) {
      setModelOpened(true);
    }
    <MdVideoLibrary />;
  };

  return (
    <nav className={containerStyles}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
        onClick={closeMenu}
      >
        <MdHomeWork />
        <div>Home</div>
      </NavLink>
      <NavLink
        to="/listing"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
        onClick={closeMenu}
      >
        <RiCheckboxMultipleBlankFill />
        <div>Products</div>
      </NavLink>
      <NavLink
        to="/videos"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
        onClick={closeMenu}
      >
        <MdVideoLibrary />
        <div>Videos</div>
      </NavLink>
      <div
        onClick={handleAddCarClick}
        className="flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"
      >
        <MdAddHome />
        <div>Add Products</div>
      </div>
      <AddPropertyModel opened={modelOpened} setOpened={setModelOpened} />
    </nav>
  );
};

Navbar.propTypes = {
  containerStyles: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default Navbar;
