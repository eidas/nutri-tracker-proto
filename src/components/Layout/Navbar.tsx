import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarDays, Settings } from 'lucide-react';

const links = [
  { to: '/', label: 'ダッシュボード', icon: LayoutDashboard },
  { to: '/log', label: '食事記録', icon: UtensilsCrossed },
  { to: '/calendar', label: 'カレンダー', icon: CalendarDays },
  { to: '/settings', label: '設定', icon: Settings },
];

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="text-lg font-bold text-emerald-600">🥗 NutriTracker</span>
        <nav className="flex gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
