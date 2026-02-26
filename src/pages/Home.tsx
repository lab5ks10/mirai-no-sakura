import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useMembers } from '../context/MemberContext';
import MemberCard from '../components/members/MemberCard';
import VideoCarousel from '../components/common/VideoCarousel';
import './Home.css';

const Home: React.FC = () => {
    const { members, homeYoutubeUrls, homeSpotifyUrls } = useMembers();

    return (
        <div className="home-page">
            <section className="hero-section section glass-panel animate-fade-in">
                <div className="hero-bg-image"></div>
                <div className="hero-content">
                    <h1 className="hero-title">The Growing<br />4th Generation</h1>

                    {/* メンバー名簿 */}
                    <div className="member-directory">
                        <p className="directory-title">MEMBER DIRECTORY</p>
                        <div className="directory-links">
                            {members.map(member => (
                                <Link key={member.id} to={`/member/${member.id}`} className="directory-chip">
                                    {member.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="members-section">
                <div className="members-vertical-list">
                    {members.map((member, index) => (
                        <div className="member-card-wrapper" key={member.id}>
                            <MemberCard member={member} index={index} />
                        </div>
                    ))}
                </div>
            </section>

            {/* YouTube セクション */}
            {homeYoutubeUrls && homeYoutubeUrls.length > 0 && (
                <section className="youtube-section section animate-fade-in">
                    <h2 className="section-title">櫻坂46四期生物語</h2>
                    <VideoCarousel urls={homeYoutubeUrls} />
                </section>
            )}

            {/* Spotify セクション */}
            {homeSpotifyUrls && homeSpotifyUrls.length > 0 && (
                <section className="spotify-section section animate-fade-in" style={{ padding: '0 24px', maxWidth: '800px', margin: '0 auto 48px', width: '100%' }}>
                    <h2 className="section-title">Music</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {homeSpotifyUrls.map((url, index) => {
                            // すでに保存されているデータが埋め込み形式でない場合の安全対策
                            let embedUrl = url;
                            if (!url.includes('/embed/')) {
                                const trackMatch = url.match(/track[:/]([a-zA-Z0-9]+)/);
                                if (trackMatch && trackMatch[1]) {
                                    embedUrl = `https://open.spotify.com/embed/track/${trackMatch[1]}?utm_source=generator`;
                                }
                            }
                            return (
                                <div key={index} className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
                                    <iframe style={{ borderRadius: '12px' }} src={embedUrl} width="100%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* 公式リンク セクション */}
            <section className="official-links-section section animate-fade-in">
                <h2 className="section-title">公式リンク</h2>
                <div className="official-links-container">
                    <a
                        href="https://sakurazaka46.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="official-link-card glass-panel dark-panel"
                    >
                        <div className="official-link-content">
                            <span className="official-link-label">Official Website</span>
                            <span className="official-link-text">櫻坂46 公式サイトはこちら</span>
                        </div>
                        <ExternalLink size={20} className="official-link-icon" />
                    </a>

                    <a
                        href="https://sakurazaka46.com/s/s46/page/4th_generation?ima=0000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="official-link-card glass-panel dark-panel"
                    >
                        <div className="official-link-content">
                            <span className="official-link-label">4th Generation Special</span>
                            <span className="official-link-text">櫻坂46 四期生 お披露目特設サイトはこちら</span>
                        </div>
                        <ExternalLink size={20} className="official-link-icon" />
                    </a>

                    <a
                        href="https://sakurazaka46.com/s/s46/page/4th_firstshowcase?ima=0000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="official-link-card glass-panel dark-panel"
                    >
                        <div className="official-link-content">
                            <span className="official-link-label">First Showcase</span>
                            <span className="official-link-text">櫻坂46 四期生「First Showcase」特設サイトはこちら</span>
                        </div>
                        <ExternalLink size={20} className="official-link-icon" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
