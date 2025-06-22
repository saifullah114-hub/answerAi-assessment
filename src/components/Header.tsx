import { Menu, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { label: 'Charging Stations', route: '/charging-station' },
  { label: 'Fleet Sizing', route: '/fleet-sizing' },
  { label: 'Parking', route: '/parking' }
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoute = tabs.find(tab => location.pathname.startsWith(tab.route))?.route || '/charging-station';

  return (
    <header className="flex items-center justify-between bg-[#0E0D0D] px-6 py-4">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>

        {tabs.map(({ label, route }) => (
          <button
            key={label}
            onClick={() => navigate(route)}
            className={`px-4 py-2 rounded-lg border ${
              activeRoute === route
                ? 'bg-[#242424] border-[#5A5A5A] text-white'
                : 'text-gray-300 hover:text-white border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          placeholder="Search"
          className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg w-64 text-white focus:outline-none focus:border-lime-500"
        />
      </div>
    </header>
  );
};

export default Header;
