import { useState, useEffect } from 'react';
const useFetch = (url, method = "GET") => {
    const [datas, setDatas] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    let [options, setOptions] = useState(null)
    // using the useCallback hook  for specific rendering 
    // const fetchData = useCallback(async () => {
    //     const response = await fetch(url);
    //     const data = await response.json()
    //     setDatas(data);
    const postData = data => {
        setOptions({
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })

        });
        console.log('i was called');
    }

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async (options) => {
            setIsPending(true);
            try {
                const response = await fetch(url, { ...options, signal: controller.signal });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setIsPending(false);
                setDatas(data);
                setError(null);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch was aborted');
                }
                else {
                    setError('Couldnt fetch the data');
                    setIsPending(false);
                }

            }
        }

        if (method === 'GET') {
            fetchData();

        }

        if (method === 'POST' && options) {
            console.log('I was callled herein method check');
            fetchData(options);
        }
        return () => {
            controller.abort();
        }
    }, [url, options, method])

    return { data: datas, isPending, error, postData, setError }
}
export default useFetch;   