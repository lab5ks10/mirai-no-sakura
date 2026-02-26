import React, { useState } from 'react';
import { useMembers } from '../context/MemberContext';
import { type Member, MEET_AND_GREET_DATES, MEET_AND_GREET_PARTS } from '../data/members';
import { ArrowLeft, Save, Trash2, Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin: React.FC = () => {
    const { members, updateMember, resetMembers, homeYoutubeUrls, updateHomeYoutubeUrls, homeSpotifyUrls, updateHomeSpotifyUrls, homeMvUrls, updateHomeMvUrls } = useMembers();
    const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || '');
    const [editForm, setEditForm] = useState<Member | null>(null);
    const [newTag, setNewTag] = useState('');
    const [newYoutubeUrl, setNewYoutubeUrl] = useState('');
    const [newHomeYoutubeUrl, setNewHomeYoutubeUrl] = useState('');
    const [localHomeUrls, setLocalHomeUrls] = useState<string[]>(homeYoutubeUrls);
    const [newHomeMvUrl, setNewHomeMvUrl] = useState('');
    const [localHomeMvUrls, setLocalHomeMvUrls] = useState<string[]>(homeMvUrls);
    const [newHomeSpotifyUrl, setNewHomeSpotifyUrl] = useState('');
    const [localHomeSpotifyUrls, setLocalHomeSpotifyUrls] = useState<string[]>(homeSpotifyUrls);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // 選択メンバー切り替え時の初期化
    React.useEffect(() => {
        const selected = members.find(m => m.id === selectedMemberId);
        if (selected) {
            setEditForm({ ...selected });
        }
    }, [selectedMemberId, members]);

    if (!editForm) return <div className="admin-page container">Loading...</div>;

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'color1' | 'color2') => {
        setEditForm({ ...editForm, [key]: e.target.value });
    };

    const handleAddTag = () => {
        if (newTag.trim() && !editForm.tags.includes(newTag.trim())) {
            setEditForm({ ...editForm, tags: [...editForm.tags, newTag.trim()] });
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setEditForm({ ...editForm, tags: editForm.tags.filter(t => t !== tagToRemove) });
    };

    type AdminMeetAndGreetStatus = 'available' | 'sold_out' | 'none';

    const handleToggleMeetAndGreet = (dateIdx: number, partIdx: number) => {
        const key = `${dateIdx}_${partIdx}`;
        const currentStatus = (editForm.meetAndGreet?.[key] as AdminMeetAndGreetStatus) || 'none';

        let nextStatus: AdminMeetAndGreetStatus = 'none';
        if (currentStatus === 'none') nextStatus = 'available';
        else if (currentStatus === 'available') nextStatus = 'sold_out';
        else nextStatus = 'none';

        setEditForm({
            ...editForm,
            meetAndGreet: {
                ...editForm.meetAndGreet,
                [key]: nextStatus
            }
        });
    };

    const handleAddYoutubeUrl = () => {
        if (newYoutubeUrl.trim() && !(editForm.youtubeUrls || []).includes(newYoutubeUrl.trim())) {
            setEditForm({ ...editForm, youtubeUrls: [...(editForm.youtubeUrls || []), newYoutubeUrl.trim()] });
            setNewYoutubeUrl('');
        }
    };

    const handleRemoveYoutubeUrl = (urlToRemove: string) => {
        setEditForm({ ...editForm, youtubeUrls: (editForm.youtubeUrls || []).filter(u => u !== urlToRemove) });
    };

    const handleMoveMemberUrl = (index: number, direction: 'up' | 'down') => {
        if (!editForm.youtubeUrls) return;
        const newUrls = [...editForm.youtubeUrls];
        if (direction === 'up' && index > 0) {
            [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
        } else if (direction === 'down' && index < newUrls.length - 1) {
            [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
        }
        setEditForm({ ...editForm, youtubeUrls: newUrls });
    };

    const handleAddHomeYoutubeUrl = () => {
        if (newHomeYoutubeUrl.trim() && !localHomeUrls.includes(newHomeYoutubeUrl.trim())) {
            setLocalHomeUrls([...localHomeUrls, newHomeYoutubeUrl.trim()]);
            setNewHomeYoutubeUrl('');
        }
    };

    const handleRemoveHomeYoutubeUrl = (urlToRemove: string) => {
        setLocalHomeUrls(localHomeUrls.filter(u => u !== urlToRemove));
    };

    const handleMoveHomeUrl = (index: number, direction: 'up' | 'down') => {
        const newUrls = [...localHomeUrls];
        if (direction === 'up' && index > 0) {
            [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
        } else if (direction === 'down' && index < newUrls.length - 1) {
            [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
        }
        setLocalHomeUrls(newUrls);
    };

    const handleAddHomeSpotifyUrl = () => {
        let urlToAdd = newHomeSpotifyUrl.trim();
        if (!urlToAdd) return;

        // 共有リンクやURIからIDを抽出し、埋め込み可能な形式に自動フォーマットする
        // 例: https://open.spotify.com/track/49cxVtrML7Xo63UFaaJrUR?si=... -> https://open.spotify.com/embed/track/49cxVtrML7Xo63UFaaJrUR?utm_source=generator
        // 例: spotify:track:49cxVtrML7Xo63UFaaJrUR -> https://open.spotify.com/embed/track/49cxVtrML7Xo63UFaaJrUR?utm_source=generator
        const trackMatch = urlToAdd.match(/track[:/]([a-zA-Z0-9]+)/);
        if (trackMatch && trackMatch[1]) {
            urlToAdd = `https://open.spotify.com/embed/track/${trackMatch[1]}?utm_source=generator`;
        }

        if (!localHomeSpotifyUrls.includes(urlToAdd)) {
            setLocalHomeSpotifyUrls([...localHomeSpotifyUrls, urlToAdd]);
            setNewHomeSpotifyUrl('');
        }
    };

    const handleRemoveHomeSpotifyUrl = (urlToRemove: string) => {
        setLocalHomeSpotifyUrls(localHomeSpotifyUrls.filter(u => u !== urlToRemove));
    };

    const handleMoveHomeSpotifyUrl = (index: number, direction: 'up' | 'down') => {
        const newUrls = [...localHomeSpotifyUrls];
        if (direction === 'up' && index > 0) {
            [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
        } else if (direction === 'down' && index < newUrls.length - 1) {
            [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
        }
        setLocalHomeSpotifyUrls(newUrls);
    };

    const handleAddHomeMvUrl = () => {
        let urlToAdd = newHomeMvUrl.trim();
        if (!urlToAdd) return;

        if (!urlToAdd.includes('/embed/')) {
            const videoIdMatch = urlToAdd.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
            if (videoIdMatch && videoIdMatch[1]) {
                urlToAdd = `https://www.youtube.com/embed/${videoIdMatch[1]}?rel=0`;
            }
        }

        if (!localHomeMvUrls.includes(urlToAdd)) {
            setLocalHomeMvUrls([...localHomeMvUrls, urlToAdd]);
            setNewHomeMvUrl('');
        }
    };

    const handleRemoveHomeMvUrl = (urlToRemove: string) => {
        setLocalHomeMvUrls(localHomeMvUrls.filter(u => u !== urlToRemove));
    };

    const handleMoveHomeMvUrl = (index: number, direction: 'up' | 'down') => {
        const newUrls = [...localHomeMvUrls];
        if (direction === 'up' && index > 0) {
            [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
        } else if (direction === 'down' && index < newUrls.length - 1) {
            [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
        }
        setLocalHomeMvUrls(newUrls);
    };

    const handleSave = () => {
        updateMember(editForm);
        updateHomeYoutubeUrls(localHomeUrls);
        updateHomeSpotifyUrls(localHomeSpotifyUrls);
        updateHomeMvUrls(localHomeMvUrls);

        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    return (
        <div className="admin-page container section animate-fade-in" style={{ padding: '32px 16px' }}>
            <div className="admin-header glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/" className="back-link style-override" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)' }}>
                        <ArrowLeft size={20} /> ホームへ
                    </Link>
                    <h1 style={{ margin: 0, color: 'var(--color-accent)' }}>管理者設定パネル</h1>
                </div>
                <button onClick={resetMembers} className="reset-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(255,111,0,0.4)', color: 'var(--color-text-secondary)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                    <RefreshCw size={16} /> 初期データに戻す
                </button>
            </div>

            <div className="admin-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '32px' }}>
                {/* メンバーリスト (サイドバー) */}
                <div className="admin-sidebar glass-panel" style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>メンバー選択</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {members.map(member => (
                            <button
                                key={member.id}
                                onClick={() => setSelectedMemberId(member.id)}
                                className={`member-select-btn ${member.id === selectedMemberId ? 'active' : ''}`}
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 16px',
                                    background: member.id === selectedMemberId ? 'rgba(255,111,0,0.2)' : 'transparent',
                                    border: `1px solid ${member.id === selectedMemberId ? 'var(--color-accent)' : 'transparent'}`,
                                    borderRadius: '8px',
                                    color: 'var(--color-text-primary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {member.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* エディターエリア */}
                <div className="admin-editor glass-panel" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>{editForm.name}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>タグとメンバーカラーの編集</p>
                        </div>
                        {showSuccessMessage && (
                            <div className="success-toast animate-fade-in" style={{ padding: '8px 16px', background: 'rgba(50,205,50,0.2)', border: '1px solid #32cd32', borderRadius: '8px', color: '#32cd32' }}>
                                保存しました！
                            </div>
                        )}
                    </div>

                    <div className="edit-section" style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            メンバーカラー設定 (2色)
                        </h3>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                            <div className="color-picker-wrap">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Color 1</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <input type="color" value={editForm.color1} onChange={e => handleColorChange(e, 'color1')} style={{ width: '48px', height: '48px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent' }} />
                                    <input type="text" value={editForm.color1} onChange={e => handleColorChange(e, 'color1')} style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'white', padding: '8px', borderRadius: '4px', width: '100px' }} />
                                </div>
                            </div>
                            <div className="color-picker-wrap">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Color 2</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <input type="color" value={editForm.color2} onChange={e => handleColorChange(e, 'color2')} style={{ width: '48px', height: '48px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent' }} />
                                    <input type="text" value={editForm.color2} onChange={e => handleColorChange(e, 'color2')} style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'white', padding: '8px', borderRadius: '4px', width: '100px' }} />
                                </div>
                            </div>
                            <div className="color-preview" style={{ marginLeft: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>グラデーションプレビュー</label>
                                <div style={{ width: '120px', height: '48px', borderRadius: '8px', background: `linear-gradient(135deg, ${editForm.color1}, ${editForm.color2})`, boxShadow: 'var(--shadow-md)' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="edit-section" style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            タグ編集
                        </h3>
                        <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                            {editForm.tags.map(tag => (
                                <div key={tag} className="tag-chip glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: '100px', gap: '8px' }}>
                                    <span>{tag}</span>
                                    <button onClick={() => handleRemoveTag(tag)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {editForm.tags.length === 0 && <span style={{ color: 'var(--color-text-secondary)', padding: '8px' }}>タグがありません</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                type="text"
                                placeholder="新しいタグを入力"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '8px', flex: 1 }}
                            />
                            <button onClick={handleAddTag} disabled={!newTag.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'white', padding: '0 24px', borderRadius: '0', cursor: 'pointer', opacity: newTag.trim() ? 1 : 0.5 }}>
                                <Plus size={18} /> 追加
                            </button>
                        </div>
                    </div>

                    <div className="edit-section" style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            関連YouTube URL
                        </h3>
                        <div className="youtube-urls-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            {(editForm.youtubeUrls || []).map((url, idx) => (
                                <div key={url} className="url-row glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '0', gap: '8px' }}>
                                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>{url}</span>
                                    <button onClick={() => handleMoveMemberUrl(idx, 'up')} disabled={idx === 0} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === 0 ? 'default' : 'pointer', padding: '4px 8px' }}>↑</button>
                                    <button onClick={() => handleMoveMemberUrl(idx, 'down')} disabled={idx === (editForm.youtubeUrls || []).length - 1} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === (editForm.youtubeUrls || []).length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === (editForm.youtubeUrls || []).length - 1 ? 'default' : 'pointer', padding: '4px 8px' }}>↓</button>
                                    <button onClick={() => handleRemoveYoutubeUrl(url)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', marginLeft: '8px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {(editForm.youtubeUrls || []).length === 0 && <span style={{ color: 'var(--color-text-secondary)', padding: '8px' }}>URLが登録されていません</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                type="url"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={newYoutubeUrl}
                                onChange={e => setNewYoutubeUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddYoutubeUrl()}
                                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '0', flex: 1 }}
                            />
                            <button onClick={handleAddYoutubeUrl} disabled={!newYoutubeUrl.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'white', padding: '0 24px', borderRadius: '0', cursor: 'pointer', opacity: newYoutubeUrl.trim() ? 1 : 0.5 }}>
                                <Plus size={18} /> 追加
                            </button>
                        </div>
                    </div>

                    {/* ミーグリ販売状況 */}
                    <div className="edit-section" style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            オンラインミーグリ販売状況
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>※セルをクリックして状態を変更します（設定なし → 受付中(緑) → 完売(赤) → 設定なし）</p>
                        <div style={{ overflowX: 'auto', width: '100%' }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid var(--color-border)', padding: '8px', background: 'rgba(0,0,0,0.3)', width: '120px' }}>日程</th>
                                        {MEET_AND_GREET_PARTS.map((part, index) => (
                                            <th key={index} style={{ border: '1px solid var(--color-border)', padding: '8px', background: 'rgba(0,0,0,0.3)' }}>{part.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {MEET_AND_GREET_DATES.map((date, dateIdx) => (
                                        <tr key={dateIdx}>
                                            <td style={{ border: '1px solid var(--color-border)', padding: '8px', background: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap', textAlign: 'center' }}>{date}</td>
                                            {MEET_AND_GREET_PARTS.map((_, partIdx) => {
                                                const key = `${dateIdx}_${partIdx}`;
                                                const status = (editForm.meetAndGreet?.[key] as AdminMeetAndGreetStatus) || 'none';

                                                let bgColor = 'transparent';
                                                let textColor = 'var(--color-text-secondary)';
                                                let text = '受付終了';

                                                if (status === 'available') {
                                                    bgColor = 'rgba(76, 175, 80, 0.2)';
                                                    textColor = '#4CAF50';
                                                    text = '受付中';
                                                } else if (status === 'sold_out') {
                                                    bgColor = 'rgba(244, 67, 54, 0.2)';
                                                    textColor = '#F44336';
                                                    text = '完売';
                                                }

                                                return (
                                                    <td key={partIdx} style={{ border: '1px solid var(--color-border)', padding: 0, textAlign: 'center' }}>
                                                        <button
                                                            onClick={() => handleToggleMeetAndGreet(dateIdx, partIdx)}
                                                            style={{
                                                                width: '100%', height: '100%', padding: '12px 8px', border: 'none',
                                                                background: bgColor, color: textColor, cursor: 'pointer',
                                                                fontWeight: status !== 'none' ? 'bold' : 'normal',
                                                                borderRadius: 0, transition: 'background 0.2s',
                                                                minHeight: '44px'
                                                            }}
                                                        >
                                                            {text}
                                                        </button>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ホーム画面 四期生MV 設定 */}
                    <div className="edit-section" style={{ marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            トップページ 四期生MV (YouTube埋め込み)
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                            ※トップページの「四期生物語」セクションの直前に表示される、メインの四期生MVを指定します。複数登録可能です。<br />
                            ※通常のYouTube URL（例: https://www.youtube.com/watch?v=... または https://youtu.be/...）を入力して追加すると、自動で埋め込み用URLに変換されます。<br />
                            ※一つも登録しない場合はセクション自体が非表示になります。
                        </p>
                        <div className="youtube-urls-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            {localHomeMvUrls.map((url, idx) => (
                                <div key={url} className="url-row glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '0', gap: '8px' }}>
                                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>{url}</span>
                                    <button onClick={() => handleMoveHomeMvUrl(idx, 'up')} disabled={idx === 0} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === 0 ? 'default' : 'pointer', padding: '4px 8px' }}>↑</button>
                                    <button onClick={() => handleMoveHomeMvUrl(idx, 'down')} disabled={idx === localHomeMvUrls.length - 1} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === localHomeMvUrls.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === localHomeMvUrls.length - 1 ? 'default' : 'pointer', padding: '4px 8px' }}>↓</button>
                                    <button onClick={() => handleRemoveHomeMvUrl(url)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', marginLeft: '8px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {localHomeMvUrls.length === 0 && <span style={{ color: 'var(--color-text-secondary)', padding: '8px' }}>URLが登録されていません</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                type="url"
                                placeholder="YouTube URLを入力（例: https://youtu.be/...）"
                                value={newHomeMvUrl}
                                onChange={e => setNewHomeMvUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddHomeMvUrl()}
                                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '4px', flex: 1 }}
                            />
                            <button onClick={handleAddHomeMvUrl} disabled={!newHomeMvUrl.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'white', padding: '0 24px', borderRadius: '4px', cursor: 'pointer', opacity: newHomeMvUrl.trim() ? 1 : 0.5 }}>
                                <Plus size={18} /> 追加
                            </button>
                        </div>
                    </div>

                    {/* ホーム画面動画設定 */}
                    <div className="edit-section" style={{ marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            ホーム画面動画 (櫻坂46四期生物語)
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>※ホーム画面の「櫻坂46四期生物語」セクションに表示される全メンバー共通の動画リストです。</p>
                        <div className="youtube-urls-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            {localHomeUrls.map((url, idx) => (
                                <div key={url} className="url-row glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '0', gap: '8px' }}>
                                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>{url}</span>
                                    <button onClick={() => handleMoveHomeUrl(idx, 'up')} disabled={idx === 0} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === 0 ? 'default' : 'pointer', padding: '4px 8px' }}>↑</button>
                                    <button onClick={() => handleMoveHomeUrl(idx, 'down')} disabled={idx === localHomeUrls.length - 1} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === localHomeUrls.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === localHomeUrls.length - 1 ? 'default' : 'pointer', padding: '4px 8px' }}>↓</button>
                                    <button onClick={() => handleRemoveHomeYoutubeUrl(url)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', marginLeft: '8px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {localHomeUrls.length === 0 && <span style={{ color: 'var(--color-text-secondary)', padding: '8px' }}>URLが登録されていません</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                type="url"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={newHomeYoutubeUrl}
                                onChange={e => setNewHomeYoutubeUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddHomeYoutubeUrl()}
                                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '0', flex: 1 }}
                            />
                            <button onClick={handleAddHomeYoutubeUrl} disabled={!newHomeYoutubeUrl.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'white', padding: '0 24px', borderRadius: '0', cursor: 'pointer', opacity: newHomeYoutubeUrl.trim() ? 1 : 0.5 }}>
                                <Plus size={18} /> 追加
                            </button>
                        </div>
                    </div>

                    {/* ホーム画面音楽 (Spotify) 設定 */}
                    <div className="edit-section" style={{ marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--color-accent)', display: 'inline-block' }}></span>
                            ホーム画面音楽 (Spotify埋め込みURL)
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>※Spotifyの埋め込み用URLを指定します。複数登録可能です。1つも登録しない場合はホーム画面からセクションごと非表示になります。</p>
                        <div className="youtube-urls-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            {localHomeSpotifyUrls.map((url, idx) => (
                                <div key={url} className="url-row glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '0', gap: '8px' }}>
                                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>{url}</span>
                                    <button onClick={() => handleMoveHomeSpotifyUrl(idx, 'up')} disabled={idx === 0} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === 0 ? 'default' : 'pointer', padding: '4px 8px' }}>↑</button>
                                    <button onClick={() => handleMoveHomeSpotifyUrl(idx, 'down')} disabled={idx === localHomeSpotifyUrls.length - 1} style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: idx === localHomeSpotifyUrls.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-primary)', cursor: idx === localHomeSpotifyUrls.length - 1 ? 'default' : 'pointer', padding: '4px 8px' }}>↓</button>
                                    <button onClick={() => handleRemoveHomeSpotifyUrl(url)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', marginLeft: '8px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {localHomeSpotifyUrls.length === 0 && <span style={{ color: 'var(--color-text-secondary)', padding: '8px' }}>URLが登録されていません</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                type="url"
                                placeholder="https://open.spotify.com/embed/track/..."
                                value={newHomeSpotifyUrl}
                                onChange={e => setNewHomeSpotifyUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddHomeSpotifyUrl()}
                                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '0', flex: 1 }}
                            />
                            <button onClick={handleAddHomeSpotifyUrl} disabled={!newHomeSpotifyUrl.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: 'white', padding: '0 24px', borderRadius: '0', cursor: 'pointer', opacity: newHomeSpotifyUrl.trim() ? 1 : 0.5 }}>
                                <Plus size={18} /> 追加
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
                        <button onClick={handleSave} className="submit-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '160px', borderRadius: '8px' }}>
                            <Save size={18} /> 変更を保存する
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin;
