import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from './store/session'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return <h1>App</h1>
}

export default App
