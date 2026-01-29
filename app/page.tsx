import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <About />
        <Footer />
      </div>
    </main>
  );
}
