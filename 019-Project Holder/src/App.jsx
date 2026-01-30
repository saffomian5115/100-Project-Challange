import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Contact from './components/Contact'
import Login from './components/Login'
import PaymentMethod from './mini projects/PaymentMethod'
import Counter from './mini projects/counter'
import NoticeBoard from './mini projects/NoticeBoard'
import Testing from './mini projects/Testing'
import CounterWithUseEffect from './mini projects/CounterWithUseEffect'
import ApiPostData from './mini projects/ApiPostData'
import { ProtectedRoute, useAppContext } from './contexts/AppContext'
 

function App() {
  const {user} = useAppContext();

  return (
    <>
     <div className='flex flex-col min-h-screen dark:bg-gray-950 dark:text-gray-100'>
      <Header />
      <div className='flex-1 mt-10 '>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route path='PaymentMethod' element={<PaymentMethod />}/>
            <Route path='Counter' element={<Counter />}/>
            <Route path='NoticeBoard' element={<NoticeBoard />}/>
            <Route path='Testing' element={<Testing />}/>
            <Route path='CounterWithUseEffect' element={<CounterWithUseEffect />}/>
            <Route path='ApiPostData' element={<ApiPostData />}/>
          </Route>
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />} />
            
        </Routes>
      </div>

      <Footer />

     </div>
    </>
  )
}

export default App
