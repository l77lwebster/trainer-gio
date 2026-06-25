import { Hero } from "./components/Hero";
import { Booking } from "./components/Booking";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";
import { Grain } from "./components/Grain";
import { StickyCTA } from "./components/StickyCTA";
import { ThankYou } from "./components/ThankYou";

export default function App() {
  const isThankYou = window.location.pathname === "/thank-you";

  if (isThankYou) {
    return (
      <>
        <Cursor />
        <Grain />
        <ThankYou />
      </>
    );
  }

  return (
    <>
      <Cursor />
      <Grain />
      <StickyCTA />
      <main>
        <Hero />
        <Booking />
        <Gallery />
        <About />
      </main>
      <Footer />
    </>
  );
}
