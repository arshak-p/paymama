import { Nav } from "@/components/Nav";
import { Hero, Ticker, About, Features, How, AppPreview, Security, Footer } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { Download } from "@/components/Download";
import { Cursor } from "@/components/Cursor";
import { MotionRoot } from "@/components/MotionRoot";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Features />
        <How />
        <AppPreview />
        <Security />
        <section className="section" id="faq">
          <div className="wrap">
            <span className="eyebrow" data-eyebrow>FAQ</span>
            <h2 className="h2" data-mask="lines">Questions people ask.</h2>
            <Faq />
          </div>
        </section>
        <Download />
      </main>
      <Footer />
      <Cursor />
      <MotionRoot />
    </>
  );
}
