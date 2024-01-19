import {Route, Routes} from "react-router-dom";
// import Navigation from './components/Navigation';
// import Detail from './pages/Detail';
// import Edit from './pages/Edit';
import Home from './pages/home';
import Register from './pages/register'
import Login from './pages/login'
// import Tambah from './pages/Tambah';


const App = () => {
  return (
    <>
    <div>
        <Routes>
          <Route path="/" exact children={() => <Home />} />
          <Route path="/register" element={() => <Register />} />
          <Route path="/login" element={() => <Login />} />

          {/* <Route path="/detail/:productId" element={<Detail />} />
          <Route path="/edit/:productId" element={<Edit />} />
          <Route path="/tambah" element={<Tambah />} /> */}
        </Routes>
    </div>
    </>
  )
}

export default App;
