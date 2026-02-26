import React from 'react';
import type { Member } from '../../data/members';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './MemberCard.css';

interface Props {
    member: Member;
    index: number;
}

const MemberCard: React.FC<Props> = ({ member, index }) => {
    const animationDelay = `${index * 0.1}s`;

    return (
        <Link
            to={`/member/${member.id}`}
            className="member-card new-layout animate-fade-in"
            style={{ animationDelay }}
        >
            <div className="card-inner">
                {/* 背景：日食（エクリプス）エフェクト */}
                <div className="eclipse-bg"></div>

                {/* 1. 左上の出身地ブロック */}
                <div className="origin-block" style={{ backgroundColor: member.color1 }}>
                    <MapPin className="origin-icon" size={24} />
                    <span className="origin-text">{member.birthPlace}</span>
                </div>

                {/* 2. 右上のテキストエリア */}
                <div className="text-block">
                    <p className="member-name-en">.{member.nameEn.toUpperCase()}.</p>
                    <h3 className="member-name-jp">{member.name}</h3>
                    <p className="member-name-kana">{member.nameKana}</p>
                </div>

                {/* 3. 左下のテキストエリア (元装飾ライン位置) */}
                <div className="card-description">
                    {member.tags.map((tag, i) => (
                        <span key={i} className="desc-tag">#{tag}</span>
                    ))}
                </div>

                {/* 4. メインビジュアル（右下の巨大な正円） */}
                <div className="circle-image-wrapper">
                    {member.imageUrl ? (
                        <img src={member.imageUrl} alt={`${member.name}のプロフィール画像`} className="circle-image" />
                    ) : (
                        <div className="placeholder-circle" style={{ background: `linear-gradient(135deg, ${member.color1}, ${member.color2})` }}></div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default MemberCard;
