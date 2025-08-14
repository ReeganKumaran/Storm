import React, { useState } from "react";
import { Search, Cloud } from "lucide-react";

function Navbar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="text-blue-400" size={32} />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Storm Weather
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input 
              className="flex-1 md:w-80 px-4 py-2.5 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200" 
              type="text" 
              placeholder="Search any city..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={handleSearch} 
              className="p-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              <Search className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
