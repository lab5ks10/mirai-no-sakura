import React from 'react';
import type { Member } from '../../data/members';
import { prefecturePaths } from '../../data/prefecturePaths';
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
            className="member-card new-layout animate-fade-in"
            style={{ animationDelay }}
        >
            <div className="card-inner">
                {/* 1. 左上の出身地ブロック */}
                <div className="origin-block" style={{ backgroundColor: member.color1 }}>
                    {prefecturePaths[member.birthPlace] ? (
                        <svg
                            className="origin-icon prefecture-svg"
                            viewBox={prefecturePaths[member.birthPlace].viewBox}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <filter id={`inner-shadow-${member.id}`}>
                                    {/* 内側シャドウの生成 */}
                                    <feOffset dx="0" dy="2" />
                                    <feGaussianBlur stdDeviation="1" result="offset-blur" />
                                    <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                                    <feFlood floodColor="black" floodOpacity="0.15" result="color" />
                                    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                                </filter>
                            </defs>
                            <path
                                d={prefecturePaths[member.birthPlace].path}
                                fill="currentColor"
                                style={{ filter: `url(#inner-shadow-${member.id})` }}
                            />
                        </svg>
                    ) : (
                        <div className="origin-icon placeholder-icon"></div>
                    )}
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
