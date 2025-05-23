import { useState } from "react";

export function useFetch(){
    const[data , setData] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useFetch(() => {
        fetch(url)
            .then((response) => response.json)
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error }
}