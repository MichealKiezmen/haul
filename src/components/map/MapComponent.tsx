"use client"

import React, { useEffect, useState, useRef } from 'react'
import { fetchData } from '@/helper/makeRequests'
import 'leaflet/dist/leaflet.css'

const MapComponent = ({ truck }: any) => {
    const [bounds, setBounds] = useState<any>([])
    const [statesData, setStatesData] = useState(null)
    const mapRef = useRef<any>(null)
    const mapContainerRef = useRef<any>(null)


    const getGEOData = async () => {
        const data = await fetchData('https://raw.githubusercontent.com/MichealKiezmen/US-data/master/us-states.json', true)
        setStatesData(data)
    }

    function getTruckColor(){
        if(truck?.status === "In Transit"){
            return "#00e77b"
        }else if(truck?.status === "Idle"){
            return "#e70034"
        }else{
            return "#B6C4CC"
        }
    }

    useEffect(() => {
        getGEOData()
    }, [])

    useEffect(() => {
        setBounds([truck?.location?.lat, truck?.location?.lng])
        
        if (typeof window !== 'undefined' && statesData && mapContainerRef.current) {

            // Clean up any existing map instance
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }

            import('leaflet').then((L) => {
                // Check if the container already has a map instance
                const mapContainer: any = mapContainerRef.current
                if (!mapContainer || mapContainer._leaflet_id) {
                    // If container already has a map, clear it
                    if (mapContainer) {
                        mapContainer._leaflet_id = null
                        mapContainer.innerHTML = ''
                    }
                }

                let geojson: any

                // Map interactivity and data processing
                function style() {
                    return {
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    }
                }

                function highlightFeature(e: any) {
                    const layer = e.target

                    layer.setStyle({
                        weight: 5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.7
                    });

                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        layer.bringToFront()
                    }
                }

                function resetHighlight(e: any) {
                    geojson.resetStyle(e.target)
                }

                function zoomToFeature(e: any) {
                    mapRef.current.fitBounds(e.target.getBounds())
                }

                function onEachFeature(feature: any, layer: any) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: zoomToFeature
                    })
                }

                let cord: [number, number], zoomLevel: number;
                if (bounds.length > 1) {
                    cord = bounds
                    zoomLevel = 6
                } else {
                    cord = [37.8, -96]
                    zoomLevel = 4;
                }

                try {
                    // Create the map instance
                    mapRef.current = L.map(mapContainerRef.current).setView(cord, zoomLevel);

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                    }).addTo(mapRef.current);

                    if (statesData) {
                        geojson = L.geoJson(statesData, {
                            style,
                            onEachFeature,
                        }).addTo(mapRef.current);
                    }

                        if (bounds.length > 0 && bounds[0] && bounds[1]) {
                        // Truck Marker
                        L.circleMarker(bounds, {
                            radius: 12,
                            fillColor: getTruckColor(),
                            color: '#ffffff',
                            weight: 5,
                            opacity: 1,
                            fillOpacity: 0.8
                        }).addTo(mapRef.current);

                    }


                } catch (error) {
                    console.error("Error initializing map:", error)
                }
            });
        }

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line
    }, [statesData, truck?.status, truck?.location?.lat, truck?.location?.lng])

    return (
        <div ref={mapContainerRef} className='h-[400px] w-full '></div>
    );
};

export default MapComponent;