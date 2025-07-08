import Container from "@/components/container";
import { BusinessHeader } from "@/components/home/BusinessHeader";
import { EngagementsSection } from "@/components/home/EngagementsSection";
import { Footer } from "@/components/home/Footer";
import Header from "@/components/home/header";
// import { Header } from "@/components/home/Headers";
import { Hero } from "@/components/home/Hero";
import { InfosSection } from "@/components/home/InfosSection";
import { MainCta } from "@/components/home/MainCta";
import { SafetyInfoSection } from "@/components/home/SafetyInfoSection";
import { SuggestionsSection } from "@/components/home/Suggestions";

export default async function Home() {

  return (
    <div className="mb-8">
      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5`}>
        <MainCta />
        <SuggestionsSection />
        <InfosSection />
      </div>
      <Footer />
    </div>
  );
}
