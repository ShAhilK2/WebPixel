"use client";
import { useEffect, useState } from "react";
import {
  endOfDay,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { DateRange } from "react-day-picker";

import dynamic from "next/dynamic";
import { DateRangePreset } from "@/types/date-preset";
import MainTopbar from "@/components/common/main-top-bar";
import AnalyticsChart from "@/components/common/analytics-chart";
import Devices from "@/components/common/devices";
import TopSources from "@/components/common/top-source";
import TopPages from "@/components/common/top-pages";

const Locations = dynamic(() => import("@/components/common/locations"), {
  ssr: false,
});

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [activePreset, setActivePreset] =
    useState<DateRangePreset>("monthToDate");

  useEffect(() => {
    handlePresetSelect("monthToDate");
  }, []);

  const handlePresetSelect = (presetKey: DateRangePreset) => {
    const now = new Date();
    let from: Date;
    let to: Date = endOfDay(now);

    switch (presetKey) {
      case "today":
        from = startOfDay(now);
        break;
      case "7days":
        from = startOfDay(subDays(now, 6));
        break;
      case "30days":
        from = startOfDay(subDays(now, 29));
        break;
      case "monthToDate":
        from = startOfMonth(now);
        break;
      case "yearToDate":
        from = startOfYear(now);
        break;
      case "last12Months":
        from = startOfMonth(subMonths(now, 12));
        break;
      default:
        from = startOfMonth(now);
        break;
    }

    setDateRange({ from, to });
    setActivePreset(presetKey);
  };

  return (
    <div className="w-full flex flex-col dpace-y-1">
      <MainTopbar
        activePreset={activePreset}
        onPresetSelect={handlePresetSelect}
      />

      <div className="w-full space-y-4 pb-4">
        <AnalyticsChart dateRange={dateRange} />
        <div
          className="grid
         grid-cols-1 lg:grid-cols-2 gap-4
        "
        >
          <Locations dateRange={dateRange} />
          <Devices dateRange={dateRange} />
        </div>
        <div
          className="grid
        grid-cols-1 lg:grid-cols-2 gap-4
        "
        >
          <TopSources dateRange={dateRange} />
          <TopPages dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
};

export default Page;
