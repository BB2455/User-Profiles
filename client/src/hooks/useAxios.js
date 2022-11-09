import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (url) => {
      setLoading(true)
      try {
        const res = await fetch(url, { signal: controller.signal })
        const data = await res.json()
        setData(data)
        setError(null)
      } catch (error) {
        if (error.name === 'AbortError') return
        setError(error.message)
      }
      setLoading(false)
    }
    fetchData(url)
    return () => controller && controller.abort()
  }, [url])

  return { data, loading, error }
}

// export default useFetch

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || 'http://localhost:3000'

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = () => {
      axios[method](url, JSON.parse(headers), JSON.parse(body), {
        signal: controller.signal,
      })
        .then((res) => {
          setResponse(res.data)
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setloading(false)
        })
    }
    fetchData()
    return () => controller && controller.abort()
  }, [method, url, body, headers])

  return { response, error, loading }
}

export default useAxios
