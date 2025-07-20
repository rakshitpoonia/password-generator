import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // memoization by useCallback for optimization
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1); // returns an index
      pass += str.charAt(char); //finds character in str at index char
    }
    setPassword(pass);
  }, [length, charAllowed, numbersAllowed]); //dependencies

  // this hook runs everytime something in dependency array changes
  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numbersAllowed]);

  const copypasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold  text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Password Generator
        </h1>

        <div className="mb-6">
          <div className="flex rounded-lg overflow-hidden shadow-lg">
            <input
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
              className="flex-1 px-4 py-3 bg-gray-800 text-white font-mono text-lg focus:outline-none placeholder-gray-400"
            />
            <button
              onClick={copypasswordToClipboard}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Length: {length}</label>
              <span className="text-purple-300 text-sm">
                {length} characters
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                  ((length - 6) / (100 - 6)) * 100
                }%, #374151 ${
                  ((length - 6) / (100 - 6)) * 100
                }%, #374151 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>6</span>
              <span>100</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                defaultChecked={numbersAllowed}
                onChange={() => {
                  setNumbersAllowed((prev) => !prev);
                }}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label className="text-white font-medium flex-1">
                Include Numbers
              </label>
              <span className="text-sm text-gray-400">0-9</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label className="text-white font-medium flex-1">
                Include Special Characters
              </label>
              <span className="text-sm text-gray-400">!@#$%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Generate secure passwords with customizable options
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
