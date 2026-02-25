import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Flower, Users, MessageSquare } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
    const location = useLocation();

    // ホーム画面ではヘッダー（不要要素）を非表示にする
    if (location.pathname === '/') {
        return null;
    }

    return (
        <header className="header glass-panel">
            <div className="container header-container">
                <NavLink to="/" className="header-logo">
                    <Flower className="header-logo-icon" size={28} />
                    <span className="header-logo-text">The Growing 4th</span>
                </NavLink>

                <nav className="header-nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        end
                    >
                        <Users size={20} />
                        <span>Members</span>
                    </NavLink>
                    <NavLink
                        to="/community"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <MessageSquare size={20} />
                        <span>Community</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
