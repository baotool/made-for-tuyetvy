/* ============================================
   SETTINGS - FULL FILE
   ============================================ */

const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.querySelector('.close');
let pages = [];
const applySettingsButton = document.getElementById('applySettings');

// 🔥 ĐỔI TÊN BABE Ở ĐÂY
const BABE_NAME = 'BABE';

let settings = {
    music: './media/happybirtday_uia.mp3',
    countdown: 3,
    matrixText: 'HAPPYBIRTHDAY',
    matrixColor1: '#fe6bb3',
    matrixColor2: '#c2185b',
    sequence: `HAPPY|BIRTHDAY|TO|${BABE_NAME}|❤`,
    sequenceColor: '#fe6bb3',
    gift: './images/happy3.gif',
    enableBook: true,
    enableHeart: true,
    isSave: false,
pages: [
    { image: './images/theend.jpg' },
    { image: './images/b1.png' },
    { image: './images/b2.png', content: 'Cảm ơn em vì đã đồng hành cùng anh,Thank My Love' },
    { image: './images/b3.png' },
    { image: './images/b5.png', content: 'Sinh nhật vui vẻ nha bae 💗, đợi quà của anh' },
]
};

// Biến global
window.lastIsSaveState = false;

// Fallback t()
if (typeof window.t !== 'function') {
    window.t = function(key, vars) {
        vars = vars || {};
        let str = key;
        Object.keys(vars).forEach(k => {
            str = str.replace(`{${k}}`, vars[k]);
        });
        return str;
    };
}

// ========================================
// INIT DEFAULT
// ========================================
function initializeDefaultSettings() {
    pages = settings.pages;
    window.settings = settings;
}

// ========================================
// APPLY SETTINGS
// ========================================
function applyLoadedSettings() {
    const s = window.settings || settings;

    // Nhạc
    const birthdayAudio = document.getElementById('birthdayAudio');
    if (birthdayAudio) birthdayAudio.src = s.music;

    // Gift
    const giftImageElement = document.getElementById('gift-image');
    if (giftImageElement && s.gift) giftImageElement.src = s.gift;

    // Matrix
    if (typeof matrixChars !== 'undefined') {
        matrixChars = s.matrixText.split('');
    }

    // Reset matrix
    if (typeof matrixInterval !== 'undefined' && matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
        const matrixCanvas = document.getElementById('matrix-rain');
        if (matrixCanvas) {
            const ctx = matrixCanvas.getContext('2d');
            ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        }
    }
    if (typeof initMatrixRain === 'function') initMatrixRain();

    // Tạo sách
    if (typeof createPages === 'function') createPages();

    // Sequence
    if (typeof S !== 'undefined' && S.UI) {
        S.UI.reset(true);
        const sequence = `|#countdown ${s.countdown}|${s.sequence}|#gift|`;
        S.UI.simulate(sequence);
    }
}

// ========================================
// RESET STATE
// ========================================
function resetWebsiteState() {
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    const canvas = document.querySelector('.canvas');
    const matrixCanvas = document.getElementById('matrix-rain');
    const giftImageElement = document.getElementById('gift-image');
    const contentDisplay = document.getElementById('contentDisplay');
    const fireworkContainer = document.getElementById('fireworkContainer');
    const birthdayAudio = document.getElementById('birthdayAudio');

    if (typeof S !== 'undefined') S.initialized = false;
    if (typeof hideStars === 'function') hideStars();

    if (book) { book.style.display = 'none'; book.classList.remove('show'); }
    if (bookContainer) { bookContainer.style.display = 'none'; bookContainer.classList.remove('show'); }
    if (contentDisplay) contentDisplay.classList.remove('show');
    if (giftImageElement) { giftImageElement.style.display = 'none'; giftImageElement.style.animation = ''; }
    if (fireworkContainer) { fireworkContainer.style.display = 'none'; fireworkContainer.style.opacity = '0'; fireworkContainer.innerHTML = ''; }

    document.querySelectorAll('.photo').forEach(p => p.remove());

    if (canvas) canvas.style.display = 'block';
    if (matrixCanvas) matrixCanvas.style.display = 'block';

    if (typeof currentPage !== 'undefined') currentPage = 0;
    if (typeof isBookFinished !== 'undefined') isBookFinished = false;
    if (typeof isFlipping !== 'undefined') isFlipping = false;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('flipped', 'flipping'));

    if (birthdayAudio && window.settings) {
        birthdayAudio.src = window.settings.music;
    }

    if (window.settings && typeof matrixChars !== 'undefined') {
        matrixChars = window.settings.matrixText.split('');
        if (typeof matrixInterval !== 'undefined' && matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
            if (matrixCanvas) {
                const ctx = matrixCanvas.getContext('2d');
                ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            }
        }
        if (typeof initMatrixRain === 'function') initMatrixRain();
    }

    if (giftImageElement && window.settings) {
        giftImageElement.src = window.settings.gift || '';
    }

    if (window.settings && window.settings.pages) {
        pages = window.settings.pages;
        if (typeof createPages === 'function') createPages();
    }

    if (typeof S !== 'undefined' && S.UI && window.settings) {
        S.UI.reset(true);
        const sequence = `|#countdown ${window.settings.countdown}|${window.settings.sequence}|#gift|`;
        S.UI.simulate(sequence);
    }
}

// ========================================
// AUTO START — CÓ XÓA LOADING
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    if (book) { book.style.display = 'none'; book.classList.remove('show'); }
    if (bookContainer) { bookContainer.style.display = 'none'; bookContainer.classList.remove('show'); }

    window.settings = settings;
    pages = settings.pages;

    initializeDefaultSettings();
    applyLoadedSettings();

    // Đợi 2 giây cho loading hiện rồi tắt
    setTimeout(() => {
        // ✅ XÓA LOADING SCENE
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => {
                if (loadingOverlay.parentNode) loadingOverlay.remove();
            }, 500);
        }

        // Bắt đầu web
        if (typeof tryStartWebsiteWhenLandscape === 'function') {
            tryStartWebsiteWhenLandscape();
        } else if (typeof startWebsite === 'function') {
            startWebsite();
        }
    }, 5000);
});

// ========================================
// CREATE PAGES
// ========================================
function createPages() {
    const book = document.getElementById('book');
    if (!book) return;
    book.innerHTML = '';

    const totalLogicalPages = pages.length;
    const totalPhysicalPages = Math.ceil(totalLogicalPages / 2);

    for (let physicalPageIndex = 0; physicalPageIndex < totalPhysicalPages; physicalPageIndex++) {
        const page = document.createElement('div');
        page.classList.add('page');
        page.dataset.page = physicalPageIndex;

        const frontLogicalIndex = physicalPageIndex * 2;
        const backLogicalIndex = frontLogicalIndex + 1;

        const front = document.createElement('div');
        front.classList.add('page-front');
        if (frontLogicalIndex < pages.length && pages[frontLogicalIndex]) {
            const frontPageData = pages[frontLogicalIndex];
            if (frontPageData.image) {
                const frontImg = document.createElement('img');
                frontImg.src = frontPageData.image;
                frontImg.onerror = function () {
                    this.src = createPlaceholderImage(frontLogicalIndex === 0 ? 'Bìa Sách' : `Trang ${frontLogicalIndex + 1}`);
                };
                front.appendChild(frontImg);
            } else {
                front.classList.add('empty-page');
                front.textContent = 'Trang trống';
            }
        } else {
            front.classList.add('empty-page');
            front.textContent = 'Trang trống';
        }

        const back = document.createElement('div');
        back.classList.add('page-back');
        if (backLogicalIndex < pages.length && pages[backLogicalIndex]) {
            const backPageData = pages[backLogicalIndex];
            if (backPageData.image) {
                const backImg = document.createElement('img');
                backImg.src = backPageData.image;
                backImg.onerror = function () {
                    this.src = createPlaceholderImage(`Trang ${backLogicalIndex + 1}`);
                };
                back.appendChild(backImg);
            } else {
                back.classList.add('empty-page');
                back.textContent = 'Trang trống';
            }
        } else {
            const endImg = document.createElement('img');
            endImg.src = './images/theend.jpg';
            endImg.onerror = function () {
                back.classList.add('empty-page');
                back.textContent = 'Hết sách';
            };
            back.appendChild(endImg);
        }

        page.appendChild(front);
        page.appendChild(back);
        book.appendChild(page);

        page.addEventListener('click', (e) => {
            if (!isFlipping) {
                const rect = page.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pageWidth = rect.width;
                if (clickX < pageWidth / 2 && page.classList.contains('flipped')) {
                    prevPage();
                } else if (clickX >= pageWidth / 2 && !page.classList.contains('flipped')) {
                    nextPage();
                }
            }
        });
    }

    if (typeof photoUrls !== 'undefined') {
        // photoUrls = pages.filter(p => p.image).map(p => p.image);
    }

    if (typeof calculatePageZIndexes === 'function') calculatePageZIndexes();
}

function createPlaceholderImage(text) {
    return `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
            <rect width="300" height="400" fill="#f0f0f0"/>
            <text x="150" y="200" text-anchor="middle" font-family="Arial" font-size="16" fill="#999">
                ${text}
            </text>
        </svg>
    `)}`;
}

// ========================================
// CÁC HÀM STUB (tránh lỗi)
// ========================================
function populateModal() {}
function addNewPage() {}
function removePage() {}
function handleColorThemeChange() {}
function addCustomColorListeners() {}
function detectCurrentColorTheme() { return 'pink'; }
function saveFormDataToSettings() {}
function updatePricingFromModal() {}
function updateExpireDateDisplay() {}
function isAndroid() { return /android/i.test(navigator.userAgent); }

function isLandscapeMode() {
    return window.innerWidth > window.innerHeight;
}

function tryStartWebsiteWhenLandscape() {
    if (typeof startWebsite === 'function') {
        if (isLandscapeMode()) {
            startWebsite();
        } else {
            window.addEventListener('resize', function onResize() {
                if (isLandscapeMode()) {
                    startWebsite();
                    window.removeEventListener('resize', onResize);
                }
            });
        }
    }
}

// ========================================
// EVENT LISTENERS (nếu có nút)
// ========================================
if (applySettingsButton) {
    applySettingsButton.addEventListener('click', () => {
        if (settingsModal) settingsModal.style.display = 'none';
        if (typeof startWebsite === 'function') startWebsite();
    });
}

if (settingsButton) {
    settingsButton.addEventListener('click', () => {
        if (settingsModal) settingsModal.style.display = 'block';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (settingsModal) settingsModal.style.display = 'none';
    });
}