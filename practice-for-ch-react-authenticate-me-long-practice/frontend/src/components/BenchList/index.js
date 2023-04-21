import BenchListItem from "../BenchListItem"
import "./index.css"

const BenchList = ( { benches }) => {
    console.log(benches, "from BenchList")
    return (
        <>
            <h1>Benches</h1>
            <div className="bench-list-container">
            {benches.map(bench => (
                <BenchListItem key={bench.id} bench={bench} /> 
            ))}
            </div>
        </>
    )
}

export default BenchList