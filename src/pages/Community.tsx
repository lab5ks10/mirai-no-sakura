import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Send } from 'lucide-react';
import './Community.css';

interface Post {
    id: number;
    author: string;
    avatarColor: string;
    content: string;
    likes: number;
    timestamp: string;
}

const mockPosts: Post[] = [
    {
        id: 1,
        author: "Buddies123",
        avatarColor: "#ffc0cb",
        content: "今日のそこさくの4期生企画最高でしたね！リカちゃんのリアクションが面白すぎました😆",
        likes: 124,
        timestamp: "2時間前"
    },
    {
        id: 2,
        author: "SakuraFan_Tokyo",
        avatarColor: "#4169e1",
        content: "麗奈ちゃんのブログ読みました！バイオリンの練習頑張ってるみたいで応援したくなります🎻✨",
        likes: 89,
        timestamp: "5時間前"
    },
    {
        id: 3,
        author: "NagisaOshi",
        avatarColor: "#ff8c00",
        content: "凪紗ちゃんの笑顔にいつも元気もらってます。次のミーグリ絶対当てるぞ！！",
        likes: 210,
        timestamp: "1日前"
    }
];

const Community: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [newPostContent, setNewPostContent] = useState('');

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        const newPost: Post = {
            id: Date.now(),
            author: "GuestUser",
            avatarColor: "var(--color-text-secondary)",
            content: newPostContent,
            likes: 0,
            timestamp: "たった今"
        };

        setPosts([newPost, ...posts]);
        setNewPostContent('');
    };

    const handleLike = (id: number) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    return (
        <div className="community-page container animate-fade-in">
            <div className="community-header">
                <h1 className="section-title">Buddies コミュニティ</h1>
                <p>4期生について熱く語り合いましょう！</p>
            </div>

            <div className="post-form-container glass-panel">
                <form onSubmit={handlePostSubmit} className="post-form">
                    <textarea
                        className="post-input"
                        placeholder="メンバーへの熱い思いを投稿しよう..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={3}
                    />
                    <div className="post-form-footer">
                        <span className="post-guideline">※誹謗中傷などはお控えください</span>
                        <button type="submit" className="post-submit-btn" disabled={!newPostContent.trim()}>
                            <Send size={16} /> 投稿する
                        </button>
                    </div>
                </form>
            </div>

            <div className="post-list">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        className="post-card glass-panel animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="post-header">
                            <div className="post-avatar" style={{ backgroundColor: post.avatarColor }}>
                                {post.author.charAt(0)}
                            </div>
                            <div className="post-meta">
                                <span className="post-author">{post.author}</span>
                                <span className="post-time">{post.timestamp}</span>
                            </div>
                        </div>
                        <div className="post-content">
                            {post.content}
                        </div>
                        <div className="post-actions">
                            <button className="action-btn" onClick={() => handleLike(post.id)}>
                                <ThumbsUp size={16} /> {post.likes}
                            </button>
                            <button className="action-btn">
                                <MessageCircle size={16} /> 返信
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
