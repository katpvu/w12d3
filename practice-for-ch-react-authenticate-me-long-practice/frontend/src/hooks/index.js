import { useState } from "react"
import { useDispatch } from "react-redux"

export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue)
    return [value, (e) => { setValue(e.target.value)}]
}

export const useSubmit = (object) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(object.createAction)
            .then(object.onSuccess)
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
            })
    }
    return [errors, onSubmit]
};