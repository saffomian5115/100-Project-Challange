import {useEffect, useState} from "react";
import api from '../api'
import { Plus, PenIcon, Pen, Trash } from "lucide-react"
import { useAuth } from "../contexts/authContext";
import toast, { Toaster } from "react-hot-toast";

export default function Announcements(){
    const {user} = useAuth();
    const [annoucements, setAnnoucements] = useState([]);
    const [announcementId, setAnnouncementId] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [hidden, setHidden] = useState(true)
    const [editHidden, setEditHidden] = useState('hidden');
    useEffect(()=>{
        api.get('/announcements')
        .then((res)=>{
            setAnnoucements(res.data.result)
        })
        .catch((err)=>{
            const msg = err.response?.data?.error || 'something went wrong';
            console.error(msg); 
        })
    },[handleAdd, handleEdit])

    function handleAdd(e){
        e.preventDefault();
        api.post('/announcements', {title, message})
        .then((res)=>{
            toast.success(res.data.message)
            setTitle('')
            setMessage('')
        })
        .catch((err)=>{
            const msg = err.response?.data?.error || 'something went wrong';
            toast.error(msg)  
        })
    }

    function showEdit(id, title, message){
        setTitle(title)
        setMessage(message)
        setAnnouncementId(id);
        setEditHidden('flex') 
    }

    function hideEdit(){
        setTitle('')
        setMessage('')
        setAnnouncementId('');
        setEditHidden('hidden') 
        
    }

    function handleEdit(e){
        e.preventDefault();
        api.put(`/announcements/${announcementId}`, {title, message})
        .then((res)=> toast.success(res.data.message))
        .catch((err)=> toast.error(err.response?.data?.error))
        hideEdit();
    }

    function handleDelete(id){
        api.delete(`/announcements/${id}`)
        .then((res)=> toast.success(res.data.message))
        .catch((err) => toast.error(err.response?.data?.error));
    }

    return (
        // Main Page
        <div className="tracking-wide">
            <Toaster></Toaster>
            {user.role === 'admin'? <div className="fixed z-50 right-6 bottom-6">
                <button 
                    onClick={()=>setHidden(!hidden)}
                    className={`${hidden? 'rotate-0 transition-all duration-1000 ease-in-out':"rotate-[135deg] transition-all duration-1000 ease-in-out"} p-2 bg-sky-400 active:bg-sky-600 text-black shadow-[0_0_10px_5px_rgba(0,0,0,0.7)] transition-all duration-300  hover:-translate-y-2 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] rounded-full `}>
                    <Plus/>
                </button>
            </div>:''}
        {/* Announcements Cards */}
            <div className="announcements-card-container grid grid-cols-3">
                <p className="col-span-3 text-center text-2xl text-bold underline underline-offset-4">Annoucements</p>
                {annoucements?.map((d, i)=>(
                    <div key={i} className={` relative ${i%2 === 0? "bg-gray-900":"bg-gray-950"}   backdrop-blur-sm p-3 m-2 rounded-xl border-2 border-gray-500/50 hover:border-gray-500`}>
                        <h1 className="text-xl font-semibold">{d.title}</h1>
                        <p className="font-medium text-gray-200">{d.message}</p>
                        <div className={` border-2 rounded-xl px-2 m-1 w-fit bottom-0 left-0 ${user.role==='admin'? "block":"hidden"}`}>
                            <button onClick={() => showEdit(d.id, d.title, d.message)}
                                className=" p-2 rounded-xl hover:bg-gray-500">
                                    <Pen className="w-5 h-5"/>
                            </button>
                            <button onClick={()=>handleDelete(d.id)}  
                                className=" p-2 rounded-xl hover:bg-gray-500">
                                    <Trash className="w-5 h-5"/>
                            </button>
                        </div>
                        <label className="absolute right-1 bottom-2 text-sm font-light text-gray-300">{(d.date)}</label>
                    </div>
                ))}   
            </div>
        {/* Add announcements */}
            <div  className={`fixed top-0 z-10 w-screen min-h-screen ${hidden? 'hidden':'flex'} justify-center items-center`}>
                <div  className="add-new-announcement-container   m-6 flex justify-center items-center">
                    <form onSubmit={handleAdd} className="w-96 p-4 flex flex-col gap-8 items-center border-2 rounded-2xl backdrop-blur-xl" >
                        <h1 className="text-xl font-bold">Add Announcement</h1>
                        <div className="relative w-full border-b-2">
                            <input 
                                type="text"
                                required
                                value={title} 
                                onChange={(e)=>setTitle(e.target.value)}
                                className="w-[90%] m-4 bg-transparent outline-none peer"/>
                            <label className="absolute left-1 bottom-3 pointer-events-none transition-all duration-500 peer-focus:bottom-14 peer-valid:bottom-14">Title</label>
                        </div>
                        <div className="relative w-full border-b-2">
                            <textarea  
                                required 
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                className="w-[90%] m-4 resize-none bg-transparent outline-none peer"/>
                            <PenIcon className="absolute left-1 top-6 pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-valid:-top-4"/>
                        </div>
                        <div className="flex w-full gap-4 p-4 text-black">
                            <button type="button" onClick={()=>setHidden(!hidden)} className="w-1/2 p-2 font-bold rounded-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600">Cancel</button>
                            <button type="submit" className="w-1/2 p-2 font-bold rounded-full bg-blue-700 hover:bg-blue-600 active:bg-blue-500">Add</button>
                        </div>         
                    </form>

                </div>
            </div>
        {/* Edit announcement */}
            <div  className={`absolute top-0 z-10 w-screen h-screen ${editHidden} justify-center items-center`}>
                <div  className="edit-announcement-container   m-6 flex justify-center items-center">
                    <form onSubmit={handleEdit} className="w-96 p-4 flex flex-col gap-8 items-center border-2 rounded-2xl backdrop-blur-xl" >
                        <h1 className="text-xl font-bold">Edit Announcement</h1>
                        <div className="relative w-full border-b-2">
                            <input 
                                type="text"
                                required
                                value={title} 
                                onChange={(e)=>setTitle(e.target.value)}
                                className="w-[90%] m-4 bg-transparent outline-none peer"/>
                            <label className="absolute left-1 bottom-3 pointer-events-none transition-all duration-500 peer-focus:bottom-14 peer-valid:bottom-14">Title</label>
                        </div>
                        <div className="relative w-full border-b-2">
                            <textarea  
                                required 
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                className="w-[90%] m-4 resize-none bg-transparent outline-none peer"/>
                            <PenIcon className="absolute left-1 top-6 pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-valid:-top-4"/>
                        </div>
                        <div className="flex w-full gap-4 p-4 text-black">
                            <button type="button" onClick={hideEdit} className="w-1/2 p-2 font-bold rounded-full bg-blue-700 hover:bg-blue-600 active:bg-blue-500">Cancel</button>
                            <button type="submit" className="w-1/2 p-2 font-bold rounded-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600">Submit</button>
                        </div>
                            
                    </form>

                </div>
            </div>
        </div>
    )
}