import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Member, initialMembers } from '../data/members';

interface MemberContextType {
    members: Member[];
    updateMember: (updatedMember: Member) => void;
    resetMembers: () => void;
    homeYoutubeUrls: string[];
    updateHomeYoutubeUrls: (urls: string[]) => void;
    homeSpotifyUrls: string[];
    updateHomeSpotifyUrls: (urls: string[]) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [members, setMembers] = useState<Member[]>(() => {
        const saved = localStorage.getItem('sakura_members_data');
        if (saved) {
            try {
                const parsed: Member[] = JSON.parse(saved);
                // 保存されているデータと初期データをマージする
                return parsed.map(p => {
                    const init = initialMembers.find(m => m.id === p.id);
                    if (init) {
                        return {
                            ...init, // 基本情報（編集される可能性があるもの）は常にソースコード(initialMembers)を優先
                            // ブラウザ上の「管理者設定」で変更可能な項目のみLocalStorageから復元
                            tags: p.tags,
                            color1: p.color1,
                            color2: p.color2,
                            meetAndGreet: p.meetAndGreet
                        };
                    }
                    return p;
                });
            } catch (e) {
                console.error("Failed to parse saved members", e);
            }
        }
        return initialMembers;
    });

    const [homeYoutubeUrls, setHomeYoutubeUrls] = useState<string[]>(() => {
        const saved = localStorage.getItem('sakura_home_youtube_urls');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved home youtube urls", e);
            }
        }
        return [
            "https://www.youtube.com/watch?v=Rk54JNn7Qw4", // サンプル（お披露目Vlog）
        ];
    });

    const [homeSpotifyUrls, setHomeSpotifyUrls] = useState<string[]>(() => {
        const saved = localStorage.getItem('sakura_home_spotify_urls');
        if (saved !== null) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved home spotify urls", e);
            }
        }

        // 旧バージョンの単一URLからのマイグレーション
        const oldSaved = localStorage.getItem('sakura_home_spotify_url');
        if (oldSaved !== null && oldSaved.trim() !== '') {
            return [oldSaved];
        }

        // デフォルトの楽曲URL配列
        return ["https://open.spotify.com/embed/track/49cxVtrML7Xo63UFaaJrUR?utm_source=generator"];
    });

    useEffect(() => {
        localStorage.setItem('sakura_members_data', JSON.stringify(members));
    }, [members]);

    useEffect(() => {
        localStorage.setItem('sakura_home_youtube_urls', JSON.stringify(homeYoutubeUrls));
    }, [homeYoutubeUrls]);

    useEffect(() => {
        localStorage.setItem('sakura_home_spotify_urls', JSON.stringify(homeSpotifyUrls));
    }, [homeSpotifyUrls]);

    const updateMember = (updatedMember: Member) => {
        setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    };

    const resetMembers = () => {
        setMembers(initialMembers);
        localStorage.removeItem('sakura_members_data');
        setHomeYoutubeUrls(["https://www.youtube.com/watch?v=Rk54JNn7Qw4"]);
        localStorage.removeItem('sakura_home_youtube_urls');
        setHomeSpotifyUrls(["https://open.spotify.com/embed/track/49cxVtrML7Xo63UFaaJrUR?utm_source=generator"]);
        localStorage.removeItem('sakura_home_spotify_urls');
        localStorage.removeItem('sakura_home_spotify_url'); // 古いキーも一応消しておく
    };

    const updateHomeYoutubeUrls = (urls: string[]) => {
        setHomeYoutubeUrls(urls);
    };

    const updateHomeSpotifyUrls = (urls: string[]) => {
        setHomeSpotifyUrls(urls);
    };

    return (
        <MemberContext.Provider value={{ members, updateMember, resetMembers, homeYoutubeUrls, updateHomeYoutubeUrls, homeSpotifyUrls, updateHomeSpotifyUrls }}>
            {children}
        </MemberContext.Provider>
    );
};

export const useMembers = () => {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error('useMembers must be used within a MemberProvider');
    }
    return context;
};
