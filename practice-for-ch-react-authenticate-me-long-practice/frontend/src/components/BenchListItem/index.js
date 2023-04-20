import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const BenchListItem = ({bench}) => {
    console.log(bench, "from BenchListItem")
    const history = useHistory();

    const handleClick = (e) => {
        history.push(`/benches/${bench.id}`)
    }
    return (
        <div onClick={handleClick}>
            <h3>{bench.title}</h3>
            <p>{bench.price}</p>
        </div>
    )
}

export default BenchListItem