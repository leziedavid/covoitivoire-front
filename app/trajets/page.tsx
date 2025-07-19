"use client";

import { useEffect, useState } from "react";
import { fetchTrips, searchTrips } from "@/api/services/authService";
import { Trip } from "@/types/ApiReponse/trajetResponse";
import TripList from "@/components/home/TripList";
import { Footer } from "@/components/home/Footer";
import Search from "@/components/home/Search";
import Header from "@/components/home/header";
import { Search as Icons } from "lucide-react";

export default function Page() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit] = useState(10);
  const [defaultSearch, setDefaultSearch] = useState<any>(null);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetchTrips(page, limit);
      if (res.data) {
        setTrips(res.data.data);
        setTotalItems(res.data.total);
        setCurrentPage(res.data.page);
      }
    } catch (e) {
      console.error("Erreur fetchTrips:", e);
    } finally {
      setLoading(false);
    }
  };

  const searchWithParams = async (params: any) => {
    try {

      setLoading(true);
      const res = await searchTrips(currentPage, limit, params);
      if (res.data) {
        setTrips(res.data.data);
        setTotalItems(res.data.total);
        setCurrentPage(res.data.page);
          console.log("trips:", res.data.total);
      }
  

    } catch (e) {

      console.error("Erreur searchTrips:", e);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const stored = localStorage.getItem("rideData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDefaultSearch(parsed);
      searchWithParams(parsed); // Si localStorage => recherche

    } else {
      fetchData(currentPage); // Sinon => tous les trajets
    }
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center text-center space-y-4">
          <Icons className="w-10 h-10 animate-spin text-gray-600" />
          <p className="text-gray-600 text-lg font-medium">Recherche des trajets disponibles en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Header />
        <div className={`min-h-[calc(100vh_-_56px)] py-20`}>
          <Search defaultValues={defaultSearch} onSearch={searchWithParams} />
          <TripList trips={trips} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
