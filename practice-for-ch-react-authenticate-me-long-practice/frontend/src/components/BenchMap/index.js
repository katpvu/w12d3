import { Wrapper } from "@googlemaps/react-wrapper";
const BenchMap = ({ mapOptions, benches, markerEventHandlers, mapEventHandlers }) => {
    const [map, setMap] = useState(null)
    const mapRef = useRef();
    const markers = useRef({})

    useEffect(()=> {
        setMap = google.maps.Map(mapRef, {
            center: {lat: -34, lng: 151},
            zoom: 4,
            ...mapOptions
        })
    }, [])

    useEffect(() => {
        const markerBenchIds = Object.keys(markers);

        benches.forEach(bench => {
            markers[bench.id] = google.maps.Marker({
                position: {
                    lat: bench.lat,
                    lng: bench.lng
                },
                map
            });

            markerBenchIds.forEach(id => {
                if (benches[id] === undefined) markers[id].setMap(null) 
            })
        });
    })

    return (
        <div ref={mapRef}>
            "map"
        </div>
    )
}

const BenchMapWrapper = (props) => {
    return (
        <Wrapper apiKey={REACT_APP_MAPS_API_KEY}>
            <BenchMap props={props} />
        </Wrapper>
    )
}

export default BenchMapWrapper