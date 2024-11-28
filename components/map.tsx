"use client"

import { cn } from "@/lib/utils";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_APP_MAPBOX_KEY || "";

interface MapProps {
    coordinates: [number, number]
    isGoogleCoordinates: boolean
    zoom?: number
    classNames?: string
}

export const Map = ({
    coordinates: inputCoordinates,
    isGoogleCoordinates,
    zoom = 12,
    classNames,
}: MapProps) => {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const coordinates: [number, number] = isGoogleCoordinates
        ? [inputCoordinates[1], inputCoordinates[0]] // Reverse if in Google format
        : inputCoordinates;

    useEffect(() => {
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/dcarlsson/cm1gvrcwg003e01r2c1x01tt9',
                center: coordinates, // Longitude, Latitude
                zoom,
                attributionControl: false,
            });

            map.on('load', () => {
                map.loadImage('/images/pin.png', (error, image) => {
                    if (error) {
                        console.error('Error loading image:', error);
                        return;
                    }

                    if (image) {
                        map.addImage('custom-marker', image);

                        map.addSource('marker-source', {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Point',
                                            coordinates,
                                        },
                                        properties: {},
                                    },
                                ],
                            },
                        });

                        map.addLayer({
                            id: 'marker-layer',
                            type: 'symbol',
                            source: 'marker-source',
                            layout: {
                                'icon-image': 'custom-marker',
                                'icon-size': 0.065, // Adjust size
                                'symbol-z-order': 'source', // Ensures labels are not obscured
                            },
                        });
                    }
                });
            });

            return () => {
                map.remove();
            };
        }
    }, []);

    return (
        <div ref={mapContainerRef} style={{ borderRadius: "9px" }} className={cn("w-full h-full rounded-lg overflow-hidden", classNames)}></div>
    )
}