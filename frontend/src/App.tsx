import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HeaderBody } from './components/Header/HeaderBody/HeaderBody';
import { MovieSearch } from './screens/MovieSearch/MovieSearch';
import { SavedMovies } from './screens/SavedMovies/SavedMovies';
import { MovieState } from './redux/types';
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css'
import styles from './App.module.css';
import { ToastNotifications } from './components/ToastNotifications/ToastNotifications';

function App() {
    const loading = useSelector((state: MovieState) => state.loading);
    return (
    <>
        <Router>
        {loading &&
            <div className={styles.loaderFrame}>
                <div className={styles.loaderContainer}>
                    <ClipLoader color={'#ffffff'} loading={loading} size={150} />
                </div>
            </div>
        }
        <ToastContainer />
        <ToastNotifications />
        <HeaderBody></HeaderBody>
        <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/savedMovies" element={<SavedMovies />} />
            {/* <Route path="/users" element={<Users />} /> */}
        </Routes>
        </Router>
    </>
    )
}

export default App
