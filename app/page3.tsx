"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Truck, Coffee, Car } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn button
import { Input } from "@/components/ui/input";

export default function Home() {  // <-- plus async ici

  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <header className="bg-black text-white">
        <div className="container mx-auto max-w-7xl px-4">
          <nav className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-2xl font-semibold">
                Uber
              </a>
              <ul
                className={`hidden md:flex space-x-6 ${navOpen ? "block" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="font-medium px-4 py-3 rounded-full hover:bg-gray-800 transition"
                  >
                    Company
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-medium px-4 py-3 rounded-full hover:bg-gray-800 transition"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-medium px-4 py-3 rounded-full hover:bg-gray-800 transition"
                  >
                    Help
                  </a>
                </li>
              </ul>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <ul className="flex space-x-6 items-center">
                <li>
                  <a href="#" className="font-medium">
                    FR-FR
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium">
                    Log in
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="bg-white text-black rounded-full px-4 py-3 font-medium hover:bg-gray-200 transition"
                  >
                    Sign up
                  </a>
                </li>
              </ul>
            </div>

            {/* Hamburger menu for mobile */}
            <button
              onClick={toggleNav}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col space-y-1.5 cursor-pointer"
            >
              {navOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </nav>

          {/* Mobile menu */}
          <div
            className={`md:hidden fixed left-0 top-[70px] w-full bg-black text-white flex flex-col items-center space-y-6 py-6 transition-transform duration-300 ease-in-out ${navOpen ? "translate-y-0" : "-translate-y-full"
              }`}
          >
            <a href="#" className="block text-lg font-medium">
              Company
            </a>
            <a href="#" className="block text-lg font-medium">
              Safety
            </a>
            <a href="#" className="block text-lg font-medium">
              Help
            </a>
            <a href="#" className="block text-lg font-medium">
              FR-FR
            </a>
            <a href="#" className="block text-lg font-medium">
              Products
            </a>
            <a href="#" className="block text-lg font-medium">
              Log in
            </a>
            <a
              href="#"
              className="block bg-white text-black rounded-full px-6 py-3 font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* MAIN CTA */}
        <section id="main__cta" className="py-16 bg-cover bg-center" style={{ backgroundImage: "url('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_630,h_354/v1653688498/assets/2c/3833ca-a2eb-4da4-9879-51193ea88f87/original/DotCom_Update_Earner_bg_med2x.jpg')", }} >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col md:flex-row gap-8">


              <div className="flex flex-col bg-white text-black rounded-lg shadow-md flex-1">
                {/* Cards top */}
                <div className="flex flex-col md:flex-row border-b border-gray-200 p-12 gap-8 justify-center">

                  <MainCtaCard
                    icon={
                      <Image
                        src="https://www.uber-assets.com/image/upload/v1558389718/assets/8e/33c8c0-f7e9-467c-924b-c70232943a47/original/Earn-filled.svg"
                        alt="Earn"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    }
                    text="Effectuez des courses ou des livraisons"
                  />
                  <MainCtaCard
                    icon={
                      <Image
                        src="https://www.uber-assets.com/image/upload/v1542256606/assets/7d/5a4852-3b2a-4466-96de-602dfb62dc1b/original/restaurant-outlined.svg"
                        alt="Order food"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    }
                    text="Commandez un repas"
                  />
                </div>

                {/* Formulaire principal */}
                <div className="p-12 flex flex-col items-start gap-8 max-w-xl mx-auto">
                  <h1 className="text-4xl font-extrabold leading-tight">Allez où vous voulez avec Uber</h1>
                  <p className="opacity-80">
                    Que ce soit pour un trajet ou pour faire livrer un colis, nous vous accompagnons partout.
                  </p>

                  {/* Inputs de recherche */}
                  <form className="w-full flex flex-col md:flex-row gap-4">
                    <Input
                      type="text"
                      placeholder="Où allez-vous ?"
                      className="flex-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                    />
                    <Input
                      type="text"
                      placeholder="Point de départ"
                      className="flex-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                    />
                    <Button type="submit" className="rounded-lg bg-black text-white px-6 py-3 hover:opacity-80 transition-opacity">
                      Rechercher
                    </Button>
                  </form>

                  <Button
                    asChild
                    className="rounded-xl bg-black text-white px-6 py-4 font-semibold hover:opacity-80"
                  >
                    <a href="#">Inscrivez-vous pour devenir chauffeur</a>
                  </Button>

                  <a href="#" className="opacity-80 border-b border-black hover:opacity-100 transition-opacity">
                    En savoir plus sur les courses et les livraisons
                  </a>
                </div>
              </div>

              <div className="flex-1"></div>
            </div>
          </div>

        </section>

        {/* BUSINESS HEADER */}
        <section
          id="business-header"
          className="py-16 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.uber-assets.com/image/upload/v1613106985/assets/0e/47aa71-35cb-459a-a975-78c61ea300e2/original/HP-U4B-NYC-bkg.png')",
          }}
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-start gap-6 max-w-xl">
              <h3 className="text-4xl font-semibold">Uber for Business</h3>
              <p className="text-lg font-normal pb-4">
                Changez la façon dont vos collaborateurs se déplacent et se restaurent.
              </p>
              <Button
                asChild
                className="rounded-xl bg-black text-white px-6 py-4 font-semibold hover:opacity-80"
              >
                <a href="#">Découvrez comment</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ENGAGEMENTS SECTION */}
        <section  className="py-16 bg-white text-black" data-aos="zoom-in" >
          <div className="container mx-auto max-w-7xl px-4">
            <h3 className="text-4xl pb-12 font-semibold">
              Où que vous alliez, votre sécurité est notre priorité
            </h3>
            <div className="flex flex-col md:flex-row gap-10">
              <EngagementCard
                icon={<Truck className="w-14 h-14 text-black" />}
                title="Conduite sans contact"
                description="Votre sécurité est primordiale, c’est pourquoi nos partenaires adoptent des mesures strictes pour limiter les contacts."
              />
              <EngagementCard
                icon={<Coffee className="w-14 h-14 text-black" />}
                title="La propreté avant tout"
                description="Nos partenaires font le maximum pour que les véhicules soient propres et désinfectés, y compris les surfaces que vous touchez."
              />
              <EngagementCard
                icon={<Car className="w-14 h-14 text-black" />}
                title="Vérification de vos partenaires"
                description="Tous nos partenaires passent un contrôle rigoureux avant de pouvoir exercer, pour vous garantir une expérience de qualité."
              />
            </div>
          </div>
        </section>

        <section data-aos="zoom-in" id="engagements__section" className="bg-white text-black py-16">
          <div className="container mx-auto max-w-[70.5rem] px-4">
            <h3 className="text-3xl font-semibold mb-12">Où que vous alliez, votre sécurité est notre priorité</h3>
            <div className="flex flex-col gap-8 md:flex-row md:gap-8">
              <div className="flex flex-col items-start gap-4 flex-1">
                <img
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1613520218/assets/3e/e98625-31e6-4536-8646-976a1ee3f210/original/Safety_Home_Img2x.png"
                  alt=""
                  className="w-full h-auto object-cover rounded"
                />
                <h4 className="text-xl font-semibold">Notre engagement pour votre sécurité</h4>
                <p className="text-gray-600 opacity-80">
                  Chacune de nos fonctionnalités de sécurité et des règles de notre Charte de la communauté contribue à créer un environnement sûr pour nos utilisateurs.
                </p>
                <a href="#" className="underline text-black opacity-80 hover:opacity-100 transition-opacity duration-300">
                  Découvrez notre Charte de la communauté
                </a>
                <a href="#" className="underline text-black opacity-80 hover:opacity-100 transition-opacity duration-300">
                  Consultez toutes les fonctionnalités de sécurité
                </a>
              </div>

              <div className="flex flex-col items-start gap-4 flex-1">
                <img
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1613520285/assets/c2/91ea9c-90d7-4c36-a740-d7844536694e/original/Cities_Home_Img2x.png"
                  alt=""
                  className="w-full h-auto object-cover rounded"
                />
                <h4 className="text-xl font-semibold">Nous mettons plus de 10 000 villes en mouvement</h4>
                <p className="text-gray-600 opacity-80">
                  L'application étant disponible depuis des milliers de villes du monde entier, vous pourrez aussi commander des courses si vous êtes loin de chez vous.
                </p>
                <a href="#" title="Afficher toutes les villes" className="underline text-black opacity-80 hover:opacity-100 transition-opacity duration-300">
                  Afficher toutes les villes
                </a>
              </div>
            </div>
          </div>
        </section>

        <section data-aos="fade-up" id="infos__section" className="bg-white text-black py-16">
          <div className="container mx-auto max-w-[70.5rem] px-4">
            <div className="flex flex-col gap-8 md:flex-row md:gap-8">
              <div className="flex flex-col items-start gap-4 flex-1">
                <img
                  src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_24,h_24/v1542256135/assets/dd/c53d7b-8921-4dc7-93f4-45fb59f4ffb9/original/person-multiple-outlined.svg"
                  alt=""
                  className="w-6 h-6"
                />
                <p className="font-medium text-lg">À propos</p>
                <p className="text-gray-600 opacity-80">
                  Découvrez notre histoire, nos motivations et notre monde d'opportunités.
                </p>
                <a href="#" className="underline text-black opacity-80 hover:opacity-100 transition-opacity duration-300">
                  En savoir plus
                </a>
              </div>

              <div className="flex flex-col items-start gap-4 flex-1">
                <img
                  src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_24,h_24/v1542254244/assets/eb/68c631-5041-4eeb-9114-80048a326782/original/document-outlined.svg"
                  alt=""
                  className="w-6 h-6"
                />
                <p className="font-medium text-lg">Espace presse</p>
                <p className="text-gray-600 opacity-80">
                  Suivez l'actualité de nos fonctionnalités, initiatives et partenariats.
                </p>
                <a href="#" className="underline text-black opacity-80 hover:opacity-100 transition-opacity duration-300">
                  En savoir plus
                </a>
              </div>

              <div className="flex flex-col items-start gap-4 flex-1">
                <img
                  src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_24,h_24/v1542255370/assets/64/58118a-0ece-4f80-93ee-8041b53593d5/original/home-outlined.svg"
                  alt=""
                  className="w-6 h-6"
                />
                <p className="font-medium text-lg">Citoyens du monde</p>
                <p className="text-gray-600 opacity-80">
                  Découvrez ce que nous mettons en œuvre pour avoir un impact positif dans les villes que nous desservons.
                </p>
                <a href="#" className="underline text-black opacity-80 hover:opacity-100 transition-opacity duration-300">
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="applications__section" className="bg-gray-100 text-black py-16">
          <div className="container mx-auto max-w-[70.5rem] px-4">
            <h3 className="text-3xl font-semibold mb-12">Retrouvez encore plus de fonctionnalités dans nos applications</h3>
            <div className="flex flex-col gap-6 md:flex-row md:gap-6">
              <a
                data-aos="fade-right"
                href="#"
                className="flex items-center gap-4 p-6 bg-white border border-black/20 rounded shadow hover:shadow-md transition-shadow duration-300 flex-1"
              >
                <span className="bg-black text-white font-semibold text-4xl px-4 py-2 rounded">Uber</span>
                <p className="text-lg font-bold">Téléchargez l'application pour les chauffeurs et les coursiers</p>
              </a>
              <a
                data-aos="fade-left"
                href="#"
                className="flex items-center gap-4 p-6 bg-white border border-black/20 rounded shadow hover:shadow-md transition-shadow duration-300 flex-1"
              >
                <span className="bg-black text-white font-semibold text-4xl px-4 py-2 rounded">Uber</span>
                <p className="text-lg font-bold">Téléchargez l'application Uber</p>
              </a>
            </div>
          </div>
        </section>


      </main>
    </>
  );
}

function MainCtaCard({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12">{icon}</div>
      <p className="text-center text-sm md:text-base font-medium">{text}</p>
    </div>
  );
}

function EngagementCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="flex flex-col items-start gap-4 max-w-sm">
      <div>{icon}</div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="opacity-70">{description}</p>
    </article>
  );
}

