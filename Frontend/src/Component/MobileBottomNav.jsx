import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

/**
 * Mobile-only bottom tab bar (visible below md). Pass nav items with:
 *   { name, path, icon: <LucideIcon/> }
 * Optionally pass onLogout to render a logout button as the last tab.
 */
export default function MobileBottomNav({ items, onLogout, logoutTitle = 'Logout', className = '' }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] pb-[env(safe-area-inset-bottom)] ${className}`}
    >
      <div className="flex items-stretch justify-around max-w-md mx-auto">
        {items.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                active ? 'text-primary' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 2} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {onLogout && (
          <button
            onClick={onLogout}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={22} strokeWidth={2} />
            <span>{logoutTitle}</span>
          </button>
        )}
      </div>
    </nav>
  );
}