import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMembers } from '../context/MemberContext';
import { ArrowLeft, Send, UserCircle2, Trash2 } from 'lucide-react';
import VideoCarousel from '../components/common/VideoCarousel';
import MeetAndGreetTable from '../components/members/MeetAndGreetTable';
import './MemberDetail.css';
import './Home.css';

interface Comment {
    id: number;
    nickname: string;
    content: string;
    time: string;
    isMine?: boolean;
}

const initialComments: Comment[] = [
    {
        id: 1,
        nickname: "匿名Buddies",
        content: "応援してます！これからの活躍が楽しみです！",
        time: "2時間前"
    },
    {
        id: 2,
        nickname: "サクラサク",
        content: "お披露目Vlog何回も見ました✨",
        time: "1日前"
    }
];

const MemberDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { members } = useMembers();
    const member = members.find(m => m.id === id);

    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');

    if (!member) {
        return (
            <div className="member-detail-error">
                <h2>メンバーが見つかりませんでした</h2>
                <Link to="/" className="back-link glass-panel"><ArrowLeft size={20} /> ホームに戻る</Link>
            </div>
        );
    }

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            nickname: nickname.trim() || "名無しBuddies",
            content,
            time: "たった今",
            isMine: true
        };

        setComments([newComment, ...comments]);
        setNickname('');
        setContent('');
    };

    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter(c => c.id !== commentId));
    };

    const hasYouTubeUrls = member.youtubeUrls && member.youtubeUrls.length > 0;

    return (
        <div className="member-detail-page container animate-fade-in" style={{ padding: 0 }}>
            {/* ヘッダー関係をグループ化してgapを開けないようにする */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                    <section className="hero-section glass-panel animate-fade-in" style={{ margin: 0, minHeight: '220px', padding: '24px 16px', cursor: 'pointer' }}>
                        <div className="hero-bg-image"></div>
                        <div className="hero-content" style={{ padding: 0 }}>
                            <h1 className="hero-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>The Growing<br />4th Generation</h1>
                        </div>
                    </section>
                </Link>

                <div className="detail-nav" style={{ padding: '0 24px', marginBottom: 0 }}>
                    <Link to="/" className="back-link glass-panel">
                        <ArrowLeft size={16} /> 四期生一覧
                    </Link>
                </div>
            </div>

            {/* Section 1: Profile */}
            <section className="profile-section" style={{ padding: '0 24px' }}>
                <div className="profile-image-container">
                    {member.imageUrl ? (
                        <img src={member.imageUrl} alt={`${member.name}のプロフィール画像`} className="profile-image-detail" />
                    ) : (
                        <div className="profile-placeholder" style={{ background: `linear-gradient(135deg, ${member.color1}, ${member.color2})` }}>
                            <span className="placeholder-text-large">PHOTO 3:4</span>
                        </div>
                    )}
                </div>

                <div className="profile-info-container">
                    <div className="profile-header">
                        <p className="profile-name-en">{member.nameEn}</p>
                        <h1 className="profile-name">{member.name}</h1>
                        <p className="profile-name-kana">{member.nameKana}</p>
                    </div>

                    <div className="profile-grid">
                        <div className="profile-grid-item">
                            <span className="profile-label">生年月日</span>
                            <span className="profile-value">{member.birthDate}</span>
                        </div>
                        <div className="profile-grid-item">
                            <span className="profile-label">星座</span>
                            <span className="profile-value">{member.sign}</span>
                        </div>
                        <div className="profile-grid-item">
                            <span className="profile-label">身長</span>
                            <span className="profile-value">{member.height}</span>
                        </div>
                        <div className="profile-grid-item">
                            <span className="profile-label">出身地</span>
                            <span className="profile-value">{member.birthPlace}</span>
                        </div>
                        <div className="profile-grid-item">
                            <span className="profile-label">血液型</span>
                            <span className="profile-value">{member.bloodType}</span>
                        </div>
                    </div>

                    <div className="profile-tags">
                        {member.tags.map((tag, i) => (
                            <span key={i} className="keyword-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="profile-color-indicator">
                        <span className="color-label">Member Color</span>
                        <div className="color-circles">
                            <div className="color-circle" style={{ backgroundColor: member.color1 }}></div>
                            <div className="color-circle" style={{ backgroundColor: member.color2 }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 1.5: Meet & Greet Table */}
            <section style={{ padding: '0 24px', marginBottom: '40px' }}>
                <MeetAndGreetTable member={member} />
            </section>

            {/* Section 2: Related Videos */}
            {hasYouTubeUrls && (
                <section className="vlog-section" style={{ padding: '0 24px', marginBottom: '48px' }}>
                    <h2 className="section-heading">関連動画</h2>
                    <VideoCarousel urls={member.youtubeUrls!} />
                </section>
            )}

            {/* Section 3: BBS */}
            <section className="bbs-section" style={{ padding: '0 24px' }}>
                <h2 className="section-heading">魅力発信掲示板</h2>
                <div className="bbs-container">
                    {/* メッセージ一覧 (上部) */}
                    <div className="bbs-list-side scrollable-bbs">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="comment-card glass-panel"
                            >
                                <div className="comment-header">
                                    <div className="comment-user">
                                        <UserCircle2 size={24} className="user-icon" />
                                        <span className="comment-nickname">{comment.nickname}</span>
                                    </div>
                                    <div className="comment-actions">
                                        <span className="comment-time">{comment.time}</span>
                                        {comment.isMine && (
                                            <button
                                                className="comment-delete-btn"
                                                onClick={() => handleDeleteComment(comment.id)}
                                                title="削除する"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="comment-content">{comment.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* 入力フォーム (下部) */}
                    <div className="bbs-form-side glass-panel">
                        <h3 className="form-title">魅力を発信する</h3>
                        <form onSubmit={handleCommentSubmit} className="stylish-form">
                            <div className="input-group">
                                <label>ニックネーム (任意)</label>
                                <input
                                    type="text"
                                    className="stylish-input"
                                    placeholder="名無しBuddies"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>メッセージ (必須)</label>
                                <textarea
                                    className="stylish-input"
                                    placeholder="メンバーへの応援メッセージをどうぞ！"
                                    rows={4}
                                    required
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-button" disabled={!content.trim()}>
                                <Send size={18} /> 送信
                            </button>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default MemberDetail;
