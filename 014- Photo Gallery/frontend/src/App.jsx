import Gallery from "./components/Gallery"
import UploadForm from "./components/uploadForm"

function App() {

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-t from-white to-gray-400 flex items-center flex-col">
        <h1 className="text-center p-5 text-3xl font-bold underline underline-offset-4 mb-4">Photo Gallery</h1>
        <UploadForm/>
        <Gallery/>
      </div>
      
    </>
  )
}

export default App
