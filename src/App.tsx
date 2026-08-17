import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
