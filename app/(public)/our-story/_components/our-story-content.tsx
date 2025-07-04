"use client"

import { ModalProvider } from "@/components/providers/modal-provider";
import { useEnlargeImageModal } from "@/hooks/use-enlarge-image-modal";
import Image from "next/image";
import { useState } from "react";

export const OurStoryContent = () => {
    const enlargeImageModal = useEnlargeImageModal();

    const [imageUrl, setImageUrl] = useState<string | undefined>();

    const handleOpenImageModal = (imageUrl: string) => {
        setImageUrl(imageUrl);
        enlargeImageModal.onOpen();
    }

    return (
        <div className="py-36 w-full h-full flex flex-col gap-y-12 justify-center items-center">
            {/* text-section */}
            <div className="max-w-[400px] w-full px-6">
                <h2 className="text-4xl mb-2">5 juni 2018</h2>
                <p>2017 började Simon industriell ekonomi och Malin medicinsk teknik på KTH. Efter ett år av plugg var det dags för tentapubklubb på industriell ekonomis sektionslokal I-stället. Malin och hennes KTH-klasskompis Klara drog till I-stället där de sprang på Klaras gymnasieklasskompis Simon.</p>
            </div>
            {/* images-section */}
            <div className="max-w-[400px] flex flex-col gap-y-2 justify-center items-center px-6 h-auto">
                <Image
                    onClick={() => handleOpenImageModal("/images/our-story/IMG_0001.jpg")}
                    src="/images/our-story/IMG_0001.jpg"
                    className="rounded-md shadow-lg"
                    width={400}
                    height={400}
                    alt="Malin & Simon"
                />
                {/* <span className="italic text-xs">Bildbeskrivning</span> */}
            </div>
            {/* text-section */}
            <div className="max-w-[400px] w-full px-6">
                <h2 className="text-4xl mb-2">24 juli 2018</h2>
                <p>Två veckors intensivt dejtande pausades av att Simon åkte till Centralamerika för att backpacka och Malin till västkusten. En förtida hemresa för Simon från Guatemala på grund av ett förstört pass gjorde att dejtandet kunde återupptas i Lysekil. Den 24 juli blev de pojk- och flickvän. Och till hösten flyttade Simon in hos Malin i ettan på Vanadisvägen.</p>
            </div>
            {/* text-section */}
            <div className="max-w-[400px] w-full px-6">
                <h2 className="text-4xl mb-2">24 juni 2023</h2>
                <p>Med sina examensbevis utfärdade från KTH så flyttade Malin och Simon 2022 till Köpenhamn. Den 24 juni sommaren därpå friade Simon (efter mycket diamant- och ringkonsultation av Malins syster Sofia) under en morgonpromenad på stranden i Sète.</p>
            </div>
            {/* images-section */}
            <div className="max-w-[400px] flex flex-col gap-y-2 justify-center items-center px-6 h-auto">
                <div className="w-full h-full flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <Image
                        onClick={() => handleOpenImageModal("/images/our-story/IMG_1723.jpg")}
                        src="/images/our-story/IMG_1723.jpg"
                        className="rounded-md shadow-lg w-[300px] sm:w-[200px]"
                        width={200}
                        height={200}
                        alt="Malin & Simon"
                    />
                    <Image
                        onClick={() => handleOpenImageModal("/images/our-story/IMG_1717.jpg")}
                        src="/images/our-story/IMG_1717.jpg"
                        className="rounded-md shadow-lg w-[300px] sm:w-[200px]"
                        width={200}
                        height={200}
                        alt="Malin & Simon"
                    />
                    <Image
                        onClick={() => handleOpenImageModal("/images/our-story/IMG_1708.jpg")}
                        src="/images/our-story/IMG_1708.jpg"
                        className="rounded-md shadow-lg w-[300px] sm:w-[200px]"
                        width={200}
                        height={200}
                        alt="Malin & Simon"
                    />
                </div>
                {/* <span className="italic text-xs">Bildbeskrivning</span> */}
            </div>
            {/* text-section */}
            <div className="max-w-[400px] w-full px-6">
                <h2 className="text-4xl mb-2">24 maj 2025</h2>
                <p>To be continued.</p>
            </div>
            <ModalProvider imageUrl={imageUrl} />
        </div>
    )
}