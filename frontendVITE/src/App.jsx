import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from './store/session'
import { LoginFormPage } from './components'


function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])


  return (
      isLoaded && <LoginFormPage />
  );
}

export default App
