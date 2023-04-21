import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './index.css'
const BenchListItem = ({bench}) => {
    console.log(bench, "from BenchListItem")
    const history = useHistory();

    const handleClick = (e) => {
        history.push(`/benches/${bench.id}`)
    }
    return (
        <div onClick={handleClick} className="bench-item-container">
            <h3 className="bench-title">{bench.title}</h3>
            <p>{bench.price}</p>
        </div>
    )
}

export default BenchListItem