import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setISCharacter] = useState(false);
  const [password, setPassword] = useState("");
  let inputRef = useRef(null);

  // ======================================================
  //           fuctions
  // =========================================================

  const copyToClipboard = () => {
    inputRef.current?.select();
    navigator.clipboard.writeText(password);
  }

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) str += "0123456789";
    if (isCharacter) str += "!@#$%^&*()_-+={}[]~`;:?/>.<,";
    let pass = "";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, isNumber, isCharacter, setPassword]);

  useEffect(passwordGenerator, [length, isNumber, isCharacter]);

  return (
    <>
    {/* ====================
           background div
    ====================== */}
      <div className="w-full h-screen overflow-auto bg-gray-900">
        <h1 className="text-white text-center mt-12 text-4xl">
          Password Generator
        </h1>

        {/* ==================
          input div 
        ================= */}
        <div className="w-full max-w-xl p-3 mx-auto my-10 rounded-2xl shadow-2xl shadow-black bg-gray-700 ">
          <div className="my-4 shadow-2xl shadow-black rounded-xl flex">
            <input
              className="h-10 w-full text-xl px-2 py-0.5 rounded-xl rounded-r-none outline-none  bg-white font-bold "
              type="text"
              placeholder="password"
              readOnly={true}
              value={password}
              ref={inputRef}
            />
            <button
              className="h-10 bg-blue-700 px-4 rounded-r-xl cursor-pointer py-0.5 font-bold text-white active:bg-blue-900"
              onClick={copyToClipboard()}
            >
              Copy
            </button>
          </div>

          {/* ===================
          dependancies div 
          =================== */}

          <div className="flex flex-wrap text-amber-500 gap-4">
            <input
              type="range"
              min={1}
              max={100}
              value={length}
              onChange={(e) => setlength(Number(e.target.value))}
            />
            Length: {length}
            <label>
              <input
                type="checkbox"
                checked={isNumber}
                onChange={() => setIsNumber((isNumber) => !isNumber)}
              />{" "}
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={isCharacter}
                onChange={() => setISCharacter((isCharacter) => !isCharacter)}
              />{" "}
              Charactors
            </label>
            <button
              className="cursor-pointer active:cursor-grab"
              onClick={passwordGenerator}
            >
              🔁
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
