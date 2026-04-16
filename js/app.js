// Octopus Font Comparison App
// Single-file rewrite — replaces 12 JS files + inline scripts

import { prepareWithSegments, layoutWithLines, clearCache } from 'https://esm.sh/@chenglou/pretext@0.0.5';

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
const SYNC_BREAK_CLASS = 'sync-break';
const TEXT_STORAGE_KEY = 'txt';
const APP_VERSION = 'V95.3';

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
        const keys = ['FirstOpen', TEXT_STORAGE_KEY, 'row-top', 'row-bot'];
        COLUMN_IDS.forEach(n => {
            keys.push(
                'font_name_' + n, 'axes_' + n,
                'inp-f-size-' + n, 'inp-f-tracking-' + n, 'inp-f-lineHeight-' + n,
                'f-features-' + n, 'f-locl-' + n
            );
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

function getColumnElements(colNum) {
    return {
        p: document.querySelector('#p-t' + colNum),
        fontSize: document.querySelector('#inp-f-size-' + colNum),
        tracking: document.querySelector('#inp-f-tracking-' + colNum),
        lineHeight: document.querySelector('#inp-f-lineHeight-' + colNum),
        features: document.querySelector('#f-features-' + colNum),
        locl: document.querySelector('#f-locl-' + colNum)
    };
}

// --- Variable font axes (dynamic) ---

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

        // Restore from storage or use font default
        input.value = Storage.get(
            axis.tag + '-' + colNum,
            String(axis.defaultValue)
        );

        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);

        // Numeric filtering for dynamically created inputs
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^\d.-]/g, '');
        });

        // Live update on change
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
    scheduleSyncLineBreaks();
}

// --- Typography settings (non-axis) ---

function applyColumnSettings(colNum) {
    const el = getColumnElements(colNum);
    if (!el.p) return;

    const size = el.fontSize.value || DEFAULTS.fontSize;
    el.p.style.fontSize = size + 'pt';
    Storage.set('inp-f-size-' + colNum, size);

    const tracking = el.tracking.value || DEFAULTS.tracking;
    el.p.style.letterSpacing = (tracking * TRACKING_MULTIPLIER) + 'em';
    Storage.set('inp-f-tracking-' + colNum, tracking);

    const lh = el.lineHeight.value || DEFAULTS.lineHeight;
    el.p.style.lineHeight = lh;
    Storage.set('inp-f-lineHeight-' + colNum, lh);

    const features = el.features.value;
    el.p.style.fontFeatureSettings = features || 'normal';
    Storage.set('f-features-' + colNum, features);

    const locl = el.locl.value;
    el.p.lang = locl;
    Storage.set('f-locl-' + colNum, locl);

    scheduleSyncLineBreaks();
}

function initColumnSettings(colNum) {
    const el = getColumnElements(colNum);
    if (!el.p) return;

    el.fontSize.value = Storage.get('inp-f-size-' + colNum, DEFAULTS.fontSize);
    el.tracking.value = Storage.get('inp-f-tracking-' + colNum, DEFAULTS.tracking);
    el.lineHeight.value = Storage.get('inp-f-lineHeight-' + colNum, DEFAULTS.lineHeight);
    el.features.value = Storage.get('f-features-' + colNum, DEFAULTS.features);
    el.locl.value = Storage.get('f-locl-' + colNum, DEFAULTS.locl);

    const size = el.fontSize.value || DEFAULTS.fontSize;
    el.p.style.fontSize = size + 'pt';

    const tracking = el.tracking.value || DEFAULTS.tracking;
    el.p.style.letterSpacing = (tracking * TRACKING_MULTIPLIER) + 'em';

    const lh = el.lineHeight.value || DEFAULTS.lineHeight;
    el.p.style.lineHeight = lh;

    const features = el.features.value;
    if (features) el.p.style.fontFeatureSettings = features;

    const locl = el.locl.value;
    if (locl) el.p.lang = locl;

    // Attach change listeners to typography settings
    const inputs = [el.fontSize, el.tracking, el.lineHeight, el.features, el.locl];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('change', () => applyColumnSettings(colNum));
            input.addEventListener('input', () => applyColumnSettings(colNum));
        }
    });

    // Restore axes from localStorage if previously saved
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
        .replace(/<br\s+class="sync-break"\s*\/?>/gi, '')
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

    scheduleSyncLineBreaks();
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

// Text file import
function initTextImport() {
    const input = document.querySelector('#inputfile');
    if (!input) return;
    input.addEventListener('change', function (e) {
        if (e.target.files.length === 0) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            const text = ev.target.result;
            const html = text.replace(/&/g, '&amp;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;')
                             .replace(/\n/g, '<br>');
            getAllParagraphs().forEach(p => {
                p.innerHTML = html;
            });
            Storage.set(TEXT_STORAGE_KEY, text);
            scheduleSyncLineBreaks();
        };
        reader.readAsText(e.target.files[0]);
    });
}

// =========================================================================
// 6. SYNCHRONIZED LINE BREAKS (via pretext)
// =========================================================================

let _syncTimer = null;
let _syncing = false;
let _observer = null;
let _observedElements = [];

function getVisibleColumns() {
    const cols = [];
    COLUMN_IDS.forEach(n => {
        const p = document.querySelector('#p-t' + n);
        if (!p) return;
        const col = p.closest('.col');
        if (col && col.style.display !== 'none') {
            cols.push(p);
        }
    });
    return cols;
}

function getColNum(pElement) {
    return parseInt(pElement.id.replace('p-t', ''), 10);
}

function getColumnFontCSS(colNum) {
    const p = document.querySelector('#p-t' + colNum);
    if (!p) return '';
    return window.getComputedStyle(p).font;
}

function getColumnWidthPx(colNum) {
    const p = document.querySelector('#p-t' + colNum);
    return p ? p.clientWidth : 0;
}

function getColumnLineHeightPx(colNum) {
    const p = document.querySelector('#p-t' + colNum);
    if (!p) return 0;
    const lh = window.getComputedStyle(p).lineHeight;
    if (lh === 'normal') {
        return parseFloat(window.getComputedStyle(p).fontSize) * 1.2;
    }
    return parseFloat(lh);
}

// Extract plain text from a paragraph element, stripping sync breaks
// and converting real <br> to \n
function getPlainText(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('br.' + SYNC_BREAK_CLASS).forEach(br => br.remove());
    clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    return clone.textContent;
}

function stripSyncBreaks(el) {
    const brs = el.querySelectorAll('br.' + SYNC_BREAK_CLASS);
    for (let i = brs.length - 1; i >= 0; i--) {
        brs[i].parentNode.removeChild(brs[i]);
    }
    el.normalize();
}

// Compute character offsets where soft wraps occur within a single paragraph
function computeParagraphBreaks(paragraphText, fontCSS, widthPx, lineHeightPx) {
    if (!paragraphText) return [];
    const prepared = prepareWithSegments(paragraphText, fontCSS);
    const result = layoutWithLines(prepared, widthPx, lineHeightPx);
    const breaks = [];
    let offset = 0;
    for (let i = 0; i < result.lines.length - 1; i++) {
        offset += result.lines[i].text.length;
        breaks.push(offset);
    }
    return breaks;
}

// Compute all break offsets (in the full text) for a given column
function computeColumnBreaks(fullText, colNum) {
    const fontCSS = getColumnFontCSS(colNum);
    const widthPx = getColumnWidthPx(colNum);
    const lhPx = getColumnLineHeightPx(colNum);
    if (!fontCSS || widthPx <= 0 || lhPx <= 0) return [];

    const paragraphs = fullText.split('\n');
    const breaks = [];
    let globalOffset = 0;
    for (const para of paragraphs) {
        if (para.length > 0) {
            const paraBreaks = computeParagraphBreaks(para, fontCSS, widthPx, lhPx);
            paraBreaks.forEach(b => breaks.push(globalOffset + b));
        }
        globalOffset += para.length + 1; // +1 for the \n
    }
    return breaks;
}

// Build HTML from plain text, inserting <br class="sync-break"> at given offsets
function buildHTMLWithSyncBreaks(fullText, breakOffsets) {
    const breakSet = new Set(breakOffsets);
    let html = '';
    for (let i = 0; i < fullText.length; i++) {
        if (breakSet.has(i)) {
            html += '<br class="' + SYNC_BREAK_CLASS + '">';
        }
        const ch = fullText[i];
        if (ch === '\n') {
            html += '<br>';
        } else if (ch === '&') {
            html += '&amp;';
        } else if (ch === '<') {
            html += '&lt;';
        } else if (ch === '>') {
            html += '&gt;';
        } else {
            html += ch;
        }
    }
    return html;
}

function pauseObserver() {
    if (_observer) _observer.disconnect();
}

function resumeObserver() {
    if (!_observer) return;
    _observedElements.forEach(p => {
        _observer.observe(p, {
            childList: true,
            characterData: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });
    });
}

// Cursor save/restore — counts flat character offset, skipping sync-break <br>s

function getTextNodes(el) {
    const nodes = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        nodes.push(node);
    }
    return nodes;
}

function saveCursorOffset(el) {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!el.contains(range.startContainer)) return null;

    let offset = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_ALL);
    let node;
    while ((node = walker.nextNode())) {
        if (node === range.startContainer) {
            offset += range.startOffset;
            break;
        }
        if (node.nodeType === 3) {
            offset += node.length;
        }
    }
    return offset;
}

function restoreCursorOffset(el, targetOffset) {
    if (targetOffset === null) return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let counted = 0;
    let node;
    while ((node = walker.nextNode())) {
        if (counted + node.length >= targetOffset) {
            const sel = window.getSelection();
            const range = document.createRange();
            range.setStart(node, targetOffset - counted);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }
        counted += node.length;
    }
}

function syncLineBreaks() {
    if (_syncing) return;
    _syncing = true;
    pauseObserver();

    try {
        const columns = getVisibleColumns();
        if (columns.length < 2) return;

        // Save cursor in focused column before modifying DOM
        const focusedP = document.activeElement;
        let cursorOffset = null;
        const focusedIdx = columns.indexOf(focusedP);
        if (focusedIdx >= 0) {
            cursorOffset = saveCursorOffset(focusedP);
        }

        // Get plain text (same across all columns)
        const text = getPlainText(columns[0]);
        if (!text) return;

        // Compute breaks for each column, pick the one with the most
        let refBreaks = [];
        let refIdx = 0;
        columns.forEach((col, i) => {
            const colNum = getColNum(col);
            const breaks = computeColumnBreaks(text, colNum);
            if (breaks.length > refBreaks.length) {
                refBreaks = breaks;
                refIdx = i;
            }
        });

        if (refBreaks.length === 0) {
            // No breaks needed — just strip any old sync breaks
            columns.forEach(stripSyncBreaks);
            return;
        }

        // Build HTML with sync breaks
        const syncedHTML = buildHTMLWithSyncBreaks(text, refBreaks);
        // Reference column gets clean HTML (wraps naturally at those positions)
        const cleanHTML = buildHTMLWithSyncBreaks(text, []);

        columns.forEach((col, i) => {
            col.innerHTML = (i === refIdx) ? cleanHTML : syncedHTML;
        });

        // Restore cursor in focused column
        if (focusedIdx >= 0 && cursorOffset !== null) {
            restoreCursorOffset(focusedP, cursorOffset);
        }

        // Re-sync scroll positions after DOM changes
        const focusedWrapper = focusedP && focusedP.closest('.col-p-wrapp');
        if (focusedWrapper) {
            syncScrollFrom(focusedWrapper);
        }
    } finally {
        _syncing = false;
        Promise.resolve().then(resumeObserver);
    }
}

function scheduleSyncLineBreaks() {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(syncLineBreaks, 200);
}

function initLineBreakSync() {
    _observer = new MutationObserver(function () {
        if (_syncing || _textSyncing) return;
        scheduleSyncLineBreaks();
    });

    COLUMN_IDS.forEach(n => {
        const p = document.querySelector('#p-t' + n);
        if (p) {
            _observedElements.push(p);
            _observer.observe(p, {
                childList: true,
                characterData: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });
            p.addEventListener('blur', scheduleSyncLineBreaks);
        }
    });

    window.addEventListener('resize', scheduleSyncLineBreaks);
    if (document.fonts && document.fonts.addEventListener) {
        document.fonts.addEventListener('loadingdone', function () {
            clearCache(); // invalidate pretext's canvas measurement cache
            scheduleSyncLineBreaks();
        });
    }
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
    scheduleSyncLineBreaks();
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

    const openBtn = document.querySelector('#open-features');
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
    COLUMN_IDS.forEach(initColumnSettings);
    loadTextFromStorage();
    initTextSync();
    initPasteHandlers();
    initScrollSync();
    initTextImport();
    initNumericInputFilters();
    initSettingsPanel();
    initClearData();
    initHelloPopup();
    initLineBreakSync();
    setTimeout(scheduleSyncLineBreaks, 500);
}

document.addEventListener('DOMContentLoaded', init);

// Expose for external use
window.scheduleSyncLineBreaks = scheduleSyncLineBreaks;
