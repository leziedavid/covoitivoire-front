import Container from "@/components/container";
import AccountPrompt from "@/components/home/AccountPrompt";
import { BusinessHeader } from "@/components/home/BusinessHeader";
import { EngagementsSection } from "@/components/home/EngagementsSection";
import { RideShareCard } from "@/components/home/EventCollectionCard";
import { Footer } from "@/components/home/Footer";
import Header from "@/components/home/header";
// import { Header } from "@/components/home/Headers";
import { Hero } from "@/components/home/Hero";
import { MainCta } from "@/components/home/MainCta";
import { SafetyInfoSection } from "@/components/home/SafetyInfoSection";
import { SuggestionsSection } from "@/components/home/Suggestions";

export default async function Home() {

  return (
    <>
      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
        <MainCta />
        <SuggestionsSection />
          {/* <RideShareCard /> */}
        <AccountPrompt />
      </div>
      <Footer />
    </>
  );
}
