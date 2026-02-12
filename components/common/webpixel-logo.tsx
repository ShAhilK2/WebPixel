import { cn } from "@/lib/utils";
import React from "react";

interface WebPixelLogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const WebPixelLogo = ({
  className,
  showText = true,
  textClassName,
}: WebPixelLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative size-8 flex items-center justify-center">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient
              id="primaryGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF3B30" stopOpacity={1} />
              <stop offset="55%" stopColor="#DC143C" stopOpacity={1} />
              <stop offset="100%" stopColor="#8B0000" stopOpacity={1} />
            </linearGradient>
            <linearGradient
              id="secondaryGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF4757" stopOpacity={1} />
            </linearGradient>
            <linearGradient
              id="accentGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF8A00" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF2D55" stopOpacity={1} />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="innerShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feFlood floodColor="#000000" floodOpacity="0.1" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle with gradient */}
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="url(#primaryGradient)"
            opacity="0.08"
          />

          <circle
            cx="200"
            cy="200"
            r="170"
            fill="url(#primaryGradient)"
            opacity="0.05"
          />

          <circle
            cx="200"
            cy="200"
            r="110"
            fill="none"
            stroke="url(#secondaryGradient)"
            strokeWidth="2"
            opacity="0.18"
          />
          <circle
            cx="200"
            cy="200"
            r="135"
            fill="none"
            stroke="url(#secondaryGradient)"
            strokeWidth="2"
            opacity="0.12"
          />
          <circle
            cx="200"
            cy="200"
            r="155"
            fill="none"
            stroke="url(#secondaryGradient)"
            strokeWidth="2"
            opacity="0.08"
          />

          <path
            d="M 200 45 A 155 155 0 0 1 355 200"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="6"
            opacity="0.22"
            strokeLinecap="round"
          />
          <path
            d="M 70 255 A 155 155 0 0 0 200 355"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="6"
            opacity="0.14"
            strokeLinecap="round"
          />

          {/* Map pin + tracking radar */}
          <g filter="url(#softGlow)">
            <path
              d="M200 86
                 C151 86 112 125 112 174
                 C112 242 200 330 200 330
                 C200 330 288 242 288 174
                 C288 125 249 86 200 86
                 Z"
              fill="url(#primaryGradient)"
              opacity="0.96"
            />
            <path
              d="M200 104
                 C162 104 132 134 132 172
                 C132 227 200 294 200 294
                 C200 294 268 227 268 172
                 C268 134 238 104 200 104
                 Z"
              fill="url(#secondaryGradient)"
              opacity="0.22"
            />

            <circle
              cx="200"
              cy="172"
              r="52"
              fill="none"
              stroke="url(#secondaryGradient)"
              strokeWidth="3"
              opacity="0.35"
            />
            <circle
              cx="200"
              cy="172"
              r="34"
              fill="none"
              stroke="url(#secondaryGradient)"
              strokeWidth="3"
              opacity="0.5"
            />
            <circle
              cx="200"
              cy="172"
              r="16"
              fill="none"
              stroke="url(#accentGradient)"
              strokeWidth="3"
              opacity="0.75"
            />

            <path
              d="M200 172 L 243 150"
              stroke="url(#accentGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 170 142 A 42 42 0 0 1 242 166"
              fill="none"
              stroke="url(#accentGradient)"
              strokeWidth="7"
              opacity="0.22"
              strokeLinecap="round"
            />

            <circle
              cx="200"
              cy="172"
              r="10"
              fill="url(#accentGradient)"
              opacity="0.9"
            />
            <circle cx="200" cy="172" r="4" fill="#FFFFFF" opacity="0.75" />

            <text
              x="200"
              y="186"
              textAnchor="middle"
              fontSize="64"
              fontWeight="800"
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
              fill="#FFFFFF"
              opacity="0.95"
              style={{ letterSpacing: "-0.06em" }}
            >
              W
            </text>
          </g>

          {/* Decorative orbital dots */}
          <circle
            cx="80"
            cy="200"
            r="6"
            fill="url(#accentGradient)"
            opacity="0.8"
            filter="url(#softGlow)"
          />
          <circle
            cx="320"
            cy="200"
            r="6"
            fill="url(#accentGradient)"
            opacity="0.8"
            filter="url(#softGlow)"
          />
          <circle
            cx="200"
            cy="80"
            r="6"
            fill="url(#accentGradient)"
            opacity="0.8"
            filter="url(#softGlow)"
          />
          <circle
            cx="200"
            cy="320"
            r="6"
            fill="url(#accentGradient)"
            opacity="0.8"
            filter="url(#softGlow)"
          />

          {/* Small accent dots */}
          <circle
            cx="120"
            cy="120"
            r="3"
            fill="url(#secondaryGradient)"
            opacity="0.6"
          />
          <circle
            cx="280"
            cy="120"
            r="3"
            fill="url(#secondaryGradient)"
            opacity="0.6"
          />
          <circle
            cx="120"
            cy="280"
            r="3"
            fill="url(#secondaryGradient)"
            opacity="0.6"
          />
          <circle
            cx="280"
            cy="280"
            r="3"
            fill="url(#secondaryGradient)"
            opacity="0.6"
          />
        </svg>
      </div>
      {showText && (
        <span
          className={cn("text-xl font-bold text-foreground", textClassName)}
        >
          WebPixel
        </span>
      )}
    </div>
  );
};

export default WebPixelLogo;
