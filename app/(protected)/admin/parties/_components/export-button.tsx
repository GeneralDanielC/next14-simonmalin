"use client";

import { Button } from "@/components/ui/button";
import { exportPartiesToExcel } from "@/lib/excel";
import { PartyWithGuests } from "@/types";
import { File } from "lucide-react";

interface ExportButtonProps {
    parties: PartyWithGuests[];
}

export const ExportButton = ({ parties }: ExportButtonProps) => {
    return (
        <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
            onClick={() => exportPartiesToExcel(parties)}
        >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
        </Button>
    );
};