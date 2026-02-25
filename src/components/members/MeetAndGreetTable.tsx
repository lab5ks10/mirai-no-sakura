import React from 'react';
import { type Member, MEET_AND_GREET_DATES, MEET_AND_GREET_PARTS } from '../../data/members';
import './MeetAndGreetTable.css';

interface MeetAndGreetTableProps {
    member: Member;
}

type MeetAndGreetStatus = 'available' | 'sold_out' | 'none';

const MeetAndGreetTable: React.FC<MeetAndGreetTableProps> = ({ member }) => {
    return (
        <div className="meet-and-greet-container glass-panel animate-fade-in">
            <h3 className="meet-and-greet-title">オンラインミート＆グリート 受付状況</h3>

            <div className="meet-and-greet-schedule">
                <h4 className="schedule-title">今後の受付スケジュール</h4>
                <p className="schedule-item">第5次受付 3月4日(水)14:00 ～ 3月5日(木)14:00</p>
                <p className="schedule-item">第6次受付 3月11日(水)14:00 ～ 3月12日(木)14:00</p>
            </div>

            <div className="meet-and-greet-rules-link">
                <a href="https://www.fortunemusic.jp/sakurazaka_202603/" target="_blank" rel="noopener noreferrer" className="rules-button">
                    お申し込み・詳しいルールはこちら
                </a>
            </div>
            <div className="table-wrapper">
                <table className="meet-and-greet-table">
                    <thead>
                        <tr>
                            <th>日程</th>
                            {MEET_AND_GREET_PARTS.map((part, index) => (
                                <th key={index}>
                                    <div className="part-name">{part.name}</div>
                                    <div className="part-time">{part.time}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {MEET_AND_GREET_DATES.map((date, dateIndex) => (
                            <tr key={dateIndex}>
                                <td className="date-cell">{date}</td>
                                {MEET_AND_GREET_PARTS.map((_, partIndex) => {
                                    const statusKey = `${dateIndex}_${partIndex}`;
                                    // member.meetAndGreetが存在しない場合は 'none'
                                    const status: MeetAndGreetStatus = (member.meetAndGreet?.[statusKey] as MeetAndGreetStatus) || 'none';

                                    let statusText = '受付終了';
                                    let statusClass = 'status-none';

                                    if (status === 'available') {
                                        statusText = '受付中';
                                        statusClass = 'status-available';
                                    } else if (status === 'sold_out') {
                                        statusText = '完売';
                                        statusClass = 'status-sold-out';
                                    }

                                    return (
                                        <td key={partIndex} className={`status-cell ${statusClass}`}>
                                            {statusText}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-footer">
                <div className="status-legend">
                    <span className="legend-item"><span className="legend-color available"></span>受付中</span>
                    <span className="legend-item"><span className="legend-color sold-out"></span>完売</span>
                    <span className="legend-item"><span className="legend-color none"></span>受付終了</span>
                </div>
                <div className="status-note">
                    ※受付状況は受付開始後に手動更新いたします。実際の受付状況とは異なる可能性があるので注意してください。
                </div>
            </div>
        </div>
    );
};

export default MeetAndGreetTable;
