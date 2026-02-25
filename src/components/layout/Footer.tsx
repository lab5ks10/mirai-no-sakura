import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="container">
                <div className="footer-content">
                    <p className="footer-text">
                        © {new Date().getFullYear()} SKZ LAB - Sakurazaka46 4th Gen Fan Community
                    </p>
                    <p className="footer-subtext">This is an unofficial fan app.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
