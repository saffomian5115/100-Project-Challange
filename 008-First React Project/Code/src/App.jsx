import "./App.css";

function App() {
  return (
    <>
      {/* navbar start here */}
      <header className="fixed shadow-xl/75 bg-cyan-700 text-white w-full h-16">
        <nav className=" flex justify-between  items-center p-4">
          <div className=" text-black font-bold text-3xl">
            Sarfraz <span className="text-xl text-slate-900">Pro-Dev</span>
          </div>
          <ul className="hidden gap-4 md:flex ">
            <li className="font-semibold text-fuchsia-500 cursor-pointer hover:text-fuchsia-600">
              Home
            </li>
            <li className="font-semibold text-fuchsia-500 cursor-pointer hover:text-fuchsia-600">
              Contact Us
            </li>
            <li className="font-semibold text-fuchsia-500 cursor-pointer hover:text-fuchsia-600">
              About Us
            </li>
          </ul>
          <div className="hidden md:block  bg-cyan-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-cyan-600">
            Login/Signup
          </div>
          <div className="text-white text-4xl  md:hidden">
            <a href="/">&#8801;</a>
          </div>
        </nav>
      </header>

      <main className="bg-blue-950 py-4">
        {/* Hero section  */}
        <div className="w-full h-auto">
          <img
            className="w-full h-screen object-cover md:hidden"
            src="/assets/1.jpg"
            alt="Hero Image 1"
          />
          <img
            className="h-screen w-full object-cover hidden md:block"
            src="/assets/2.jpg"
            alt="Hero Image 2"
          />
        </div>

        {/* Out cources */}
        <div className="flex flex-col items-center m-2">
          <div className="flex flex-col items-center">
            <p className="text-blue-500 font-bold text-2xl md:text-4xl">
              Our Earth
            </p>
            <div className="mt-2 md:mt-3 border-yellow-500 border-2 w-36 rounded-full"></div>
          </div>
          <div className="flex flex-wrap items-center justify-around">
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2016/12/05/03/56/travel-1883060_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">1</p>
              <p className=" text-slate-300 font-bold">Earth Logo</p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2013/07/12/18/35/world-153534_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">2</p>
              <p className=" text-slate-300 font-bold">Earth Ball</p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2016/04/01/22/32/world-1301744_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">3</p>
              <p className=" text-slate-300 font-bold">Earth globe</p>
            </div>
          </div>
        </div>

        {/* Out Subjects to Join */}
        <div className="flex pt-16 flex-col items-center m-2">
          <div className="flex flex-col items-center">
            <p className="text-blue-500 font-bold text-2xl md:text-4xl">
              Our Subjects To Explore
            </p>
            <div className="mt-2 md:mt-3 border-yellow-500 border-2 w-36 rounded-full"></div>
          </div>
          <div className="flex flex-wrap items-center justify-around">
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2017/02/15/00/48/logo-2067396_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">Blue</p>
              <p className=" text-slate-300 font-bold">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2024/07/19/19/11/ai-generated-8906992_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">black</p>
              <p className=" text-slate-300 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                non.
              </p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2023/03/06/13/58/brand-7833518_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">Light Blue</p>
              <p className=" text-slate-300 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laudantium mollitia voluptatibus!
              </p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2024/03/27/03/37/tiger-8658100_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">Tiger</p>
              <p className=" text-slate-300 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                iste illo voluptas.
              </p>
            </div>
            <div className="pt-12 border-white border-2 rounded pb-16 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://media.istockphoto.com/id/2170827995/vector/roaring-tiger-head-logo-or-icon.jpg?s=1024x1024&w=is&k=20&c=bkkQ_PDpPzXSNxIuDJLffq2ZleCRDhmyBhiYDQW0i7s="
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">Orange</p>
              <p className=" text-slate-300 font-bold">Lorem, ipsum dolor.</p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2016/01/23/16/02/book-1157658_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">Shadow</p>
              <p className=" text-slate-300 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="pt-12 w-sm flex flex-col items-center">
              <img
                className="h-30"
                src="https://cdn.pixabay.com/photo/2016/12/05/03/56/travel-1883060_1280.png"
                alt=""
              />
              <p className="pt-5 text-white font-bold text-2xl">Pakistan</p>
              <p className=" text-slate-300 font-bold">Visit Us</p>
            </div>
          </div>
        </div>
      </main>

      {/* footer section */}

      <footer>
        <div className="w-full flex flex-col md:flex-row   text-white bg-gray-900  p-4">
          <div className="p-2 w-sm flex flex-col items-center">
            <img
              className="w-24"
              src="https://cdn.pixabay.com/photo/2024/03/27/03/37/tiger-8658100_1280.png"
              alt=""
            />
            <p className="py-4">Email: xyz@gamil.com</p>
          </div>
          <div className="p-2 w-sm flex flex-col items-center">
            <p className="font-bold text-xl">Products</p>
            <div className="w-30 border-amber-400 border-1 rounded "></div>
            <p>product 1</p>
            <p>product 2</p>
            <p>product 3</p>
          </div>
          <div className="p-2 w-sm align-center flex flex-col items-center">
            <p className="font-bold text-xl">PW Skills</p>
            <div className="w-30 border-amber-400 border-1 rounded "></div>
            <p>ABC</p>
            <p>...</p>
            <p>XYZ</p>
          </div>
          <div className="p-2 w-sm align-center flex flex-col items-center">
            <p className="font-bold text-xl">Contact Us</p>
            <div className="w-30 border-amber-400 border-1 rounded "></div>
            <p>Whatsapp</p>
            <p>Facebook</p>
            <p>Linkedin</p>
            <p>Youtube</p>
            <p>Gmail</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
