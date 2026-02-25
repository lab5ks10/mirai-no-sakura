import React, { useRef, useState } from 'react';
import './VideoCarousel.css';

interface VideoCarouselProps {
    urls: string[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ urls }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // YouTube URLから動画IDを抽出するヘルパー関数
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const validUrls = urls.map(u => ({ url: u, id: getYouTubeId(u) })).filter(item => item.id !== null);

    // スクロール位置から現在アクティブなインデックスを計算
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth } = scrollRef.current;
        // 現在のスクロール位置を要素幅で割り、最も近い要素のインデックスを算出
        // (カード幅がコンテナの幅とほぼ同じである前提)
        const index = Math.round(scrollLeft / clientWidth);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    // ドットをクリックしたときに該当のインデックスへスクロール
    const scrollTo = (index: number) => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollTo({
            left: index * clientWidth,
            behavior: 'smooth'
        });
        setActiveIndex(index);
    };

    if (validUrls.length === 0) return null;

    return (
        <div className="video-carousel-wrapper">
            <div
                className="video-carousel-container"
                ref={scrollRef}
                onScroll={handleScroll}
            >
                {validUrls.map((item, index) => (
                    <div key={item.id! + index} className="video-carousel-item glass-panel">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${item.id}`}
                            title={`YouTube video player ${index}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ aspectRatio: '16/9', display: 'block', pointerEvents: 'auto' }} // iframe内の操作を許可
                        ></iframe>
                    </div>
                ))}
            </div>

            {/* カスタムインジケーター (ドット) */}
            {validUrls.length > 1 && (
                <div className="video-carousel-indicators">
                    {validUrls.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideoCarousel;
