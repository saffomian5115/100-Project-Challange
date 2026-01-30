export default function PaymentMethod(){
    return (
        <div className="w-md mx-auto p-5 rounded-3xl bg-blue-500">
            <h2 className="mb-5 text-2xl font-semibold">Payment Method</h2>
            <label className="bg-blue-800 px-5  my-2 rounded-2xl text-white flex gap-2 justify-between has-checked:bg-blue-950 has-checked:outline-2 has-checked:outline-white" >
                <input className="peer "  name="payment" type="radio" />
                <p className="p-4 peer-checked:text-gray-400 peer-checked:line-through  ">Google Pay</p>
            </label>
            <label className="bg-blue-800 px-5  my-2 rounded-2xl text-white flex gap-2 justify-between has-checked:bg-blue-950 has-checked:outline-2 has-checked:outline-white" >
                <input className="peer "  name="payment" type="radio" />
                <p className="p-4 peer-checked:text-gray-400 peer-checked:line-through  ">Google Pay</p>
            </label>
            <label className="bg-blue-800 px-5  my-2 rounded-2xl text-white flex gap-2 justify-between has-checked:bg-blue-950 has-checked:outline-2 has-checked:outline-white" >
                <input className="peer "  name="payment" type="radio" />
                <p className="p-4 peer-checked:text-gray-400 peer-checked:line-through  ">Google Pay</p>
            </label>
            <label className="bg-blue-800 px-5  my-2 rounded-2xl text-white flex gap-2 justify-between has-checked:bg-blue-950 has-checked:outline-2 has-checked:outline-white" >
                <input className="peer "  name="payment" type="radio" />
                <p className="p-4 peer-checked:text-gray-400 peer-checked:line-through  ">Google Pay</p>
            </label>
            <label className="bg-blue-800 px-5  my-2 rounded-2xl text-white flex gap-2 justify-between has-checked:bg-blue-950 has-checked:outline-2 has-checked:outline-white" >
                <input className="peer "  name="payment" type="radio" />
                <p className="p-4 before:text-purple-500 after:text-orange-400 peer-checked:text-gray-400 peer-checked:line-through  ">Google Pay</p>
            </label>
            
            
            
        </div>

    )
}