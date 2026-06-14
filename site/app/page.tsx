import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import PorQueParticipar from "@/components/sections/PorQueParticipar";
import Exigencias from "@/components/sections/Exigencias";
import Treinamento from "@/components/sections/Treinamento";
import Certificacao from "@/components/sections/Certificacao";
import Comunidade from "@/components/sections/Comunidade";
import Eventos from "@/components/sections/Eventos";
import Beneficios from "@/components/sections/Beneficios";
import ComoFunciona from "@/components/sections/ComoFunciona";
import CTAFinal from "@/components/sections/CTAFinal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PorQueParticipar />
        <Exigencias />
        <Treinamento />
        <Certificacao />
        <Comunidade />
        <Eventos />
        <Beneficios />
        <ComoFunciona />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
