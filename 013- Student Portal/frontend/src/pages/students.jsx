import { useState, useEffect } from "react";
import api from '../api'
import {useAuth} from '../contexts/authContext'
import toast, { Toaster } from 'react-hot-toast'
import {User, Mail, Shapes, Plus, Pen, Trash} from 'lucide-react'

export default function Students(){
    const {user} = useAuth();
    const [studentId, setStudentId] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('IT');
    const [students, setStudents] = useState([]);
    const [addHidden, setAddHidden] = useState(false)
    const [editHidden, setEditHidden] = useState(false)


    useEffect(()=>{
        api.get('/students')
        .then((res)=> setStudents(res.data))
        .catch((err)=> toast.error(err.response?.data?.error))
    },[handleAdd, handleEdit])


    function handleAdd(e){
        e.preventDefault()
        api.post('/students', {name, email, department})
        .then((res)=> toast.success(res.data.message))
        .catch((err)=> toast.error(err.response?.data?.error))
        setName('')
        setEmail('')
        setDepartment('IT')
    }

    function showEditHidden(id, name, email, department){
        setStudentId(id);
        setName(name)
        setEmail(email)
        setDepartment(department);
        setEditHidden(!editHidden)
    }

    function handleEdit(e){
        e.preventDefault();
        api.put(`/students/${studentId}`, {name, email, department})
        .then((res)=> toast.success(res.data.message))
        .catch((err)=> toast.error(err.response?.data?.error))
        hideEditHidden();
    }

    function hideEditHidden(){
        setStudentId('');
        setName('')
        setEmail('')
        setDepartment('IT');
        setEditHidden(!editHidden)
    }

    function handleDelete(id){
        api.delete(`/students/${id}`)
        .then((res)=> toast.success(res.data.message))
        .catch((err)=> toast.error(err.response?.data?.error))
    }

    return (
        <div className="tracking-wide">
            <Toaster></Toaster>
            {user.role==='admin'? <div onClick={() => setAddHidden(!addHidden)}
                className={`fixed z-50 right-6 bottom-6 p-2 shadow-md shadow-black rounded-full bg-gray-500 text-black transition-all duration-300 hover:bg-gray-200 ${addHidden? 'rotate-[135deg] -translate-y-2 bg-gray-100':"rotate-0 translate-y-0"}`}>
                    <Plus  />
            </div>:''}
        {/* students table */}
            <div className="w-screen  flex flex-col items-center ">
                <h1 className="text-2xl font-bold mb-4 underline underline-offset-4">Students Data</h1>
                <table className="border-collapse border-gray-500 border-2 rounded-xl backdrop-blur-sm">
                    <thead className="bg-gray-600 hover:bg-gray-600/50 ">
                        <tr>
                            <th className="p-2 border ">Name</th>
                            <th className="p-2 border ">Email</th>
                            <th className="p-2 border ">Department</th>
                            <th className="p-2 border ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, i)=>(
                            <tr key={i} className={`hover:bg-transparent  ${i%2===0? "bg-gray-800":"bg-gray-900"}`}>
                                <td className="p-3 border ">{s.name}</td>
                                <td className="p-3 border ">{s.email}</td>
                                <td className="p-3 border ">{s.department}</td>
                                <td className="p-3 border ">
                                    <div className="flex gap-3">
                                        <button onClick={()=> showEditHidden(s.id, s.name, s.email, s.department)} 
                                        className="p-2  rounded-xl hover:bg-gray-500">
                                            <Pen className="w-4 h-4"/>
                                        </button>
                                        <button onClick={()=> handleDelete(s.id)} 
                                        className="p-2  rounded-xl hover:bg-gray-500">
                                            <Trash className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        {/* add student */}
            <div className={`fixed tracking-wide top-0 w-screen h-screen ${addHidden? 'flex':'hidden'} justify-center items-center`}>
                <form onSubmit={handleAdd} className="w-96 bg-transparent backdrop-blur-xl p-4 rounded-xl border-2 border-gray-200 flex flex-col gap-6 items-center">
                    <h1 className="text-xl font-semibold">Add Student</h1>
                    <div className="relative w-full h-14 border-b-2">
                        <User className="absolute right-1 bottom-3"/>
                        <input type="text"
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="w-[90%] h-full bg-transparent outline-none peer"
                        />
                        <label className="absolute left-1 top-5 pointer-events-none transition-all duration-500 ease-out peer-focus:-top-4 peer-valid:-top-4 ">Name</label>
                    </div>
                    <div className="relative w-full h-14 border-b-2">
                        <Mail className="absolute right-1 bottom-3"/>
                        <input type="email"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-[90%] h-full bg-transparent outline-none peer"
                        />
                        <label className="absolute left-1 top-5 pointer-events-none transition-all duration-500 ease-out peer-focus:-top-4 peer-valid:-top-4 ">Email</label>
                    </div>
                    <div className="relative w-full p-2 border-b-2">
                        <Shapes className="absolute right-1 bottom-3"/>
                        <select value={department}
                            onChange={(e)=> setDepartment(e.target.value)}
                            className="bg-gray-900 outline-none border-2 p-1 rounded-xl ">
                                <option className="" value="IT">IT</option>
                                <option className="" value="CS">CS</option>
                                <option className="" value="Software Engineering">Software Engineering</option>
                        </select>
                    </div>
                    <div className="w-full flex gap-4">
                        <button type="button" onClick={()=> setAddHidden(!addHidden)}  className="w-full p-2 rounded-xl border-2 ">Cancel</button>
                        <button type="submit" className="w-full p-2 rounded-xl border-2 ">Add</button>
                    </div>
                </form>
            </div>
        {/* edit student */}
             <div className={`fixed tracking-wide top-0 w-screen h-screen ${editHidden? 'flex':'hidden'} justify-center items-center`}>
                <form onSubmit={handleEdit} className="w-96 bg-transparent backdrop-blur-xl p-4 rounded-xl border-2 border-gray-200 flex flex-col gap-6 items-center">
                    <h1 className="text-xl font-semibold">Edit Student</h1>
                    <div className="relative w-full h-14 border-b-2">
                        <User className="absolute right-1 bottom-3"/>
                        <input type="text"
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="w-[90%] h-full bg-transparent outline-none peer"
                        />
                        <label className="absolute left-1 top-5 pointer-events-none transition-all duration-500 ease-out peer-focus:-top-4 peer-valid:-top-4 ">Name</label>
                    </div>
                    <div className="relative w-full h-14 border-b-2">
                        <Mail className="absolute right-1 bottom-3"/>
                        <input type="email"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-[90%] h-full bg-transparent outline-none peer"
                        />
                        <label className="absolute left-1 top-5 pointer-events-none transition-all duration-500 ease-out peer-focus:-top-4 peer-valid:-top-4 ">Email</label>
                    </div>
                    <div className="relative w-full p-2 border-b-2">
                        <Shapes className="absolute right-1 bottom-3"/>
                        <select value={department}
                            onChange={(e)=> setDepartment(e.target.value)}
                            className="bg-gray-900 outline-none border-2 p-1 rounded-xl ">
                                <option className="" value="IT">IT</option>
                                <option className="" value="CS">CS</option>
                                <option className="" value="Software Engineering">Software Engineering</option>
                        </select>
                    </div>
                    <div className="w-full flex gap-4">
                        <button type="button" onClick={()=> hideEditHidden()}  className="w-full p-2 rounded-xl border-2 ">Cancel</button>
                        <button type="submit" className="w-full p-2 rounded-xl border-2 ">Edit</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}