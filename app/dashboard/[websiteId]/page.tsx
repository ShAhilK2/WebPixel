"use client";

import MainTopBar from "@/components/common/main-top-bar";
import { startOfMonth } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const page = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <div className="w-full flex flex-col space-y-1">
      {/* Main Top */}
      <MainTopBar dateRange={dateRange} setDateRange={setDateRange} />
      <div className="w-full space-y-4  pb-4">
        {/* Analytics Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Locations */}
          <div>Location</div>
          {/*  Devices*/}
          <div>Devices</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Sources  */}
        <div>Top Sources</div>
        {/*  Top Pages*/}
        <div>Top Pages</div>
      </div>
    </div>
  );
};

export default page;
