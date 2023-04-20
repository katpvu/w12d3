import { useState } from "react"
import { useDispatch } from "react-redux";
import { createBench } from "../../store/benches";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const BenchFormPage = props => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [seating, setSeating] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLogitude] = useState(0)
    const [errors, setErrors] = useState([])

    if (!sessionUser) return <Redirect to='/login' />
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        const newBench = {
            title, 
            price,
            description,
            seating
        };
        return dispatch(createBench(newBench))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json()
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText])
            })
    }

    return (
        <div>
            <h2>Create a new Bench</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br></br>
                <label>Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <br></br>
                <label>Description
                    <textarea value={description}onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <br></br>
                <label>Seating number:
                    <input type="number" value={seating} onChange={(e) => setSeating(e.target.value)} />
                </label>
                <br></br>

                <label>Latitude
                    <input disabled type="number" value={latitude} />
                </label>

                <label>Longitude
                    <input disabled type="number" value={longitude} />
                </label>

                <button>Submit</button>
            </form>

        </div>
    )
}

export default BenchFormPage