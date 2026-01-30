import { useAppContext } from "../contexts/AppContext"

export default function Login() {
    const {user, toggleUser} = useAppContext();

    return (
        <div className="w-screen min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 flex justify-center items-center">
            <button
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-2xl text-xl font-bold"
            onClick={toggleUser}>
                {(user.isLogin)? 'Log Out':'Log In'}
            </button>
        </div>
    )
    
}