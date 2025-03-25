import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layouts/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <section className="w-full lg:w-[60vw] h-screen lg:ml-auto flex flex-col  lg:items-center my-10 px-2">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;
