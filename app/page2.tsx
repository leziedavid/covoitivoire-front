import Container from "@/components/container";
import { Hero } from "@/components/home/Hero";
import Suggestions from "@/components/home/Suggestions";

export default async function Home() {

  return (
    <Container>
      <div className="mb-8">
        <Hero />
        <Suggestions />

      </div>
    </Container>
  );
}
