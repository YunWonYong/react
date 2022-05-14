import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./layout.css";

const Wrap = () => {
  return (
    <section className="wrap">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </section>
  );
};
export default Wrap;
