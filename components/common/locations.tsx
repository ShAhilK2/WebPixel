"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import {
  ComposableMap,
  Geographies,
  Geography,
  createLatitude,
  createLongitude,
} from "@vnedyalk0v/react19-simple-maps";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { getLocationAnalytics } from "@/action/analytics";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

const Locations = ({ dateRange }: { dateRange?: DateRange }) => {
  const params = useParams();
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const websiteId = params.websiteId as string;

  const [tooltip, setTooltip] = React.useState<{
    name: string;
    countryCode: string;
    visitors: number;
    x: number;
    y: number;
  } | null>(null);

  const { data: geoData } = useQuery({
    queryKey: ["geo-data"],
    queryFn: async () => {
      const res = await fetch(GEO_URL);
      return res.json();
    },
    staleTime: Infinity,
  });

  const { data, isPending, error } = useQuery({
    queryKey: [
      "locations",
      websiteId,
      dateRange?.from?.toISOString(),
      dateRange?.to?.toISOString(),
    ],
    queryFn: async () => {
      const res = await getLocationAnalytics(
        websiteId,
        dateRange?.from,
        dateRange?.to,
      );
      return res;
    },
    enabled: !!websiteId,
  });

  const locationData = data?.locations || [];

  if (isPending && !data) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="px-6">
          <CardTitle className="text-sm font-semibold">Locations</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-red-500">
            Error loading locations: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (locationData.length === 0) {
    return (
      <Card>
        <CardHeader className="px-6">
          <CardTitle className="text-sm font-semibold">Locations</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-muted-foreground text-sm">
            No location data available for this date range.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle className="text-sm font-semibold">Locations</CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div className="w-full h-[300px]">
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
              scale: 147,
              center: [createLongitude(0), createLatitude(20)],
            }}
            width={800}
            height={300}
            className="w-full h-full"
          >
            {geoData && (
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName =
                    geo.properties?.name || geo.properties?.NAME || "";

                  const countryData = locationData?.find(
                    (s) =>
                      s.name === countryName ||
                      s.name.includes(countryName) ||
                      countryName.includes(s.name),
                  );

                  return (
                    <Geography
                      key={
                        geo.id ||
                        geo.properties?.name ||
                        `geo-${geographies.indexOf(geo)}`
                      }
                      geography={geo}
                      onMouseEnter={(e) => {
                        if (countryData) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            name: countryData.name,
                            visitors: countryData.visitors,
                            countryCode: countryData.code,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: countryData
                            ? "#FA5D19"
                            : isDark
                              ? "#2D2D2D"
                              : "#FFF0E8",
                          fillOpacity: countryData
                            ? (countryData.val / 100) * 0.6 + 0.2
                            : 1,
                          stroke: isDark ? "#404040" : "#E5E5E5",
                          strokeWidth: 0.5,
                          outline: "none",
                          transition: "all 250ms",
                        },
                        hover: {
                          fill: countryData
                            ? "#D94D13"
                            : isDark
                              ? "#3D3D3D"
                              : "#FFE0D1",
                          fillOpacity: countryData ? 0.9 : 1,
                          cursor: countryData ? "pointer" : "default",
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            )}
          </ComposableMap>
        </div>

        {tooltip && (
          <div
            className="fixed z-50 px-3 py-2
          text-sm bg-popover text-popover-foreground
           border border-border rounded-lg shadow-lg
            pointer-events-none"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 60}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              {tooltip.countryCode && (
                <img
                  src={`https://flagsapi.com/${tooltip.countryCode}/flat/64.png`}
                  alt=""
                  className="size-4 rounded-sm"
                />
              )}
              <div className="font-semibold">{tooltip.name}</div>
            </div>
            <div className="text-muted-foreground">
              {tooltip.visitors.toLocaleString()} visitors
            </div>
          </div>
        )}

        {!tooltip && (
          <div className="absolute bottom-4 left-6 text-[10px] text-muted-foreground italic">
            Hover over a highlighted country for details
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Locations;
