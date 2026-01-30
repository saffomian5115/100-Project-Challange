import { useState, useEffect } from "react";

export default function CounterWithUseEffect() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('Count Update: ', count); 
    }, [count])
    useEffect(() => {
        console.log('Component Mount.');   
    },[])

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-lg p-4 rounded-2xl shadow-lg bg-sky-400 flex flex-col gap-4 items-center">
                <h1 className="text-gray-900 text-2xl">Counter With UseEffect.</h1>
                <p className="text-gray-700 text-sm">See the result in Inspect Console by press F12</p>
                <h1 className="text-gray-900 text-xl">Count: {count}</h1>
                <div>
                    <button className="px-4 py-2 m-3 rounded-2xl font-bold bg-sky-700 hover:bg-sky-600"
                    onClick={() => setCount(count-1)}>
                        Decrease
                        </button>
                    <button className="px-4 py-2 m-3 rounded-2xl font-bold bg-sky-700 hover:bg-sky-600"
                    onClick={() => setCount(count+1)}>
                        Increment
                        </button>
                </div>
            </div>

        </div>
    )
}