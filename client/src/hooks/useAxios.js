import { useEffect, useState } from 'react'
import axios from 'axios'

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
          if (err.name === 'AbortError') return
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
