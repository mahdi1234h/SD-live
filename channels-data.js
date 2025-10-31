// قاعدة بيانات القنوات - تم استخراجها من Remo TV
const channelsDatabase = {
    beinSports: {
        name: "بين سبورت",
        category: "bein",
        icon: "🏆",
        channels: [
            { 
                name: "بين سبورت الإخبارية", 
                url: "https://id.remotv.xyz/?ch=bn", 
                quality: "HD",
                icon: "📰"
            },
            { 
                name: "بين سبورت 1", 
                url: "https://id.remotv.xyz/?ch=b1", 
                quality: "HD",
                icon: "🥇"
            },
            { 
                name: "بين سبورت 2", 
                url: "https://id.remotv.xyz/?ch=b2", 
                quality: "HD",
                icon: "🥈"
            },
            { 
                name: "بين سبورت 3", 
                url: "https://id.remotv.xyz/?ch=b3", 
                quality: "HD",
                icon: "🥉"
            },
            { 
                name: "بين سبورت 4", 
                url: "https://id.remotv.xyz/?ch=b4", 
                quality: "HD",
                icon: "⚽"
            },
            { 
                name: "بين سبورت 5", 
                url: "https://id.remotv.xyz/?ch=b5", 
                quality: "HD",
                icon: "🏀"
            },
            { 
                name: "بين سبورت 6", 
                url: "https://id.remotv.xyz/?ch=b6", 
                quality: "HD",
                icon: "🎾"
            },
            { 
                name: "بين سبورت 7", 
                url: "https://id.remotv.xyz/?ch=b7", 
                quality: "HD",
                icon: "🏐"
            },
            { 
                name: "بين سبورت 8", 
                url: "https://id.remotv.xyz/?ch=b8", 
                quality: "HD",
                icon: "🏈"
            },
            { 
                name: "بين سبورت 9", 
                url: "https://id.remotv.xyz/?ch=b9", 
                quality: "HD",
                icon: "🏉"
            }
        ]
    },
    
    beinSportsSD: {
        name: "بين سبورت - جودة متوسطة",
        category: "bein",
        icon: "📺",
        channels: [
            { 
                name: "بين سبورت 1 SD", 
                url: "https://id.remotv.xyz/?ch=b1sd", 
                quality: "480p",
                icon: "📱"
            },
            { 
                name: "بين سبورت 2 SD", 
                url: "https://id.remotv.xyz/?ch=b2sd", 
                quality: "480p",
                icon: "📱"
            },
            { 
                name: "بين سبورت 3 SD", 
                url: "https://id.remotv.xyz/?ch=b3sd", 
                quality: "480p",
                icon: "📱"
            },
            { 
                name: "بين سبورت 4 SD", 
                url: "https://id.remotv.xyz/?ch=b4sd", 
                quality: "480p",
                icon: "📱"
            },
            { 
                name: "بين سبورت 5 SD", 
                url: "https://id.remotv.xyz/?ch=b5sd", 
                quality: "480p",
                icon: "📱"
            }
        ]
    },
    
    beinSportsLow: {
        name: "بين سبورت - جودة ضعيفة",
        category: "bein",
        icon: "📞",
        channels: [
            { 
                name: "بين سبورت 1 Low", 
                url: "https://id.remotv.xyz/?ch=b1low", 
                quality: "240p",
                icon: "📟"
            },
            { 
                name: "بين سبورت 2 Low", 
                url: "https://id.remotv.xyz/?ch=b2low", 
                quality: "240p",
                icon: "📟"
            },
            { 
                name: "بين سبورت 3 Low", 
                url: "https://id.remotv.xyz/?ch=b3low", 
                quality: "240p",
                icon: "📟"
            },
            { 
                name: "بين سبورت 4 Low", 
                url: "https://id.remotv.xyz/?ch=b4low", 
                quality: "240p",
                icon: "📟"
            },
            { 
                name: "بين سبورت 5 Low", 
                url: "https://id.remotv.xyz/?ch=b5low", 
                quality: "240p",
                icon: "📟"
            }
        ]
    },
    
    remoSports: {
        name: "ريمو سبورت",
        category: "arabic",
        icon: "🎬",
        channels: [
            { 
                name: "ريمو سبورت", 
                url: "https://live.remo-tv.com/hls/remo.m3u8", 
                quality: "HD",
                icon: "📡",
                type: "m3u8"
            }
        ]
    },
    
    alfajrChannels: {
        name: "قنوات الفجر",
        category: "arabic",
        icon: "🌅",
        channels: [
            { 
                name: "الفجر 1", 
                url: "https://id.remotv.xyz/?ch=fj1", 
                quality: "HD",
                icon: "1️⃣"
            },
            { 
                name: "الفجر 2", 
                url: "https://id.remotv.xyz/?ch=fj2", 
                quality: "HD",
                icon: "2️⃣"
            },
            { 
                name: "الفجر 3", 
                url: "https://id.remotv.xyz/?ch=fj3", 
                quality: "HD",
                icon: "3️⃣"
            },
            { 
                name: "الفجر 4", 
                url: "https://id.remotv.xyz/?ch=fj4", 
                quality: "HD",
                icon: "4️⃣"
            },
            { 
                name: "الفجر 5", 
                url: "https://id.remotv.xyz/?ch=fj5", 
                quality: "HD",
                icon: "5️⃣"
            }
        ]
    },
    
    alwanChannels: {
        name: "قنوات ألوان",
        category: "arabic",
        icon: "🎨",
        channels: [
            { 
                name: "ألوان 1", 
                url: "https://id.remotv.xyz/?ch=al1", 
                quality: "HD",
                icon: "🌈"
            }
        ]
    },
    
    thamaniaChannels: {
        name: "ثمانية الرياضية",
        category: "arabic",
        icon: "⚡",
        channels: [
            { 
                name: "ثمانية الرياضية 1", 
                url: "https://id.remotv.xyz/?ch=tmh1", 
                quality: "HD",
                icon: "⭐"
            },
            { 
                name: "ثمانية الرياضية 2", 
                url: "https://id.remotv.xyz/?ch=tmh2", 
                quality: "HD",
                icon: "⭐"
            },
            { 
                name: "ثمانية الرياضية 3", 
                url: "https://id.remotv.xyz/?ch=tmh3", 
                quality: "HD",
                icon: "⭐"
            }
        ]
    },
    
    arabicSportsChannels: {
        name: "القنوات الرياضية العربية",
        category: "arabic",
        icon: "🌍",
        channels: [
            { 
                name: "العراقية الرياضية", 
                url: "https://stream.veo.buzz:6050/sport/ch13/adaptive.m3u8", 
                quality: "HD",
                icon: "🇮🇶",
                type: "m3u8"
            },
            { 
                name: "عمان الرياضية", 
                url: "https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8", 
                quality: "HD",
                icon: "🇴🇲",
                type: "m3u8"
            },
            { 
                name: "الكويت الرياضية 1", 
                url: "https://kwtspta.cdn.mangomolo.com/sp/smil:sp.stream.smil/chunklist.m3u8", 
                quality: "HD",
                icon: "🇰🇼",
                type: "m3u8"
            },
            { 
                name: "الكويت الرياضية 2", 
                url: "https://kwtsplta.cdn.mangomolo.com/spl/smil:spl.stream.smil/chunklist.m3u8", 
                quality: "HD",
                icon: "🇰🇼",
                type: "m3u8"
            },
            { 
                name: "دبي الرياضية 1", 
                url: "https://dmidspta.cdn.mgmlcdn.com/dubaisports/smil:dubaisports.stream.smil/chunklist.m3u8", 
                quality: "HD",
                icon: "🇦🇪",
                type: "m3u8"
            },
            { 
                name: "دبي الرياضية 2", 
                url: "https://dmitwlvvll.cdn.mgmlcdn.com/dubaisportshd/smil:dubaisportshd.smil/chunklist.m3u8", 
                quality: "HD",
                icon: "🇦🇪",
                type: "m3u8"
            },
            { 
                name: "دبي الرياضية 3", 
                url: "https://dmitwlvvll.cdn.mgmlcdn.com/dubaisportshd5/smil:dubaisportshd5.smil/chunklist.m3u8", 
                quality: "HD",
                icon: "🇦🇪",
                type: "m3u8"
            },
            { 
                name: "الشارقة الرياضية", 
                url: "https://svs.itworkscdn.net/smc4sportslive/smc4tv.smil/playlist.m3u8", 
                quality: "HD",
                icon: "🇦🇪",
                type: "m3u8"
            },
            { 
                name: "البحرين الرياضية 1", 
                url: "https://5c7b683162943.streamlock.net/live/ngrp:sportsone_all/playlist.m3u8", 
                quality: "HD",
                icon: "🇧🇭",
                type: "m3u8"
            },
            { 
                name: "البحرين الرياضية 2", 
                url: "https://5c7b683162943.streamlock.net/live/ngrp:bahrainsportstwo_all/playlist.m3u8", 
                quality: "HD",
                icon: "🇧🇭",
                type: "m3u8"
            }
        ]
    }
};

// قائمة الخوادم المتاحة - نفس النظام المستخدم في Remo TV
const availableServers = [
    "id.remotv.xyz",
    "id.remoserver.sbs",
    "id.jbal.site"
];

// اختيار خادم عشوائي
let currentServer = availableServers[Math.floor(Math.random() * availableServers.length)];
let currentServerIndex = availableServers.indexOf(currentServer) + 1;

// دالة لاستبدال النطاق بالخادم المختار
function replaceServerDomain(url) {
    if (url.includes("id.remotv.xyz")) {
        return url.replace("id.remotv.xyz", currentServer);
    }
    return url;
}

// دالة للحصول على جميع القنوات
function getAllChannels() {
    const allChannels = [];
    
    Object.keys(channelsDatabase).forEach(groupKey => {
        const group = channelsDatabase[groupKey];
        group.channels.forEach(channel => {
            allChannels.push({
                ...channel,
                group: group.name,
                category: group.category,
                groupIcon: group.icon
            });
        });
    });
    
    return allChannels;
}

// دالة للحصول على القنوات حسب الفئة
function getChannelsByCategory(category) {
    if (category === 'all') {
        return getAllChannels();
    }
    
    return getAllChannels().filter(channel => channel.category === category);
}