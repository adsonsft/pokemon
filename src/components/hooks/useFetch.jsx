import { useCallback, useState } from "react"

function useFetch() {
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, options) => {
        let response, responseJSON = null

        try {
            setErr(null)
            setLoading(true)

            response = await fetch(url, options)

            if (!response.ok) throw new Error("Pokemon not found")
                
            responseJSON = await response.json()
            setData(responseJSON)
        } catch (err) {
            setData(null)
            setErr(err.message)
        } finally {
            setLoading(false)
            return {
                response,
                responseJSON
            }
        }
    }, []) 

    return {
        data,
        err,
        loading,
        request
    }
}

export default useFetch