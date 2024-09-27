"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { PartyWithGuests } from "@/types"

interface SearchPartiesProps {
    parties: PartyWithGuests[];
}

export const SearchParties = ({
    parties = []
}: SearchPartiesProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState<PartyWithGuests[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredItems([]);
        } else {
            const filtered = parties?.filter(party => {
                const emailMatch = party.email.toLowerCase().includes(searchTerm);
                const guestMatch = party.guests.some(guest =>
                    guest.firstName.toLowerCase().includes(searchTerm) ||
                    guest.lastName.toLowerCase().includes(searchTerm)
                );

                return emailMatch || guestMatch;
            });

            setFilteredItems(filtered ?? []);
        }
    }, [searchTerm]);

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <div className="relative w-full">
                <Command className="w-full rounded-lg border shadow">
                    {/* Command Input stays fixed */}
                    <CommandInput
                        placeholder="Search..."
                        value={searchTerm}
                        onInput={handleSearchChange}
                        className="w-full rounded-xl border-none bg-background pl-1 md:w-[200px] lg:w-[336px]"
                    />
                    {/* CommandList positioned absolutely below the input */}
                    <div className="absolute top-full left-0 mt-2 w-full z-10">
                        <CommandList className="max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg">
                            {filteredItems.map(party => (
                                <CommandItem key={party.id}>
                                        <p className="font-semibold">{party.email}</p>
                                        {party.guests?.map(guest => (
                                            <p key={guest.id} className="text-xs">{guest.firstName} {guest.lastName}</p>
                                        ))}
                                </CommandItem>
                            ))}
                            {filteredItems.length === 0 && searchTerm !== "" && (
                                <CommandEmpty className="flex flex-col p-5 justify-center items-center">
                                    <span className="font-bold">Oh no!</span>
                                    <span className="text-xs text-stone-400">No Results.</span>
                                </CommandEmpty>
                            )}

                            {/* <CommandItem>
                                    <div>
                                        <p className="font-semibold">danielcarlsson2002@gmail.com</p>
                                        <p className="text-xs">Daniel Carlsson</p>
                                    </div>

                                </CommandItem> */}
                        </CommandList>
                    </div>
                </Command>
            </div>
        </div>

    )
}
