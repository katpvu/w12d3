
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState, useRef, useEffect } from "react";
const BenchMap = ({ mapOptions, benches, markerEventHandlers, mapEventHandlers }) => {
    const [map, setMap] = useState(null)
    const mapRef = useRef();
    const markers = useRef({})

    console.log(benches, "benches")

    useEffect(()=> {
        console.log("hello")
        setMap = new Map(mapRef, {
            center: {lat: -34, lng: 151},
            zoom: 4,
            ...mapOptions
        })
        const mapEventHandlersObject = Object.entries(mapEventHandlers)
        // console.log(mapEventHandlers, "mapeventhandlers")
        mapEventHandlersObject.forEach(event => {
            map.addListener(event[0], event[1])
        })
    }, [])

    useEffect(() => {
        const markerBenchIds = Object.keys(markers);
        const markerEventHandlersObject = Object.entries(markerEventHandlers)
        benches.forEach(bench => {
            const marker = new map.Marker({
                position: {
                    lat: bench.lat,
                    lng: bench.lng
                },
                map
            });
            markerEventHandlersObject.forEach(event => {
                marker.addListener(event[0], event[1])
            })
            markers[bench.id] = marker
            markerBenchIds.forEach(id => {
                if (benches[id] === undefined) markers[id].setMap(null) 
            })
        });
    })

    return (
        <div ref={mapRef}>
            {map}
        </div>
    )
}

const BenchMapWrapper = ({ mapOptions, benches, markerEventHandlers, mapEventHandlers }) => {
    // console.log(props, "props")
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <BenchMap mapOptions={mapOptions} benches={benches} markerEventHandlers={markerEventHandlers} mapEventHandlers={mapEventHandlers} />
        </Wrapper>
    )
}

export default BenchMapWrapper