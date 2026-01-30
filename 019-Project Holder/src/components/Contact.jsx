import { useState } from "react"

export default function Contact() {
    const [formData, setFormData] =  useState({name:'', email:''}) 
    const changeHandle = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
        
    }
        
    return (
        <form className="flex flex-col max-w-sm mx-auto p-25 bg-sky-200 rounded-2xl">
            <h1 className="font-bold pb-1">Sarfraz Pro-Dev</h1>
            <p className="text-sm text-gray-600">Fill the form to contact</p>
            <input className="px-3 border-2 py-1 mt-2 rounded-full" 
            placeholder="Name" 
            type="text"
            name='name'
            onChange={changeHandle} />
            <input className="px-3 border-2 py-1 my-2 rounded-full" 
            placeholder="Email" 
            type="email"
            name='email' 
            onChange={changeHandle}/>
            <textarea  className="p-3 border-2" placeholder="Message" name="" id=""></textarea>
            <button rows={2} className="px-4 w-fit mx-auto py-1 block  bg-blue-400 hover:bg-blue-600 active:bg-blue-900 rounded-2xl mt-4">Submit</button>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
        </form>
    )
}