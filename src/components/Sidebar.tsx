import { Home, Search, Library, Plus, Heart } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Your Library' },
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Streamify</h1>
      </div>

      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <item.icon size={24} />
                <span className="font-semibold">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <Plus size={24} />
            <span className="font-semibold">Create Playlist</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <Heart size={24} />
            <span className="font-semibold">Liked Songs</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
