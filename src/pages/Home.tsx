import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMembers } from '../context/MemberContext';
import MemberCard from '../components/members/MemberCard';
import VideoCarousel from '../components/common/VideoCarousel';
import './Home.css';

const Home: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { members, homeYoutubeUrls, homeSpotifyUrls } = useMembers();

    // 自動横スクロール処理
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, clientWidth } = scrollRef.current;

                // DOM要素の座標をもとに正確に次のカードを中央に持ってくる計算
                const wrappers = Array.from(scrollRef.current.querySelectorAll('.member-card-wrapper')) as HTMLElement[];
                if (wrappers.length > 0) {
                    const containerCenter = scrollLeft + clientWidth / 2;
                    let closestIndex = 0;
                    let minDistance = Infinity;

                    // 最も中央に近いカードを探す
                    wrappers.forEach((wrapper, index) => {
                        const wrapperCenter = wrapper.offsetLeft + wrapper.offsetWidth / 2;
                        const distance = Math.abs(wrapperCenter - containerCenter);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestIndex = index;
                        }
                    });

                    const nextIndex = closestIndex + 1;
                    if (nextIndex >= wrappers.length) {
                        // 最後まで到達したら最初に戻る
                        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // 次のカードを中央に配置する正確な left 座標を算出
                        const nextWrapper = wrappers[nextIndex];
                        const targetLeft = nextWrapper.offsetLeft - (clientWidth / 2) + (nextWrapper.offsetWidth / 2);
                        scrollRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
                    }
                }
            }
        }, 3000); // 3秒ごとにスクロール動作

        return () => clearInterval(interval);
    }, []);

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
                <div className="members-responsive-grid" ref={scrollRef}>
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
        </div>
    );
};

export default Home;
