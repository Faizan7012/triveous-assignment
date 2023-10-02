import {Route,Routes} from 'react-router-dom'
import Home from '../Page/Home'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import FavoriteNewsPage from '../Components/FavoriteNewsPage'
import PrivateRoute from '../Components/PrivateRoute'
import Single from '../Page/Single'
const AllRoutes = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path="favorites" element={<PrivateRoute><FavoriteNewsPage/></PrivateRoute>} />
    <Route path="singlenews" element={<PrivateRoute><Single /></PrivateRoute>} />
    </Routes>
    </>
  )
}

export default AllRoutes