import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBenches } from "../../store/benches";
import BenchList from "../BenchList";

const BenchIndexPage = (props) => {
    const benches = useSelector(state => Object.values(state.benches))
    console.log(benches)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBenches())
        
    }, [dispatch])

    

    return (
        <div>
            <BenchList benches={benches}/>
        </div>
    )
}

export default BenchIndexPage;