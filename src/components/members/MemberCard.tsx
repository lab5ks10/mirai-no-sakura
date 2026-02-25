import React from 'react';
import type { Member } from '../../data/members';
import { Link } from 'react-router-dom';
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
            className="member-card animate-fade-in"
            style={{ animationDelay }}
        >
            <div className="card-image-wrapper">
                {member.imageUrl ? (
                    <img src={member.imageUrl} alt={`${member.name}のプロフィール画像`} className="profile-image-actual" />
                ) : (
                    <div className="placeholder-image" style={{ background: `linear-gradient(135deg, ${member.color1}, ${member.color2})` }}>
                        <span className="placeholder-text">PHOTO 3:4</span>
                    </div>
                )}
                <div className="card-overlay">
                    <div className="card-content">
                        <span className="member-origin">{member.birthPlace}出身</span>
                        <h3 className="member-name truncate">{member.name}</h3>
                        <p className="member-name-en">{member.nameEn}</p>
                        <div className="member-tags">
                            {member.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="member-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MemberCard;
