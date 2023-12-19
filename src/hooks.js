import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/** business logic for flipping any type of card
 * 
 *  doesn't need to take any arguments
 *  @return {Array} an array of two elements: 
 *      the current flip state and the function to toggle the flip state
 */
function useFlip(initialVal = false) {
    // call useState, "reserve piece of state"
    const [isFlipped, setIsFlipped] = useState(initialVal);
    const flip = () => {
        setIsFlipped(oldValue => !oldValue);
    };

    // return piece of state AND a function to flip it
    return [isFlipped, flip];
}

/** consolidated logic for making AJAX requests with axios
 * 
 *  @param URL
 *  @return {Array} an array of two elements:
 *      the array of data obtained from previous AJAX requests,
 *      and the function that adds new data to our array
 */
function useAxios(baseUrl) {
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState(null);

    // use a callback to 'memoise' fetchData function
    // after the first render, fetch data with parameter to append to the base URL
    const fetchData = useCallback(async (param = '') => {
        try {
            const fullUrl = `${baseUrl}${param}`;
            const response = await axios.get(fullUrl);
            setResponses(prevResponses => [...prevResponses, response.data]);
            } catch (err) {
                setError(err);
            }
    }, [baseUrl]); // Dependency array syntax same as in useEffect

    // initial fetch when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [responses, fetchData, error];
}

export { useFlip, useAxios };
