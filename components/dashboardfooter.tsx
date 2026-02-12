import React from "react";
import WebPixelLogo from "./common/webpixel-logo";

const DashboardFooter = () => {
  return (
    <footer className="w-full py-4 px-4 border-t border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <WebPixelLogo showText={false} className="opacity-60" />
        <span className="text-sm text-muted-background">
          © {new Date().getFullYear()} WebPixel.ai
        </span>
      </div>
      <span className="text-sm text-muted-background">Privacy Policy</span>
    </footer>
  );
};

export default DashboardFooter;
