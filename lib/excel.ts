import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { PartyWithGuests } from "@/types"; // Ensure correct types

export const exportPartiesToExcel = async (parties: PartyWithGuests[]) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Parties & Guests");

    // Define columns
    sheet.columns = [
        { header: "Party Email", key: "email", width: 25 },
        { header: "Guest First Name", key: "firstName", width: 20 },
        { header: "Guest Last Name", key: "lastName", width: 20 },
        { header: "Food Preferences", key: "foodPreferences", width: 30 },
        { header: "Alcohol Preference", key: "alcoholPreference", width: 15 },
        { header: "Will Attend", key: "willAttend", width: 15 },
        { header: "Attend Nuptials", key: "willAttendNuptials", width: 15 },
        { header: "Attend Reception", key: "willAttendReception", width: 15 },
    ];

    // Add rows
    parties.forEach((party) => {
        party.guests.forEach((guest) => {
            sheet.addRow({
                email: party.email,
                firstName: guest.firstName,
                lastName: guest.lastName,
                foodPreferences: guest.foodPreferences || "None",
                alcoholPreference: guest.alcoholPreference ? "Yes" : "No",
                willAttend: guest.willAttend ? "Yes" : "No",
                willAttendNuptials: guest.willAttendNuptials ? "Yes" : "No",
                willAttendReception: guest.willAttendReception ? "Yes" : "No",
            });
        });
    });

    // Create the file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(blob, `parties_guests_${new Date().toISOString().split("T")[0]}.xlsx`);
};