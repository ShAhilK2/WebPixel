import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-full bg-muted py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Easy to use and privacy-friendly{" "}
          <span className="text-primary">Google Analytics alternative</span>
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          WebPixel is Powerful, intuitive and lightweight analytics. No cookies
          just insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button>Get Started</Button>
          <Button variant="outline" asChild>
            <a href="#">Live Demo</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
