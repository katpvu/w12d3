import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { fetchBench } from "../../store/benches";
import { getBench } from "../../store/benches";
import BenchMapWrapper from "../BenchMap";

const BenchShowPage = props => {
    const { benchId } = useParams();

    const bench = useSelector(getBench(benchId))

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBench(benchId))
    }, [benchId])


    return (
        <div>
            <h1>Bench Show Page</h1>
            <BenchMapWrapper />
            <h2>{bench.title}</h2>
            <section>
                <h3>Details</h3>
                <p>{bench.description}</p>
                <ul>
                    <li>{bench.seating}</li>
                    <li>{bench.lat}</li>
                    <li>{bench.lng}</li>
                </ul>
            </section>
            <Link to="/">Go back to all benches</Link>
        </div>
    )
}

export default BenchShowPage