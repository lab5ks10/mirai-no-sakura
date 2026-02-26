export interface Member {
    id: string;
    name: string;
    nameKana: string;
    nameEn: string;
    birthDate: string;
    birthPlace: string;
    sign: string;
    height: string;
    bloodType: string;
    tags: string[];
    color1: string;
    color2: string;
    imageUrl?: string;
    youtubeUrls?: string[];
    meetAndGreet?: Record<string, 'available' | 'sold_out' | 'none'>;
    blogCt?: number;
}

export const MEET_AND_GREET_DATES = [
    "3月15日(日)",
    "3月29日(日)",
    "4月5日(日)",
    "4月19日(日)",
    "5月30日(土)",
    "5月31日(日)"
];

export const MEET_AND_GREET_PARTS = [
    { name: "第1部", time: "11:00-12:00" },
    { name: "第2部", time: "12:30-13:30" },
    { name: "第3部", time: "14:30-15:30" },
    { name: "第4部", time: "16:00-17:00" },
    { name: "第5部", time: "17:30-18:30" },
    { name: "第6部", time: "19:00-20:00" }
];

export const initialMembers: Member[] = [
    {
        id: "asai-konomi",
        name: "浅井 恋乃未",
        nameKana: "あさい このみ",
        nameEn: "Konomi Asai",
        birthDate: "2004年12月22日",
        birthPlace: "埼玉県",
        sign: "やぎ座",
        height: "156cm",
        bloodType: "A型",
        tags: ["14th選抜", "鳥好き", "このみん"],
        color1: "#ffb6c1",
        color2: "#ff69b4",
        imageUrl: "/images/members/asai.jpg",
        youtubeUrls: ["https://www.youtube.com/watch?v=Rk54JNn7Qw4"],
        blogCt: 70
    },
    {
        id: "inaguma-hina",
        name: "稲熊 ひな",
        nameKana: "いなぐま ひな",
        nameEn: "Hina Inaguma",
        birthDate: "2006年3月9日",
        birthPlace: "愛知県",
        sign: "うお座",
        height: "156cm",
        bloodType: "AB型",
        tags: ["忍者志望", "ひなまる"],
        color1: "#ffc800",
        color2: "#ffa500",
        imageUrl: "/images/members/inaguma.jpg",
        blogCt: 71
    },
    {
        id: "katsumata-haru",
        name: "勝又 春",
        nameKana: "かつまた はる",
        nameEn: "Haru Katsumata",
        birthDate: "2004年1月24日",
        birthPlace: "京都府",
        sign: "みずがめ座",
        height: "167cm",
        bloodType: "A型",
        tags: ["4期最年長", "京都大学", "はるさん"],
        color1: "#d8bfd8",
        color2: "#dda0dd",
        imageUrl: "/images/members/katsumata.jpg",
        blogCt: 72
    },
    {
        id: "sato-neo",
        name: "佐藤 愛桜",
        nameKana: "さとう ねお",
        nameEn: "Neo Sato",
        birthDate: "2006年12月1日",
        birthPlace: "佐賀県",
        sign: "いて座",
        height: "157cm",
        bloodType: "O型",
        tags: ["14th選抜", "さくら学院出身", "ねおつん"],
        color1: "#ff69b4",
        color2: "#ff1493",
        imageUrl: "/images/members/sato.jpg",
        blogCt: 73
    },
    {
        id: "nakagawa-chihiro",
        name: "中川 智尋",
        nameKana: "なかがわ ちひろ",
        nameEn: "Chihiro Nakagawa",
        birthDate: "2007年9月16日",
        birthPlace: "長崎県",
        sign: "おとめ座",
        height: "157cm",
        bloodType: "O型",
        tags: ["相方はとりきち", "ちいたん"],
        color1: "#87ceeb",
        color2: "#00bfff",
        imageUrl: "/images/members/nakagawa.jpg",
        blogCt: 74
    },
    {
        id: "matsumoto-wako",
        name: "松本 和子",
        nameKana: "まつもと わこ",
        nameEn: "Wako Matsumoto",
        birthDate: "2005年2月6日",
        birthPlace: "千葉県",
        sign: "みずがめ座",
        height: "162cm",
        bloodType: "O型",
        tags: ["あざとい", "わこち"],
        color1: "#ffa07a",
        color2: "#ff7f50",
        imageUrl: "/images/members/matsumoto.jpg",
        blogCt: 75
    },
    {
        id: "meguro-hiiro",
        name: "目黒 陽色",
        nameKana: "めぐろ ひいろ",
        nameEn: "Hiiro Meguro",
        birthDate: "2006年1月24日",
        birthPlace: "埼玉県",
        sign: "みずがめ座",
        height: "169.4cm",
        bloodType: "A型",
        tags: ["ダンスが得意", "ひいろ"],
        color1: "#32cd32",
        color2: "#228b22",
        imageUrl: "/images/members/meguro.jpg",
        blogCt: 76
    },
    {
        id: "yamakawa-ui",
        name: "山川 宇衣",
        nameKana: "やまかわ うい",
        nameEn: "Ui Yamakawa",
        birthDate: "2005年9月19日",
        birthPlace: "宮城県",
        sign: "おとめ座",
        height: "159cm",
        bloodType: "不明",
        tags: ["14th選抜", "元チア部", "ういたん"],
        color1: "#4682b4",
        color2: "#4169e1",
        imageUrl: "/images/members/yamakawa.jpg",
        blogCt: 77
    },
    {
        id: "yamada-momomi",
        name: "山田 桃実",
        nameKana: "やまだ ももみ",
        nameEn: "Momomi Yamada",
        birthDate: "2008年7月20日",
        birthPlace: "岡山県",
        sign: "かに座",
        height: "164cm",
        bloodType: "AB型",
        tags: ["4期最年少", "運動神経抜群", "ももちゃん"],
        color1: "#dda0dd",
        color2: "#ba55d3",
        imageUrl: "/images/members/yamada.jpg",
        blogCt: 78
    }
];
