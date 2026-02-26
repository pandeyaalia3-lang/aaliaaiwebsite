import { Clapperboard, Menu, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-black text-white p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <Clapperboard size={28} className="text-indigo-400" />
        <h1 className="text-2xl font-bold font-display tracking-tighter">aalia.ai</h1>
      </div>
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
        <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
        <a href="#" className="hover:text-white transition-colors">Docs</a>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Search size={18} />
        </button>
        <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          Login
        </button>
        <button className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
