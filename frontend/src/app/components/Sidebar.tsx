import { Link, useLocation } from "react-router";
import { Home, Inbox, Calendar, MessageCircle, Brain, Database, Settings } from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Focus", path: "/dashboard" },
    { icon: Inbox, label: "Inbox", path: "/dashboard" },
    { icon: Calendar, label: "Calendar", path: "/dashboard" },
    { icon: MessageCircle, label: "WhatsApp", path: "/dashboard" },
    { icon: Brain, label: "Priority Engine", path: "/priority-engine" },
    { icon: Database, label: "Memory", path: "/dashboard" },
    { icon: Settings, label: "Settings", path: "/dashboard" },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-5 border-b border-sidebar-border">
        <div 
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '20px', 
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: '100%'
          }}
        >
          MemAG
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-sidebar-accent' 
                      : 'hover:bg-sidebar-accent/50'
                    }
                  `}
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '120%'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500 }}
          >
            P
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500, lineHeight: '100%' }}>
              Pratik
            </div>
            <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 400 }}>
              Executive
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}