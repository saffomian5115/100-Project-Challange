import { useState, useEffect } from "react";
import api from "../api";
import { Plus } from "lucide-react";

export default function Photos(){
    const [files, setFiles] = useState([]);
    const [uploads, setUploads] = useState(null)
    const [uploadHidden, setUploadHidden] = useState(true)

    useEffect(()=>{
        api.get('/uploads')
        .then((res)=> setFiles(res.data))
    },[handleDelete, handleUploads])

    function handleUploads(){
        if(!uploads) alert('select any file first.')
        else {
            const formData = new FormData();
            formData.append('myFile', uploads[0])
            
            api.post('/uploads', formData, {headers:{"Content-Type":"multipart/form-data"}})
            .then((res)=> alert(res.data.message))
            .catch((err)=> alert('err'))
        }    
    }

    function handleDelete(id){
            api.delete(`uploads/${id}`)
        }

    return (
        <div>
            <button onClick={()=>setUploadHidden(!uploadHidden)} className={`fixed right-5 bottom-5 z-50 `}><Plus className={`bg-gray-300 w-10 h-10 p-2 text-black rounded-full transition-all duration-500 ease-out ${uploadHidden? 'rotate-0':'rotate-[135deg]'}  `}/></button>
        {/* get files and preview */}
            <div className="w-screen p-5 flex flex-wrap gap-4 justify-center items-center  ">
                {files?.map(d=>(
                    <div key={d.id} className="relative p-4  backdrop-blur-sm border-2 border-gray-600 rounded-lg flex gap-2">
                        <div className=" left-0 w-20 h-20 mx-4 border  rounded-full overflow-hidden "><img src={`http://localhost:5000/${d.path}`} /></div>
                        <div className="">
                            <h1 className="text-xl font-semibold text-white">{d.size}</h1>
                            <p className="text-gray-300 text-sm">{d.name}</p>
                        </div>
                        <button onClick={()=>handleDelete(d.id)} className="absolute top-0 right-1 text-red-500 ">X</button>
                    </div>
                ))}
            </div>
        {/* uploads files and handle */}
            <div className={`absolute top-0  w-screen min-h-screen backdrop-blur-sm  ${uploadHidden? 'hidden':'flex'} justify-center items-center`}>
                <form onSubmit={handleUploads} className="w-80 p-8 border-2 rounded-xl hover:border-gray-500 shadow-xl shadow-black hover:shadow-gray-600/30  flex flex-col gap-4 items-center">
                    <h1 className="text-2xl font-bold mb-4">Upload File</h1>
                    <input type="file" 
                        onChange={(e)=>setUploads(e.target.files)}
                        className="ml-10 w-3/4 overflow-hidden"
                    />
                    <button type="submit" className="w-full p-2 rounded-xl bg-blue-800 hover:bg-blue-700 font-semibold ">Upload</button>

                </form>
            </div>
        </div>
    )
    
}