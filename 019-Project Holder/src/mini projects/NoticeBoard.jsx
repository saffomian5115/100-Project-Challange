import { useState } from "react";
import { NoticeBoardData } from '../assets/Data/MiniProjects'


export default function NoticeBoard() {
    const [notice, setNotice ] = useState('');
    const [notices, setNotices] = useState(NoticeBoardData)
    const handleNotice = () => {
        if(notice.trim() !== '') {
            setNotices([...notices, notice])
            setNotice('');
        }
    }

    return (
        <div className="w-screen h-screen bg-gray-700 flex justify-center pt-10">
            <div className="w-lg p-4 bg-purple-400/30 max-h-fit rounded-2xl shadow-2xl shadow-black flex flex-col">
                <div className="p-4 text-xl bg-purple-200 rounded-2xl   ">
                    <ul className="list-disc p-4">
                        {notices.map((n, i) => (
                            <li key={i}>{n}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-center p-4">
                    <input className="p-2 rounded-2xl border-2" 
                    autoFocus
                    type="text" 
                    placeholder="Enter Notice"
                    value={notice}
                    onChange={(e) => setNotice(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNotice()} />
                    <button className="py-2 my-4 rounded-2xl  px-10 font-bold text-xl bg-blue-400" onClick={handleNotice}>Add</button>
                </div>
            </div>
        </div>


    )
}