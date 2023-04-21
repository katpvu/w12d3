import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchBenches } from "../../store/benches";
import BenchList from "../BenchList";
import BenchMapWrapper from "../BenchMap";

const BenchIndexPage = (props) => {
    const benches = useSelector(state => Object.values(state.benches))
    console.log(benches)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchBenches())
    }, [])

    const markerEventHandlers = (e) => ({
        click: (e) => history.push(`/benches/${e.target.id}`)
    })

    const mapEventHandlers = (e) => {
        const latLng = e.latLng.toJSON();
        const queryStringLatLng = new URLSearchParams(latLng).toString();
        return {
            click: (e) => history.push({
                pathname:'/benches/new',
                search: queryStringLatLng
            })
        }
    }

    return (
        <div>
            <BenchMapWrapper benches={benches} markerEventHandlers={markerEventHandlers} mapEventHandlers={mapEventHandlers}/>
            <BenchList benches={benches}/>
        </div>
    )
}

export default BenchIndexPage;