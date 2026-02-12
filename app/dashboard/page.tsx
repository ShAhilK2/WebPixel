import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="space-y-8 w-full min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Websites</h1>
          <p className="text-muted-foreground text-sm">
            Manage and monitor yout digital footprint across all registered
            domains.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Add Website
        </Button>
      </div>
    </div>
  );
};

export default page;
