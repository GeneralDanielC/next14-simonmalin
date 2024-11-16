import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UploadImageForm } from "./_components/upload-image-form";

const GalleryPage = () => {
    return (
        <div>
            {/* Hero-section */}
            <HeroSection heading="Galleri" />
            <Skew
                card={false}
                backgroundColor="bg-rose-300/10"
            >
                <UploadImageForm />
            </Skew>

            <div className="py-28 px-24">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="shadow-none py-10 px-8">
                            <Card className="border-none shadow-lg">
                                <CardContent className="flex flex-col md:flex-row p-4">
                                    <div className="w-full h-full">
                                        <div className="aspect-video relative flex items-center justify-center w-full">
                                            <Image src="/images/IMG_6236.JPG" className="object-cover rounded-xl" fill alt="gallery-image" />
                                        </div>
                                    </div>
                                    <div className="md:max-w-sm">
                                        <CardHeader>
                                            <CardTitle>Daniel Carlsson</CardTitle>
                                            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero.</CardDescription>
                                        </CardHeader>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="shadow-none py-10 px-8">
                            <Card className="border-none shadow-lg">
                                <CardContent className="flex flex-col md:flex-row p-4">
                                    <div className="w-full h-full">
                                        <div className="aspect-video relative flex items-center justify-center w-full">
                                            <Image src="/images/IMG_6236.JPG" className="object-cover rounded-xl" fill alt="gallery-image" />
                                        </div>
                                    </div>
                                    <div className="md:max-w-sm">
                                        <CardHeader>
                                            <CardTitle>Daniel Carlsson</CardTitle>
                                            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero.</CardDescription>
                                        </CardHeader>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>

            <Skew
                backgroundColor="bg-lime-700/10"
                align="right"
                direction="bt"
            >
                <h2 className={cn(southland.className, "text-3xl text-lime-700/60")}>Vår historia</h2>
                <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero. Aliquam placerat tellus nibh, a convallis nibh laoreet ac.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero. Aliquam placerat tellus nibh, a convallis nibh laoreet ac.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi.
                </p>
                <Link href="" className="text-xs font-semibold">Läs mer...</Link>
            </Skew>
        </div>
    );
}

export default GalleryPage;