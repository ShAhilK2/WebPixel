import { getWebsites } from "@/action/website";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import {
  ChevronDown,
  Globe,
  Check,
  Plus,
  XIcon,
  Code,
  Search,
  Calendar,
  CalendarIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import AddWebsiteDialog from "./add-website-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  endOfDay,
  set,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subYears,
} from "date-fns";
import { InstallationGuide } from "./installation-guide";

type Props = {
  dateRange?: DateRange;
  setDateRange: (range: DateRange) => void;
};

type DateRangePreset =
  | "today"
  | "7days"
  | "30days"
  | "monthToDate"
  | "yearToDate"
  | "last12Months";

const presets: { key: DateRangePreset; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "7days", label: "Last 7 Days" },
  { key: "30days", label: "Last 30 Days" },
  { key: "monthToDate", label: "Month to Date" },
  { key: "yearToDate", label: "Year to Date" },
  { key: "last12Months", label: "Last 12 Months" },
];
const MainTopBar = ({ dateRange, setDateRange }: Props) => {
  const { websiteId } = useParams();
  const router = useRouter();
  const [openWebsiteSelector, setOpenWebsiteSelector] = useState(false);
  const [showInstallationGuide, setShowInstallationGuide] = useState(false);

  const [openDateRangePicker, setOpenDateRangePicker] = useState(false);

  const [activePreset, setActivePreset] =
    useState<DateRangePreset>("monthToDate");

  const { data, isLoading } = useQuery({
    queryKey: ["website", websiteId],
    queryFn: async () => {
      const response = await getWebsites();
      if (response?.error) {
        throw new Error(response.error);
      }
      return response.websites || [];
    },
  });

  const currentWebsite =
    data?.find((w: any) => w.id === websiteId) || data?.[0];

  const handlePresetSelect = (presetkey: DateRangePreset) => {
    const now = new Date();
    let from: Date;
    let to: Date = endOfDay(now);

    switch (presetkey) {
      case "today":
        from = startOfDay(now);
        break;
      case "7days":
        from = startOfDay(subDays(now, 7));
        break;
      case "30days":
        from = startOfDay(subDays(now, 30));
        break;
      case "monthToDate":
        from = startOfMonth(now);
        break;
      case "yearToDate":
        from = startOfYear(now);
        break;
      case "last12Months":
        from = startOfMonth(subYears(now, 12));
        break;
      default:
        from = startOfMonth(now);
        break;
    }
    setDateRange({ from, to });
    setActivePreset(presetkey);
    setOpenDateRangePicker(false);
  };

  return (
    <>
      <div className="w-full flex h-12 items-center justify-between gap-4">
        {/* left */}
        <div className="flex items-center gap-4">
          {/* Website Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <Button
                  variant="ghost"
                  className="gap-2 h-9 border-0 hover:bg-primary/10! text-foreground!"
                >
                  <span className="flex items-center gap-2">
                    <Globe />
                    <span className="font-medium">
                      {currentWebsite?.domain || "Select website"}
                    </span>
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel
                className="text-muted-foreground
              text-xs uppercase
              "
              >
                Websites
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isLoading ? (
                <Spinner />
              ) : (
                data?.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => router.push(`/dashboard/${item.id}`)}
                    className="cursor-pointer flex justify-between items-center"
                  >
                    <span
                      className={cn(
                        "",
                        item.id === websiteId ? "font-semibold" : "",
                      )}
                    >
                      {item.domain}
                    </span>
                    {item.id === websiteId && <Check className="size-4" />}
                  </DropdownMenuItem>
                ))
              )}
              {data?.length === 0 && <div>No Websites found</div>}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setOpen(true)}
                className="cursor-pointer gap-2 text-primary focus:text-primary focus:bg-primary/5 font-medium"
              >
                <Plus className="szie-4" />
                <span>Add new website</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Current Visitors */}
          <div className="flex items-center gap-2 text-sm">
            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-foreground">0 current visitors</span>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-2">
          <Button
            variant={showInstallationGuide ? "secondary" : "ghost"}
            onClick={() => setShowInstallationGuide(!showInstallationGuide)}
            size="sm"
          >
            {showInstallationGuide ? (
              <XIcon className="size-4" />
            ) : (
              <Code className="size-4" />
            )}
            <span>{showInstallationGuide ? "Close" : "Install Script"}</span>
          </Button>
          <span className="flex items-center gap-2 text-foreground ">
            <Search />
            Filter
          </span>
          <Popover
            open={openDateRangePicker}
            onOpenChange={setOpenDateRangePicker}
          >
            <PopoverTrigger asChild>
              <Button
                className="h-9 border-0 bg-secondary text-foreground!"
                variant={"ghost"}
              >
                <CalendarIcon className="size-4" />
                <span>
                  {presets?.find((p) => p.key === activePreset)?.label ||
                    "Select preset"}
                </span>
                <ChevronDown className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="end">
              <div className="space-y-1">
                {presets?.map((preset) => (
                  <Button
                    key={preset.key}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start",
                      activePreset === preset.key
                        ? "bg-primary/10 text-primary"
                        : "",
                    )}
                    onClick={() => handlePresetSelect(preset.key)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <AddWebsiteDialog
        open={openWebsiteSelector}
        onOpenChange={setOpenWebsiteSelector}
      />
      {showInstallationGuide && (
        <InstallationGuide
          domain={currentWebsite?.domain}
          siteId={currentWebsite?.id}
        />
      )}
    </>
  );
};

export default MainTopBar;
