import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar Button */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} color="white" />}
      </button>

      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 top-0 h-screen bg-white w-[70vw] p-5 
        flex flex-col justify-center text-[24px] md:text-[4rem] gap-5 shadow-xl 
        transition-transform duration-300 lg:w-[40vw] lg:flex 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="links flex flex-col gap-5 ">
          <NavLink to={"/"} onClick={() => setIsOpen(false)}>
            Link's Clipper
          </NavLink>
          <NavLink to={"/qrgenerator"} onClick={() => setIsOpen(false)}>
            QR Generator
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
