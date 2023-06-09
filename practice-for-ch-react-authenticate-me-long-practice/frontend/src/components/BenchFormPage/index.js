import { useState } from "react"
import { useDispatch } from "react-redux";
import { createBench } from "../../store/benches";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import './index.css'
import { useInput, useSubmit } from "../../hooks/index"

const BenchFormPage = props => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const [title, onTitle] = useInput("");
    const [price, onPrice] = useInput(0);
    const [description, onDescription] = useInput("");
    const [seating, onSeating] = useInput(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLogitude] = useState(0)
    const [errors, setErrors] = useState([])

    if (!sessionUser) return <Redirect to='/login' />
    
    // const [errors, onSubmit] = useSubmit({
    //     createAction: () => {
    //         const newBench = {
    //             title: title, 
    //             price: price,
    //             description: description,
    //             seating: seating
    //         };

    //         return createBench(newBench)
    //     },
    //     onSuccess: () => history.push('/')
    // })

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBench = {
            title: title, 
            price: price,
            description: description,
            seating: seating
        };
        dispatch(createBench(newBench))
            //.then(history.push("/")) // redirect to home page is successful response
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json()
                } catch {
                    console.log("errors have appeared")
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors); // if in an object, key into errors
                else if (data) setErrors([data]); // if error is returned as a text
                else setErrors([res.statusText])
            });
    }

    return (
        <div>
            <h2>Create a new Bench</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error} className="error-message">{error}</li>)}
                </ul>
                <label>Title:
                    <input type="text" value={title} onChange={onTitle} />
                </label>
                <br></br>
                <label>Price:
                    <input type="number" value={price} onChange={onPrice} />
                </label>
                <br></br>
                <label>Description
                    <textarea value={description} onChange={onDescription}></textarea>
                </label>
                <br></br>
                <label>Seating number:
                    <input type="number" value={seating} onChange={onSeating} />
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