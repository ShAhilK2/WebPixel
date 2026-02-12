import { AppCard } from "@/components/app-card";
import Header from "@/components/common/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Hero />
        <AppCard />
      </div>
    </div>
  );
}
