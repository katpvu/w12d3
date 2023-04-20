import { useState } from "react"
import { useDispatch } from "react-redux"

export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue)
    return [value, (e) => { setValue(e.target.value)}]
}

const dispatch = useDispatch();
export const useSubmit = ({ actionCreator, successCallback }) => {


    dispatch(actionCreator)
}