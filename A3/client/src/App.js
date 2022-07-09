import './App.css';
import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RecipeBody from './components/RecipeBody';
// import TimeAndDate from './components/TimeAndDate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
function App() {
  return (
    <>
      <Router>
          <div className='container'>
          <Header />
          <Routes>
          
            <Route path='/' element={<RecipeBody />} />

            <Route path='/login' element={<Login />} />
            
            <Route path='/register' element={<Register />} />
          </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
