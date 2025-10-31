// ==================== متغيرات عامة ====================
let hls;
let player;
let currentChannel = null;
let currentFilter = 'all';

// ==================== عناصر DOM ====================
const video = document.getElementById('player');
const channelsBtn = document.getElementById('channelsBtn');
const refreshBtn = document.getElementById('refreshBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const channelDialog = document.getElementById('channelDialog');
const closeDialog = document.getElementById('closeDialog');
const searchInput = document.getElementById('searchInput');
const homeSearchInput = document.getElementById('homeSearchInput');
const channelsGrid = document.getElementById('channelsGrid');
const dialogChannelsList = document.getElementById('dialogChannelsList');
const loadingOverlay = document.getElementById('loadingOverlay');
const serverNameEl = document.getElementById('serverName');
const channelNameEl = document.getElementById('channelName');
const qualityInfoEl = document.getElementById('qualityInfo');
const filterButtons = document.querySelectorAll('.filter-btn');

// عناصر الصفحات
const homePage = document.getElementById('homePage');
const playerPage = document.getElementById('playerPage');

// ==================== تهيئة التطبيق ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 تطبيق البث المباشر - جاري التشغيل');
    
    // عرض اسم الخادم
    serverNameEl.textContent = `الخادم ${currentServerIndex}`;
    
    // عرض القنوات في الصفحة الرئيسية
    renderChannels();
    
    // تفعيل الأحداث
    setupEventListeners();
    
    // إظهار الصفحة الرئيسية
    showHomePage();
    
    console.log('✅ التطبيق جاهز للاستخدام');
});

// ==================== إدارة الصفحات ====================
function showHomePage() {
    homePage.style.display = 'block';
    playerPage.style.display = 'none';
    document.title = 'بث مباشر - اختر قناتك المفضلة';
}

function showPlayerPage() {
    homePage.style.display = 'none';
    playerPage.style.display = 'block';
    document.title = `بث مباشر - ${currentChannel ? currentChannel.name : 'جاري التحميل...'}`;
    
    // تهيئة المشغل عند أول عرض لصفحة البث
    if (!player) {
        initializePlayer();
    }
}

// ==================== تهيئة المشغل ====================
function initializePlayer() {
    if (!video) return;
    
    player = new Plyr(video, {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],
        settings: ['quality', 'speed'],
        i18n: {
            quality: 'الجودة',
            speed: 'السرعة',
            normal: 'عادي'
        },
        fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: true
        },
        autoplay: false
    });
    
    // الأحداث
    player.on('ready', () => {
        console.log('✅ المشغل جاهز');
    });
    
    player.on('playing', () => {
        console.log('▶️ بدء التشغيل');
        hideLoading();
    });
    
    player.on('error', (error) => {
        console.error('❌ خطأ في المشغل:', error);
        showNotification('حدث خطأ في تشغيل القناة', 'error');
        hideLoading();
    });
    
    player.on('ended', () => {
        console.log('⏹️ انتهى البث');
    });
}

// ==================== عرض القنوات ====================
function renderChannels(filter = 'all') {
    channelsGrid.innerHTML = '';
    dialogChannelsList.innerHTML = '';
    
    const channels = getChannelsByCategory(filter);
    
    if (channels.length === 0) {
        channelsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">لا توجد قنوات متاحة</p>';
        return;
    }
    
    channels.forEach((channel, index) => {
        // بطاقة القناة في الشبكة (الصفحة الرئيسية)
        const card = createChannelCard(channel, index);
        channelsGrid.appendChild(card);
        
        // عنصر القناة في القائمة (النافذة المنبثقة)
        const listItem = createChannelListItem(channel, index);
        dialogChannelsList.appendChild(listItem);
    });
}

// ==================== إنشاء بطاقة قناة ====================
function createChannelCard(channel, index) {
    const card = document.createElement('div');
    card.className = 'channel-card';
    card.dataset.index = index;
    
    if (currentChannel && currentChannel.url === channel.url) {
        card.classList.add('active');
    }
    
    card.innerHTML = `
        <span class="channel-icon">${channel.icon}</span>
        <div class="channel-name">${channel.name}</div>
        <div class="channel-group">${channel.group}</div>
        <span class="channel-quality">${channel.quality}</span>
        <button class="play-btn">
            <i class="fas fa-play"></i>
            <span>مشاهدة</span>
        </button>
    `;
    
    card.addEventListener('click', () => {
        selectAndPlayChannel(channel);
    });
    
    return card;
}

// ==================== إنشاء عنصر قائمة قناة ====================
function createChannelListItem(channel, index) {
    const item = document.createElement('div');
    item.className = 'dialog-channel-item';
    item.dataset.index = index;
    
    item.innerHTML = `
        <i class="fas fa-tv"></i>
        <div style="flex: 1;">
            <div style="font-weight: 600;">${channel.name}</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">${channel.group} - ${channel.quality}</div>
        </div>
        <span style="font-size: 1.5rem;">${channel.icon}</span>
    `;
    
    item.addEventListener('click', () => {
        selectAndPlayChannel(channel);
        hideDialog();
    });
    
    return item;
}

// ==================== اختيار وتشغيل قناة ====================
function selectAndPlayChannel(channel) {
    currentChannel = channel;
    
    // الانتقال إلى صفحة البث
    showPlayerPage();
    
    // بدء تشغيل القناة
    setTimeout(() => {
        playChannel(channel);
    }, 300); // تأخير قصير للسماح بانتقال الصفحة
}

// ==================== تشغيل قناة ====================
function playChannel(channel) {
    console.log('🎬 تشغيل قناة:', channel.name);
    
    showLoading();
    
    // إيقاف التشغيل الحالي
    stopCurrentStream();
    
    // حفظ القناة الحالية
    currentChannel = channel;
    
    // تحديث المعلومات
    channelNameEl.textContent = channel.name;
    qualityInfoEl.textContent = channel.quality;
    document.title = `بث مباشر - ${channel.name}`;
    
    // استبدال النطاق بالخادم المختار
    const streamUrl = replaceServerDomain(channel.url);
    
    console.log('🔗 رابط البث:', streamUrl);
    
    // تشغيل البث
    if (Hls.isSupported()) {
        initHlsStream(streamUrl);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        initNativeStream(streamUrl);
    } else {
        showNotification('المتصفح لا يدعم تشغيل هذا النوع من البث', 'error');
        hideLoading();
    }
}

// ==================== تهيئة بث HLS ====================
function initHlsStream(url) {
    hls = new Hls({
        maxMaxBufferLength: 60,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferLength: 30,
        lowLatencyMode: false,
        enableWorker: true,
        startLevel: -1,
        abrEwmaDefaultEstimate: 500000,
        abrBandWidthFactor: 0.95,
        abrBandWidthUpFactor: 0.7,
        abrMaxWithRealBitrate: true,
        xhrSetup: function(xhr, url) {
            // إضافة Headers مهمة للحماية من CORS
            xhr.setRequestHeader('Referer', 'https://remo-tv.com/');
        }
    });
    
    hls.loadSource(url);
    hls.attachMedia(video);
    
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('✅ تم تحليل البث بنجاح');
        player.play().catch(e => {
            console.warn('⚠️ فشل التشغيل التلقائي:', e);
            hideLoading();
        });
    });
    
    hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('❌ خطأ في HLS:', data);
        
        if (data.fatal) {
            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    console.error('خطأ في الشبكة - محاولة إعادة الاتصال');
                    setTimeout(() => {
                        hls.startLoad();
                    }, 1000);
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.error('خطأ في الوسائط - محاولة الاستعادة');
                    hls.recoverMediaError();
                    break;
                default:
                    console.error('خطأ فادح - إعادة التشغيل');
                    hls.destroy();
                    setTimeout(() => {
                        playChannel(currentChannel);
                    }, 2000);
                    break;
            }
        }
    });
    
    hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        const quality = hls.levels[data.level];
        if (quality) {
            qualityInfoEl.textContent = `${quality.height}p`;
            console.log(`📊 الجودة الحالية: ${quality.height}p`);
        }
    });
}

// ==================== تهيئة بث أصلي (Safari) ====================
function initNativeStream(url) {
    video.src = url;
    video.addEventListener('loadedmetadata', () => {
        console.log('✅ تم تحميل البث');
        player.play().catch(e => {
            console.warn('⚠️ فشل التشغيل التلقائي:', e);
            hideLoading();
        });
    });
}

// ==================== إيقاف البث الحالي ====================
function stopCurrentStream() {
    if (player) {
        player.stop();
    }
    
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
    }
    
    if (hls) {
        hls.destroy();
        hls = null;
    }
}

// ==================== إعداد الأحداث ====================
function setupEventListeners() {
    // زر العودة للصفحة الرئيسية
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            stopCurrentStream();
            showHomePage();
        });
    }
    
    // زر القنوات (في صفحة البث)
    if (channelsBtn) {
        channelsBtn.addEventListener('click', showDialog);
    }
    
    // زر التحديث
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            if (currentChannel) {
                showNotification('جاري إعادة تحميل القناة...', 'info');
                playChannel(currentChannel);
            }
        });
    }
    
    // زر ملء الشاشة
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (player) {
                player.fullscreen.toggle();
            }
        });
    }
    
    // إغلاق النافذة المنبثقة
    if (closeDialog) {
        closeDialog.addEventListener('click', hideDialog);
    }
    
    if (channelDialog) {
        channelDialog.addEventListener('click', (e) => {
            if (e.target === channelDialog) {
                hideDialog();
            }
        });
    }
    
    // البحث في النافذة المنبثقة
    if (searchInput) {
        searchInput.addEventListener('input', handleDialogSearch);
    }
    
    // البحث في الصفحة الرئيسية
    if (homeSearchInput) {
        homeSearchInput.addEventListener('input', handleHomeSearch);
    }
    
    // أزرار التصفية
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            currentFilter = filter;
            
            // تحديث حالة الأزرار
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // عرض القنوات المفلترة
            renderChannels(filter);
        });
    });
    
    // اختصارات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (channelDialog.classList.contains('active')) {
                hideDialog();
            } else if (playerPage.style.display !== 'none') {
                // العودة للصفحة الرئيسية عند الضغط على Escape في صفحة البث
                stopCurrentStream();
                showHomePage();
            }
        } else if (e.key === 'f' || e.key === 'F') {
            if (player && playerPage.style.display !== 'none') {
                player.fullscreen.toggle();
            }
        }
    });
}

// ==================== البحث في النافذة المنبثقة ====================
function handleDialogSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const items = dialogChannelsList.querySelectorAll('.dialog-channel-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// ==================== البحث في الصفحة الرئيسية ====================
function handleHomeSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const cards = channelsGrid.querySelectorAll('.channel-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== إظهار/إخفاء النافذة المنبثقة ====================
function showDialog() {
    channelDialog.classList.add('active');
    searchInput.value = '';
    searchInput.focus();
}

function hideDialog() {
    channelDialog.classList.remove('active');
}

// ==================== إظهار/إخفاء التحميل ====================
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// ==================== الإشعارات ====================
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e94560' : type === 'success' ? '#00d9ff' : '#1a1a2e'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 4000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // إزالة بعد 3 ثواني
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== معالجة الأخطاء العامة ====================
window.addEventListener('error', (e) => {
    console.error('❌ خطأ في التطبيق:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise غير معالج:', e.reason);
});

// ==================== CSS للرسوم المتحركة ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('📺 تطبيق البث المباشر جاهز!');