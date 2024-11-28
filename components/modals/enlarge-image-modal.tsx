"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEnlargeImageModal } from "@/hooks/use-enlarge-image-modal";
import Image from "next/image";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface EnlargeImageModalProps {
    imageUrl: string;
}

export const EnlargeImageModal = ({ imageUrl }: EnlargeImageModalProps) => {
    const enlargeImageModal = useEnlargeImageModal();
    const [loading, setLoading] = useState(true); // Track loading state

    const handleImageLoad = () => {
        setLoading(false); // Set loading to false once the image is loaded
    };

    const handleCloseModal = () => {
        setLoading(true);
        enlargeImageModal.onClose();
    }

    return (
        <Dialog
            open={enlargeImageModal.isOpen}
            onOpenChange={handleCloseModal}
        >
            <DialogContent className="w-full h-full p-3 bg-card-beige rounded-none sm:rounded-lg">
                <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
                    {loading && (
                        <div className="absolute">
                            <ClipLoader color="#000000" size={50} />
                        </div>
                    )}
                    <Image
                        src={imageUrl}
                        alt="flowers"
                        fill
                        className={`object-cover rounded-lg transition-opacity duration-300 ${
                            loading ? "opacity-0" : "opacity-100"
                        }`}
                        loading="eager"
                        onLoad={handleImageLoad} // Handle image load event
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
