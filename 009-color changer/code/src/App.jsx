import { useState } from 'react'
import './App.css'

function App() {
  let [bg, setbg] = useState('black')
  

  return (
    <>
      <div className='w-full h-screen' style={{background: bg}}>
        <div className='w-[60%] fixed place-content-center bottom-10 left-1/5   rounded-xl flex flex-wrap '>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'black'}} 
          onClick={() => setbg('black')}>
            black
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'silver'}} 
          onClick={() => setbg('silver')}>
            silver
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'gray'}} 
          onClick={() => setbg('gray')}>
            gray
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'maroon'}} 
          onClick={() => setbg('maroon')}>
            maroon
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'red'}} 
          onClick={() => setbg('red')}>
            red
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'purple'}} 
          onClick={() => setbg('purple')}>
            purple
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'fuchsia'}} 
          onClick={() => setbg('fuchsia')}>
            fuchsia
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'green'}} 
          onClick={() => setbg('green')}>
            green
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'lime'}} 
          onClick={() => setbg('lime')}>
            lime
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'olive'}} 
          onClick={() => setbg('olive')}>
            olive
          </button>
          <button className=' px-3 m-1  border-none py-2 rounded-xl ' 
          style={{background: 'yellow'}} 
          onClick={() => setbg('yellow')}>
            yellow
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'navy'}} 
          onClick={() => setbg('navy')}>
            navy
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'blue'}} 
          onClick={() => setbg('blue')}>
            blue
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'teal'}} 
          onClick={() => setbg('teal')}>
            teal
          </button>
          <button className=' px-3 m-1 text-white border-none py-2 rounded-xl ' 
          style={{background: 'aqua'}} 
          onClick={() => setbg('aqua')}>
            aqua
          </button>
          <button className=' px-3 m-1 border-none py-2 rounded-xl ' 
          style={{background:'white'}} 
          onClick={() => setbg(`rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`)}>
            ????
          </button>
        </div>
         
      </div>
    </>
  )
}

export default App
