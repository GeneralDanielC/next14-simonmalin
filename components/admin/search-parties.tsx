"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { PartyWithGuests } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift } from "@prisma/client"

interface SearchPartiesProps {
    parties: PartyWithGuests[];
    gifts: Gift[];
}

export const SearchParties = ({
    parties = [],
    gifts = [],
}: SearchPartiesProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredParties, setFilteredParties] = useState<PartyWithGuests[]>([]);
    const [filteredGifts, setFilteredGifts] = useState<Gift[]>([]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredParties([]);
            setFilteredGifts([]);
        } else {
            const filteredPart = parties?.filter(party => {
                const emailMatch = party.email.toLowerCase().includes(searchTerm);
                const guestMatch = party.guests.some(guest =>
                    `${guest.firstName.toLowerCase()} ${guest.lastName.toLowerCase()}`.includes(searchTerm)
                );

                return emailMatch || guestMatch;
            });

            const filteredGif = gifts?.filter(gift => gift.title.toLowerCase().includes(searchTerm));

            setFilteredParties(filteredPart ?? []);
            setFilteredGifts(filteredGif ?? []);
        }
    }, [searchTerm, parties, gifts]);

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
                        <CommandList className="max-h-[300px] overflow-y-auto bg-accent shadow-lg rounded-lg">
                            {searchTerm !== "" && (
                                <div>
                                    {/* Parties & Guests Section */}
                                    <CommandGroup heading="Parties & Guests">
                                        {filteredParties.length > 0 ? (
                                            filteredParties.map(party => (
                                                <CommandItem key={party.id} value={party.email}>
                                                    <Link href={`/admin/parties/${party.id}`} className="w-full">
                                                        <div className="flex flex-row justify-between items-center w-full">
                                                            <div>
                                                                <p className="font-semibold">{party.email}</p>
                                                                {party.guests?.map(guest => (
                                                                    <p key={guest.id} className="text-xs">
                                                                        {guest.firstName} {guest.lastName}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                            <ChevronRight />
                                                        </div>
                                                    </Link>
                                                </CommandItem>
                                            ))
                                        ) : (
                                            <CommandEmpty className="flex flex-col p-5 justify-center items-center">
                                                <span className="font-bold">No Parties or Guests Found</span>
                                            </CommandEmpty>
                                        )}
                                    </CommandGroup>

                                    {/* Gifts Section */}
                                    <CommandGroup heading="Gifts">
                                        {filteredGifts.length > 0 ? (
                                            filteredGifts.map(gift => (
                                                <CommandItem key={gift.id} value={gift.title}>
                                                    <Link href={`/admin/registry`} className="w-full">
                                                        <div className="flex flex-row justify-between items-center w-full">
                                                            <div>
                                                                <p className="font-semibold">{gift.title}</p>
                                                            </div>
                                                            <ChevronRight />
                                                        </div>
                                                    </Link>
                                                </CommandItem>
                                            ))
                                        ) : (
                                            <CommandEmpty className="flex flex-col p-5 justify-center items-center">
                                                <span className="font-bold">No Gifts Found</span>
                                            </CommandEmpty>
                                        )}
                                    </CommandGroup>
                                </div>
                            )}
                            {filteredParties.length === 0 && filteredGifts.length === 0 && searchTerm !== "" && (
                                <CommandEmpty className="flex flex-col p-5 justify-center items-center">
                                    <span className="font-bold">Oh no!</span>
                                    <span className="text-xs text-stone-400">No Results.</span>
                                </CommandEmpty>
                            )}
                        </CommandList>
                    </div>
                </Command>
            </div>
        </div>

    )
}
