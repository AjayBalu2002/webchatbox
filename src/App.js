import { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import './App.css';
import Register from './Register';
import Login from './Login';
import Allcontacts from './Allcontacts';
function App() {
  return (
    <div className="App">
   <Router>
    <Routes>
<Route  path='/register' element={<Register />} />
<Route path='/login' element={<Login />}  />
<Route path='/allcontacts/:idone' element={<Allcontacts />}  />
</Routes>
   </Router>

    </div>
  );
}

export default App;
