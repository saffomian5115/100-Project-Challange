import { X } from 'lucide-react'
import api from '../api'
import { useState } from 'react'
import toast, { Toaster} from 'react-hot-toast'
import { useVisibility } from '../contexts/visibility'

export default function UploadForm(){
    const [files, setFiles] = useState([])
    const [preview, setPreview] = useState([])
    const {uploadFormVisibility, setUploadFormVisibility} = useVisibility();

    function handleFileChange(e){
        const selected = Array.from(e.target.files)
        setFiles(selected);

        const previewUrl = selected.map(file=> URL.createObjectURL(file));
        setPreview(previewUrl)
    }

    function handleUpload(){
        const formData = new FormData();
        files.forEach(f=>formData.append('images',f))
        api.post('/uploads', formData, {headers:{"Content-Type": "multipart/form-data"}})
        .then((res)=> toast.success(res.data.message))
        .catch((err)=> console.log(err))
        setFiles([])
        setPreview([])

    }

    return (
        <div className={`fixed top-0 z-50 backdrop-blur-md w-screen h-screen ${uploadFormVisibility? 'flex':'hidden'} justify-center items-center`}>
            <div className='w-96 backdrop-blur-lg bg-gray-300 p-5 border-2 border-gray-400 rounded-2xl shadow-lg shadow-black'>
                <Toaster></Toaster>
                <X onClick={()=>setUploadFormVisibility(false)} className='absolute top-1 right-1'/>
                <input type="file"
                    multiple
                    onChange={handleFileChange}
                    className='mb-3'
                />
                <div className='mb-3 max-h-80 overflow-auto flex gap-2 flex-wrap'>
                    {preview.map((d, i)=>(
                        <img key={i} 
                            src={d} 
                            alt="preview" 
                            className='w-24 h-24 object-cover rounded-md'
                        />
                    ))}
                </div>
                <button 
                    onClick={handleUpload}
                    disabled={files.length === 0}
                    className='w-full  py-2  bg-blue-900 rounded-xl  disabled:opacity-50'
                >
                    Upload
                </button>
            </div>  
        </div>
    )
}
