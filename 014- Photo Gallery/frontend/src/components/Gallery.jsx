import { useState, useEffect } from "react";
import {ImagePlus, ArrowUp, X} from 'lucide-react'
import api from "../api";
import { useVisibility } from "../contexts/visibility";

export default function Gallery(){
    const [photos, setPhotos] = useState([]);
    const [sort, setSort] = useState('filename')
    const [order, setOrder] = useState('asc')
    const [imagePreview, setImagePreview] = useState(null)
    const {setUploadFormVisibility} = useVisibility();

    useEffect(()=>{
        fetchData();
    },[sort, order])
    
    function fetchData(){
        api.get(`/uploads?sort=${sort}&order=${order}`)
        .then((res)=> setPhotos(res.data))
        .catch((err)=> console.log(err))
    }


    function handleDelete(id){
        api.delete(`/uploads/${id}`)
        .then(()=> fetchData())
        .catch((err)=> console.log(err))
        
    }

    return (
        <div className="w-full p-4 flex flex-col justify-center ">
        {/* Options container */}
            <div className="w-full h-12 mb-4  px-4 border border-gray-800 rounded-full shadow-md shadow-black/30 flex items-center justify-between">
                <h1 className="font-bold tracking-wide text-xl ">Sarfraz Gallery</h1>
                <div className="flex gap-3 items-center">
                    <ImagePlus onClick={()=>setUploadFormVisibility(true)} className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-gray-400"/>
                    <select value={sort}
                        onChange={(e)=>setSort(e.target.value)}
                        className=" p-2 rounded-full hover:bg-gray-400 border-noe outline-none bg-transparent">
                            <option value="filename">name</option>
                            <option value="size">size</option>
                            <option value="uploadTime">Time</option>
                            <option value="type">Type</option>
                    </select>
                    <button onClick={()=>setOrder(order==='asc'? 'desc':'asc')}
                        className="flex">
                            <ArrowUp className={`w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-gray-400 rotate-0 transition-all duration-500 ${order==='asc'? '':'rotate-[180deg]'}`}/>
                    </button>
                </div>

            </div>
        {/* Photo Grid section */}
            <div className="flex gap-3 p-3 flex-wrap justify-center items-center">
                {photos.map((d, i)=>(
                    <div key={i} className="relative h-48 w-48 group p-3 border border-gray-600 shadow-md shadow-black/30 rounded-xl hover:shadow-xl hover:shadow-black/30 transition-all duration-300">
                        <div className="overflow-hidden w-[96%] h-[80%]">
                            <img src={`http://localhost:5000/${d.thumbUrl}`} 
                                alt="Preview" 
                                onClick={()=>setImagePreview(d)}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">{d.fileName}</p>
                            <p className="text-sm text-gray-800">{(d.size/(1024*1024)).toFixed(2)}MB</p>
                        </div>
                        <X onClick={()=>handleDelete(d.id)} className="absolute top-1 right-1 rounded-full h-0 w-0 cursor-pointer group-hover:w-6 group-hover:h-6 transition-all duration-300 bg-red-500"/>
                    </div>
                ))}
            </div>
        {/* Preview Section */}
            {imagePreview && <div className="fixed top-0 w-full h-full backdrop-blur-md flex justify-center items-cente">
                <img  src={`http://localhost:5000/${imagePreview.url}`} alt="Image Unavailable" />
                <X  onClick={()=> setImagePreview(null)} className="absolute top-2 right-2 w-8 h-8  hover:bg-red-500 rounded-full p-1"/>
            </div>}
            
        </div>
    )
}