// Octopus Font Comparison App
// Single-file rewrite — replaces 12 JS files + inline scripts

(function () {
'use strict';

// =========================================================================
// 1. CONFIGURATION
// =========================================================================

const COLUMN_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

const COLUMN_LAYOUT = {
    top: [1, 2, 3, 7],
    bottom: [4, 5, 6, 8]
};

const DEFAULTS = {
    fontSize: '64',
    tracking: '0',
    lineHeight: '1.25',
    features: '',
    locl: ''
};

// Per-column axes detected from loaded fonts
// { colNum: [ { tag, minValue, maxValue, defaultValue }, ... ] }
const columnAxes = {};

const TRACKING_MULTIPLIER = 0.001;
const TEXT_STORAGE_KEY = 'txt';
const APP_VERSION = 'V1.0.0';

// =========================================================================
// 2. STORAGE
// =========================================================================

// IndexedDB wrapper for large font data (localStorage has ~5MB limit)
const FontDB = {
    _dbName: 'OctopusFonts',
    _storeName: 'fonts',
    _dbPromise: null,

    _open() {
        if (!this._dbPromise) {
            this._dbPromise = new Promise((resolve, reject) => {
                const req = indexedDB.open(this._dbName, 1);
                req.onupgradeneeded = () => {
                    req.result.createObjectStore(this._storeName);
                };
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
        }
        return this._dbPromise;
    },

    async set(key, value) {
        const db = await this._open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this._storeName, 'readwrite');
            tx.objectStore(this._storeName).put(value, key);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    },

    async get(key) {
        const db = await this._open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this._storeName, 'readonly');
            const req = tx.objectStore(this._storeName).get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    async clear() {
        const db = await this._open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this._storeName, 'readwrite');
            tx.objectStore(this._storeName).clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
};

const Storage = {
    get(key, defaultValue) {
        const val = localStorage.getItem(key);
        return val !== null ? val : defaultValue;
    },

    set(key, value) {
        localStorage.setItem(key, value);
    },

    clearAll() {
        const keys = ['FirstOpen', TEXT_STORAGE_KEY, 'HW_all', 'row-top', 'row-bot',
            'inp-f-size', 'inp-f-tracking', 'inp-f-lineHeight', 'f-features', 'f-locl'];
        COLUMN_IDS.forEach(n => {
            keys.push('font_name_' + n, 'axes_' + n);
            // Also clear any stored axis values
            const storedAxes = localStorage.getItem('axes_' + n);
            if (storedAxes) {
                try {
                    JSON.parse(storedAxes).forEach(a => keys.push(a.tag + '-' + n));
                } catch (e) { /* ignore */ }
            }
            const row = COLUMN_LAYOUT.top.includes(n) ? 'top' : 'bottom';
            keys.push(row + '-column' + n);
        });
        keys.forEach(k => localStorage.removeItem(k));
        FontDB.clear();
        window.location.reload();
    }
};

// =========================================================================
// 3. COLUMN SETTINGS
// =========================================================================

// --- Variable font axes (per-column, dynamic) ---

function updateColumnAxes(colNum, axes) {
    columnAxes[colNum] = axes;
    Storage.set('axes_' + colNum, JSON.stringify(axes));

    const ul = document.querySelector('#form-' + colNum + ' ul');
    if (!ul) return;

    // Remove existing axis <li> elements (keep the <h2>)
    ul.querySelectorAll('li').forEach(li => li.remove());

    // Create an input for each axis
    axes.forEach(axis => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.textContent = axis.tag;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = axis.tag + '-' + colNum;
        input.className = 'filter-numeric-4';
        input.dataset.axisTag = axis.tag;
        input.dataset.min = axis.minValue;
        input.dataset.max = axis.maxValue;

        input.value = Storage.get(
            axis.tag + '-' + colNum,
            String(axis.defaultValue)
        );

        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);

        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^\d.-]/g, '');
        });

        input.addEventListener('change', () => applyVariationSettings(colNum));
        input.addEventListener('input', () => applyVariationSettings(colNum));
    });

    applyVariationSettings(colNum);
}

function applyVariationSettings(colNum) {
    const p = document.querySelector('#p-t' + colNum);
    if (!p) return;

    const inputs = document.querySelectorAll(
        '#form-' + colNum + ' input[data-axis-tag]'
    );

    if (inputs.length === 0) {
        p.style.fontVariationSettings = '';
        return;
    }

    const parts = [];
    inputs.forEach(input => {
        const tag = input.dataset.axisTag;
        const val = input.value || input.dataset.min || '0';
        Storage.set(tag + '-' + colNum, val);
        parts.push("'" + tag + "' " + val);
    });

    p.style.fontVariationSettings = parts.join(', ');
}

// --- Universal typography settings (apply to all columns) ---

function getGlobalInputs() {
    return {
        fontSize: document.querySelector('#inp-f-size'),
        tracking: document.querySelector('#inp-f-tracking'),
        lineHeight: document.querySelector('#inp-f-lineHeight'),
        features: document.querySelector('#f-features'),
        locl: document.querySelector('#f-locl')
    };
}

function applyGlobalSettings() {
    const g = getGlobalInputs();

    const size = g.fontSize.value || DEFAULTS.fontSize;
    const tracking = g.tracking.value || DEFAULTS.tracking;
    const lh = g.lineHeight.value || DEFAULTS.lineHeight;
    const features = g.features.value;
    const locl = g.locl.value;

    Storage.set('inp-f-size', size);
    Storage.set('inp-f-tracking', tracking);
    Storage.set('inp-f-lineHeight', lh);
    Storage.set('f-features', features);
    Storage.set('f-locl', locl);

    COLUMN_IDS.forEach(colNum => {
        const p = document.querySelector('#p-t' + colNum);
        if (!p) return;

        p.style.fontSize = size + 'pt';
        p.style.letterSpacing = (tracking * TRACKING_MULTIPLIER) + 'em';
        p.style.lineHeight = lh;
        p.style.fontFeatureSettings = features || 'normal';
        p.lang = locl;
    });
}

function initGlobalSettings() {
    const g = getGlobalInputs();

    g.fontSize.value = Storage.get('inp-f-size', DEFAULTS.fontSize);
    g.tracking.value = Storage.get('inp-f-tracking', DEFAULTS.tracking);
    g.lineHeight.value = Storage.get('inp-f-lineHeight', DEFAULTS.lineHeight);
    g.features.value = Storage.get('f-features', DEFAULTS.features);
    g.locl.value = Storage.get('f-locl', DEFAULTS.locl);

    // Apply on load
    applyGlobalSettings();

    // Listen for changes
    [g.fontSize, g.tracking, g.lineHeight, g.features, g.locl].forEach(input => {
        if (input) {
            input.addEventListener('change', applyGlobalSettings);
            input.addEventListener('input', applyGlobalSettings);
        }
    });
}

function initColumnAxes(colNum) {
    const storedAxes = Storage.get('axes_' + colNum);
    if (storedAxes) {
        try {
            const axes = JSON.parse(storedAxes);
            updateColumnAxes(colNum, axes);
        } catch (e) { /* ignore bad data */ }
    }
}

// =========================================================================
// 4. FONT LOADING
// =========================================================================

function loadFontFace(name, url) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(
        '@font-face { font-family: ' + name + '; src: url(' + url + '); }'
    ));
    document.head.appendChild(style);
}

function parseFontAxes(arrayBuffer) {
    if (typeof opentype === 'undefined') return [];
    try {
        const font = opentype.parse(arrayBuffer);
        if (font.tables.fvar && font.tables.fvar.axes) {
            return font.tables.fvar.axes.map(a => ({
                tag: a.tag,
                minValue: a.minValue,
                maxValue: a.maxValue,
                defaultValue: a.defaultValue
            }));
        }
    } catch (e) {
        console.warn('Could not parse font axes:', e);
    }
    return [];
}

function dataUrlToArrayBuffer(dataUrl) {
    const base64 = dataUrl.split(',')[1];
    const binary = atob(base64);
    const buf = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
    }
    return buf;
}

function loadFontFile(file, colNum) {
    // Read as both DataURL (for @font-face) and ArrayBuffer (for axis parsing)
    const readerUrl = new FileReader();
    readerUrl.onload = function (e) {
        const dataUrl = e.target.result;
        const fontName = "'Col_font_" + colNum + "'";
        FontDB.set('font_' + colNum, dataUrl);
        Storage.set('font_name_' + colNum, file.name);
        loadFontFace(fontName, "'" + dataUrl + "'");
        document.querySelector('#p-t' + colNum).style.fontFamily = fontName;

        // Parse axes from the same file
        const arrayBuffer = dataUrlToArrayBuffer(dataUrl);
        const axes = parseFontAxes(arrayBuffer);
        updateColumnAxes(colNum, axes);
    };
    readerUrl.readAsDataURL(file);
}

function initFontLoading() {
    const validExtensions = ['ttf', 'otf', 'woff', 'woff2'];

    COLUMN_IDS.forEach(colNum => {
        // File input handler
        const fileInput = document.querySelector('#importFont_' + colNum);
        if (fileInput) {
            fileInput.addEventListener('change', function (e) {
                if (e.target.files.length > 0) {
                    loadFontFile(e.target.files[0], colNum);
                }
            });
        }

        // Restore font from IndexedDB
        FontDB.get('font_' + colNum).then(stored => {
            if (stored) {
                const fontName = "'Col_font_" + colNum + "'";
                loadFontFace(fontName, "'" + stored + "'");
                const p = document.querySelector('#p-t' + colNum);
                if (p) p.style.fontFamily = fontName;

                // Parse axes if not already cached in localStorage
                if (!Storage.get('axes_' + colNum)) {
                    try {
                        const buf = dataUrlToArrayBuffer(stored);
                        const axes = parseFontAxes(buf);
                        updateColumnAxes(colNum, axes);
                    } catch (e) { /* ignore */ }
                }
            }
        });

        // Drag-and-drop
        const p = document.querySelector('#p-t' + colNum);
        if (!p) return;
        const colWrapper = p.closest('.col');
        if (!colWrapper) return;

        colWrapper.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            colWrapper.classList.add('drag-over');
        });

        colWrapper.addEventListener('dragleave', function (e) {
            e.preventDefault();
            e.stopPropagation();
            colWrapper.classList.remove('drag-over');
        });

        colWrapper.addEventListener('drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
            colWrapper.classList.remove('drag-over');
            if (e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                const ext = file.name.split('.').pop().toLowerCase();
                if (validExtensions.includes(ext)) {
                    loadFontFile(file, colNum);
                }
            }
        });
    });
}

// =========================================================================
// 5. TEXT SYNC, PASTE, SCROLL, TEXT IMPORT
// =========================================================================

let _textSyncing = false;

function getAllParagraphs() {
    return COLUMN_IDS.map(n => document.querySelector('#p-t' + n)).filter(Boolean);
}

function syncText(sourceElement) {
    if (_textSyncing) return;
    _textSyncing = true;

    let html = sourceElement.innerHTML
        .replace(/<div>/g, '\n').replace(/<\/div>/g, '');

    getAllParagraphs().forEach(p => {
        if (p !== sourceElement) {
            p.innerHTML = html.replace(/\n/g, '<br>');
        }
    });

    if (html.includes('<div></div>')) {
        html = html.replace(/<div><\/div>/g, '');
        sourceElement.innerHTML = html.replace(/\n/g, '<br>');
    }

    Storage.set(TEXT_STORAGE_KEY, html);
    _textSyncing = false;

    // Keep other columns' scroll position in sync after content replacement
    const sourceWrapper = sourceElement.closest('.col-p-wrapp');
    if (sourceWrapper) syncScrollFrom(sourceWrapper);

}

function loadTextFromStorage() {
    const saved = Storage.get(TEXT_STORAGE_KEY);
    if (saved) {
        getAllParagraphs().forEach(p => {
            p.innerHTML = saved.replace(/\n/g, '<br>');
        });
    }
}

function initTextSync() {
    getAllParagraphs().forEach(p => {
        p.addEventListener('input', function () {
            syncText(this);
        });
    });
}

// Paste without formatting
function initPasteHandlers() {
    getAllParagraphs().forEach(p => {
        p.addEventListener('paste', function (e) {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            syncText(this);
        });
    });
}

// Scroll sync
let _scrollWrappers = [];
let _activeScroller = null;

function syncScrollFrom(sourceWrapper) {
    if (!sourceWrapper) return;
    const scrollTop = sourceWrapper.scrollTop;
    _scrollWrappers.forEach(other => {
        if (other !== sourceWrapper) {
            other.scrollTop = scrollTop;
        }
    });
}

function initScrollSync() {
    _scrollWrappers = COLUMN_IDS.map(n =>
        document.querySelector('.col-scrl-' + n)
    ).filter(Boolean);

    _scrollWrappers.forEach(wrapper => {
        wrapper.addEventListener('scroll', function () {
            if (_activeScroller && _activeScroller !== this) return;
            _activeScroller = this;
            syncScrollFrom(this);
            requestAnimationFrame(() => { _activeScroller = null; });
        });
    });
}

function loadTextIntoColumns(text) {
    const html = text.replace(/&/g, '&amp;')
                     .replace(/</g, '&lt;')
                     .replace(/>/g, '&gt;')
                     .replace(/\n/g, '<br>');
    getAllParagraphs().forEach(p => {
        p.innerHTML = html;
    });
    Storage.set(TEXT_STORAGE_KEY, text);
}

// Text file import
function initTextImport() {
    const input = document.querySelector('#inputfile');
    if (!input) return;
    input.addEventListener('change', function (e) {
        if (e.target.files.length === 0) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            loadTextIntoColumns(ev.target.result);
        };
        reader.readAsText(e.target.files[0]);
    });
}

// Sample text dropdown
var SAMPLE_TEXTS = [
    { label: 'Pangrams', file: 'texts/pangrams.txt' },
    { label: 'Kafka', file: 'texts/kafka.txt' },
    { label: 'Arabic', file: 'texts/arabic.txt' },
    { label: 'Chinese', file: 'texts/chinese.txt' },
    { label: 'Kerning', file: 'texts/kerning.txt' },
    { label: 'Spacing', file: 'texts/spacing.txt' }
];

function initTextSelect() {
    var select = document.querySelector('#textSelect');
    if (!select) return;

    SAMPLE_TEXTS.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item.file;
        option.textContent = item.label;
        select.appendChild(option);
    });

    select.addEventListener('change', function () {
        if (!this.value) return;
        fetch(this.value)
            .then(function (r) { return r.text(); })
            .then(function (text) { loadTextIntoColumns(text); });
    });
}

// =========================================================================
// 6. HARD WRAP
// =========================================================================

// Word-wrap a string at maxWidth characters, preferring word boundaries
function wordWrap(str, maxWidth) {
    var result = '';
    while (str.length > maxWidth) {
        // Look backwards from maxWidth for a space to break at
        var found = false;
        for (var i = maxWidth - 1; i >= 0; i--) {
            if (/\s/.test(str.charAt(i))) {
                result += str.slice(0, i + 1) + '<br>';
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // No space found — force break at maxWidth
        if (!found) {
            result += str.slice(0, maxWidth) + '<br>';
            str = str.slice(maxWidth);
        }
    }
    return result + str;
}

function applyHardWrap() {
    var input = document.querySelector('#hardWrapInput');
    if (!input) return;
    var n = parseInt(input.value, 10);
    if (!n || n <= 0) return;

    // Get the raw text from the first paragraph
    var sourceP = document.querySelector('#p-t1');
    if (!sourceP) return;
    var text = sourceP.textContent;

    var wrapped = wordWrap(text, n);

    // Apply to all paragraphs and save
    getAllParagraphs().forEach(function (p) {
        p.innerHTML = wrapped;
    });
    Storage.set(TEXT_STORAGE_KEY, wrapped);
    Storage.set('HW_all', input.value);
}

function initHardWrap() {
    var input = document.querySelector('#hardWrapInput');
    if (!input) return;

    // Restore saved value
    var saved = Storage.get('HW_all');
    if (saved) input.value = saved;

    input.addEventListener('change', applyHardWrap);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyHardWrap();
        }
    });
}

// =========================================================================
// 7. COLUMN VISIBILITY
// =========================================================================

function getColumnRowInfo(colNum) {
    const row = COLUMN_LAYOUT.top.includes(colNum) ? 'top' : 'bottom';
    const columnId = row + '-column' + colNum;
    return { row, columnId };
}

function updateRowVisibility(rowKey, rowSelector) {
    const colNums = COLUMN_LAYOUT[rowKey];
    const allHidden = colNums.every(n => {
        const info = getColumnRowInfo(n);
        return Storage.get(info.columnId) === 'hidden';
    });
    const rowEl = document.querySelector(rowSelector);
    if (rowEl) {
        rowEl.style.display = allHidden ? 'none' : '';
        Storage.set('row-' + (rowKey === 'top' ? 'top' : 'bot'),
            allHidden ? 'hidden' : 'active');
    }
}

// Exposed globally for the toggle buttons
window.toggleColumn = function (colNum) {
    const { columnId } = getColumnRowInfo(colNum);
    const column = document.getElementById(columnId);
    if (!column) return;

    const isHidden = column.style.display === 'none';
    column.style.display = isHidden ? '' : 'none';
    Storage.set(columnId, isHidden ? 'active' : 'hidden');

    const gcpEl = document.querySelector('#gcp-' + colNum);
    if (gcpEl) {
        if (isHidden) {
            gcpEl.classList.replace('grid-col-prop-off', 'grid-col-prop');
        } else {
            gcpEl.classList.replace('grid-col-prop', 'grid-col-prop-off');
        }
    }

    updateRowVisibility('top', '#row-top');
    updateRowVisibility('bottom', '#row-bot');
};

function initColumnVisibility() {
    COLUMN_IDS.forEach(colNum => {
        const { columnId } = getColumnRowInfo(colNum);
        const state = Storage.get(columnId);

        if (state === 'hidden') {
            const col = document.getElementById(columnId);
            if (col) col.style.display = 'none';
        }

        const gcpEl = document.querySelector('#gcp-' + colNum);
        if (gcpEl) {
            if (state === 'hidden') {
                gcpEl.classList.replace('grid-col-prop', 'grid-col-prop-off');
            } else {
                gcpEl.classList.replace('grid-col-prop-off', 'grid-col-prop');
            }
        }
    });

    updateRowVisibility('top', '#row-top');
    updateRowVisibility('bottom', '#row-bot');

    // Attach toggle button handlers
    document.querySelectorAll('.btn-close[data-col]').forEach(btn => {
        btn.addEventListener('click', function () {
            window.toggleColumn(parseInt(this.dataset.col, 10));
        });
    });
}

// =========================================================================
// 8. UI UTILITIES
// =========================================================================

function initNumericInputFilters() {
    const inputs = document.querySelectorAll("[class^='filter-numeric']");
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^\d-]/g, '');
        });
        input.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                e.preventDefault();
                input.select();
                return;
            }
            if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' &&
                e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' &&
                (e.key !== '-' || input.value.includes('-') || input.selectionStart !== 0)) {
                e.preventDefault();
            }
        });
    });
}

function initSettingsPanel() {
    const panel = document.querySelector('#features-settings');
    if (!panel) return;

    const openBtn = document.querySelector('.open-features');
    if (openBtn) {
        openBtn.addEventListener('click', function () {
            panel.style.display = 'flex';
        });
    }

    const closeSpace = document.querySelector('#close-space');
    if (closeSpace) {
        closeSpace.addEventListener('click', function () {
            panel.style.display = 'none';
        });
    }
}

function initClearData() {
    const btn = document.querySelector('#resetStorage');
    if (btn) {
        btn.addEventListener('click', function () {
            Storage.clearAll();
        });
    }
}

function initHelloPopup() {
    const popup = document.querySelector('#hello-octopus');
    if (!popup) return;

    const stored = Storage.get('FirstOpen');
    if (stored === APP_VERSION) {
        popup.style.display = 'none';
        return;
    }
    if (stored !== null && stored !== APP_VERSION) {
        localStorage.removeItem('FirstOpen');
    }

    popup.addEventListener('click', function () {
        popup.style.display = 'none';
        Storage.set('FirstOpen', APP_VERSION);
    });
}

// =========================================================================
// 9. INITIALIZATION
// =========================================================================

function init() {
    initColumnVisibility();
    initFontLoading();
    initGlobalSettings();
    COLUMN_IDS.forEach(initColumnAxes);
    loadTextFromStorage();
    initTextSync();
    initPasteHandlers();
    initScrollSync();
    initTextImport();
    initTextSelect();
    initNumericInputFilters();
    initSettingsPanel();
    initClearData();
    initHelloPopup();
    initHardWrap();
}

document.addEventListener('DOMContentLoaded', init);

// Expose for external use

})();
