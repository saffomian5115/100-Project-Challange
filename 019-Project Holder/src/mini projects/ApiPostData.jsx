import { useEffect, useState } from "react";

export default function ApiPostData(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
            setLoading(false);
        })
        .catch((err) => {
            console.log('error fetching data: ', err);
            setLoading(false)   
        });
    }, [])

    if(loading) return <p>Loading...</p>;
    else return (
        <div className="w-screen min-h-screen p-4 bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
            <h2 className="text-2xl font-bold">Posts Data:</h2>
            <ul className="list-disc pl-5">
                {posts.map((p) => (
                    <li key={p.id}>
                        <p className="font-bold text-xl">{p.title}</p>
                        <p>{p.body}</p>
                    </li>
                ))}
            </ul>
            


        </div>
    )
}