import { useState } from "react";

export default function Counter(){
    const [count, setCount] = useState(0);
    const increment = () => {
        if(count<50) setCount(count+1)
    }
    const decrement = () => {
        if(count>0) setCount(count-1)
    }
    return (
        <>
        <div className="ml-50 mt-10 flex flex-col">
        <h1 className="text-2xl font-bold">Counter App</h1>
        <div>
            <button onClick={decrement} className="px-3 py-1 bg-gray-500 rounded-2xl text-xl m-4 font-bold active:text-sm">-</button>
            <span>{count}</span>
            <button onClick={increment} className="px-3 py-1 bg-gray-500 rounded-2xl text-xl m-4 font-bold active:text-lg">+</button>
        </div>
        </div>
        </>

    )
}