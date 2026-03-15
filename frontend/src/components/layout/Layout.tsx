import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
// import bgImage from "../../assets/bg-photo.jpg";
import bgImage from "../../assets/bg-drawing.jpg";

export function Layout() {
  return (
    <div
      className="relative isolate flex h-screen flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-background/78 via-background/90 to-background/78" />
      <Header />
      <main className="material-enter-soft relative z-10 flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
