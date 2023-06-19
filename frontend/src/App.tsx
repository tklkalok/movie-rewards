import { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HeaderBody } from './components/Header/HeaderBody/HeaderBody';
// import './styles/App.css'

// Define your components
const Home = () => <h2>All Movies</h2>;
const Favorite = () => <h2>Favorite</h2>;
const Users = () => <h2>Users</h2>;

function App() {
  const [count, setCount] = useState(0)

  const [isSending, setIsSending] = useState(false)
  const sendRequest = useCallback(async () => {
    const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)

    await delay(3000);

    console.log("DEBUG: setIsSending(true) called");

    // send the actual request
    const response = await fetch("http://localhost:8000/movies/");
    const data = await response.json();
    console.log(JSON.stringify(data));
    
    // once the request is sent, update state again
    setIsSending(false)
    console.log("DEBUG: setIsSending(false) called");
  }, [isSending]) // update the callback if the state changes

  return (
    <>
      <Router>
        <HeaderBody></HeaderBody>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>IsSending: {!!isSending ? 'True' : 'False'}</p>
        <button onClick={sendRequest}>
          Send Request
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
