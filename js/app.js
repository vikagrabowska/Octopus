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
        locl: '',
        wght: '100',
        wdth: '100',
        opsz: '0',
        grad: '0'
    };

    const TRACKING_MULTIPLIER = 0.001;
    const SYNC_BREAK_CLASS = 'sync-break';
    const TEXT_STORAGE_KEY = 'txt';
    const APP_VERSION = 'V95.3';

    // =========================================================================
    // 2. STORAGE
    // =========================================================================

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
                    'font_' + n, 'font_name_' + n,
                    'inp-f-size-' + n, 'inp-f-tracking-' + n, 'inp-f-lineHeight-' + n,
                    'f-features-' + n, 'f-locl-' + n,
                    'wght-' + n, 'wdth-' + n, 'opsz-' + n, 'grad-' + n,
                    'HW_' + n
                );
                const row = COLUMN_LAYOUT.top.includes(n) ? 'top' : 'bottom';
                keys.push(row + '-column' + n);
            });
            keys.forEach(k => localStorage.removeItem(k));
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
            locl: document.querySelector('#f-locl-' + colNum),
            wght: document.querySelector('#wght-' + colNum),
            wdth: document.querySelector('#wdth-' + colNum),
            opsz: document.querySelector('#opsz-' + colNum),
            grad: document.querySelector('#grad-' + colNum)
        };
    }

    function applyColumnSettings(colNum) {
        const el = getColumnElements(colNum);
        if (!el.p) return;

        // Font size
        const size = el.fontSize.value || DEFAULTS.fontSize;
        el.p.style.fontSize = size + 'pt';
        Storage.set('inp-f-size-' + colNum, size);

        // Tracking
        const tracking = el.tracking.value || DEFAULTS.tracking;
        el.p.style.letterSpacing = (tracking * TRACKING_MULTIPLIER) + 'em';
        Storage.set('inp-f-tracking-' + colNum, tracking);

        // Line height
        const lh = el.lineHeight.value || DEFAULTS.lineHeight;
        el.p.style.lineHeight = lh;
        Storage.set('inp-f-lineHeight-' + colNum, lh);

        // OT features
        const features = el.features.value;
        el.p.style.fontFeatureSettings = features || 'normal';
        Storage.set('f-features-' + colNum, features);

        // Language
        const locl = el.locl.value;
        el.p.lang = locl;
        Storage.set('f-locl-' + colNum, locl);

        // Variable font axes
        const wght = el.wght.value || DEFAULTS.wght;
        const wdth = el.wdth.value || DEFAULTS.wdth;
        const opsz = el.opsz.value || DEFAULTS.opsz;
        const grad = el.grad.value || DEFAULTS.grad;
        Storage.set('wght-' + colNum, wght);
        Storage.set('wdth-' + colNum, wdth);
        Storage.set('opsz-' + colNum, opsz);
        Storage.set('grad-' + colNum, grad);
        el.p.style.fontVariationSettings =
            "'wght' " + wght + ", 'wdth' " + wdth +
            ", 'opsz' " + opsz + ", 'GRAD' " + grad;

        scheduleSyncLineBreaks();
    }

    function initColumnSettings(colNum) {
        const el = getColumnElements(colNum);
        if (!el.p) return;

        // Populate inputs from storage or defaults
        el.fontSize.value = Storage.get('inp-f-size-' + colNum, DEFAULTS.fontSize);
        el.tracking.value = Storage.get('inp-f-tracking-' + colNum, DEFAULTS.tracking);
        el.lineHeight.value = Storage.get('inp-f-lineHeight-' + colNum, DEFAULTS.lineHeight);
        el.features.value = Storage.get('f-features-' + colNum, DEFAULTS.features);
        el.locl.value = Storage.get('f-locl-' + colNum, DEFAULTS.locl);
        el.wght.value = Storage.get('wght-' + colNum, DEFAULTS.wght);
        el.wdth.value = Storage.get('wdth-' + colNum, DEFAULTS.wdth);
        el.opsz.value = Storage.get('opsz-' + colNum, DEFAULTS.opsz);
        el.grad.value = Storage.get('grad-' + colNum, DEFAULTS.grad);

        // Apply styles to paragraph
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

        const wght = el.wght.value || DEFAULTS.wght;
        const wdth = el.wdth.value || DEFAULTS.wdth;
        const opsz = el.opsz.value || DEFAULTS.opsz;
        const grad = el.grad.value || DEFAULTS.grad;
        el.p.style.fontVariationSettings =
            "'wght' " + wght + ", 'wdth' " + wdth +
            ", 'opsz' " + opsz + ", 'GRAD' " + grad;

        // Attach change listeners to all settings inputs
        const inputs = [
            el.fontSize, el.tracking, el.lineHeight,
            el.features, el.locl,
            el.wght, el.wdth, el.opsz, el.grad
        ];
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('change', () => applyColumnSettings(colNum));
                input.addEventListener('input', () => applyColumnSettings(colNum));
            }
        });
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

    function loadFontFile(file, colNum) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataUrl = e.target.result;
            const fontName = "'Col_font_" + colNum + "'";
            Storage.set('font_' + colNum, dataUrl);
            Storage.set('font_name_' + colNum, file.name);
            loadFontFace(fontName, "'" + dataUrl + "'");
            document.querySelector('#p-t' + colNum).style.fontFamily = fontName;
        };
        reader.readAsDataURL(file);
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

            // Restore font from localStorage
            const stored = Storage.get('font_' + colNum);
            if (stored) {
                const fontName = "'Col_font_" + colNum + "'";
                loadFontFace(fontName, "'" + stored + "'");
                const p = document.querySelector('#p-t' + colNum);
                if (p) p.style.fontFamily = fontName;
            }

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
    // 5. TEXT SYNC, PASTE, SCROLL, HARD WRAP, TEXT IMPORT
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

        // Reset break hash so the next sync re-applies breaks
        // (syncText wiped them from all non-focused columns via innerHTML)
        _lastBreakHash = '';
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
    function initScrollSync() {
        let _scrolling = false;
        const wrappers = COLUMN_IDS.map(n =>
            document.querySelector('.col-scrl-' + n)
        ).filter(Boolean);

        wrappers.forEach(wrapper => {
            wrapper.addEventListener('scroll', function () {
                if (_scrolling) return;
                _scrolling = true;
                const scrollTop = this.scrollTop;
                wrappers.forEach(other => {
                    if (other !== this) {
                        other.scrollTop = scrollTop;
                    }
                });
                _scrolling = false;
            });
        });
    }

    // Hard wrap
    function hardWrapText(maxWidth) {
        if (!maxWidth || maxWidth <= 0) return;

        const firstP = document.querySelector('#p-t1');
        if (!firstP) return;

        // Get clean text (strip sync breaks and HTML)
        const text = firstP.textContent;
        const lines = text.split('\n');
        const wrapped = [];

        lines.forEach(line => {
            if (line.length <= maxWidth) {
                wrapped.push(line);
                return;
            }
            let remaining = line;
            while (remaining.length > maxWidth) {
                let breakPos = -1;
                for (let i = maxWidth; i >= 0; i--) {
                    if (/\s/.test(remaining[i])) {
                        breakPos = i;
                        break;
                    }
                }
                if (breakPos <= 0) {
                    wrapped.push(remaining.slice(0, maxWidth));
                    remaining = remaining.slice(maxWidth);
                } else {
                    wrapped.push(remaining.slice(0, breakPos));
                    remaining = remaining.slice(breakPos + 1);
                }
            }
            if (remaining.length > 0) wrapped.push(remaining);
        });

        const result = wrapped.join('<br>');
        getAllParagraphs().forEach(p => {
            p.innerHTML = result;
        });
        Storage.set(TEXT_STORAGE_KEY, result);
        scheduleSyncLineBreaks();
    }

    function initHardWrap() {
        const input = document.querySelector('#hardWrapInputAll');
        if (input) {
            input.addEventListener('change', function () {
                hardWrapText(parseInt(this.value, 10));
            });
        }
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
                getAllParagraphs().forEach(p => {
                    p.textContent = text;
                });
                Storage.set(TEXT_STORAGE_KEY, text);
                scheduleSyncLineBreaks();
            };
            reader.readAsText(e.target.files[0]);
        });
    }

    // =========================================================================
    // 6. SYNCHRONIZED LINE BREAKS
    // =========================================================================

    let _syncTimer = null;
    let _syncing = false;
    let _observer = null;
    let _observedElements = [];
    let _lastBreakHash = '';

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

    function stripSyncBreaks(el) {
        const brs = el.querySelectorAll('br.' + SYNC_BREAK_CLASS);
        for (let i = brs.length - 1; i >= 0; i--) {
            brs[i].parentNode.removeChild(brs[i]);
        }
        el.normalize();
    }

    function getTextNodes(el) {
        const nodes = [];
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            nodes.push(node);
        }
        return nodes;
    }

    function detectWrapBreaks(el) {
        const textNodes = getTextNodes(el);
        const breaks = [];
        let lastY = null;

        for (let ni = 0; ni < textNodes.length; ni++) {
            const node = textNodes[ni];
            for (let ci = 0; ci < node.length; ci++) {
                const range = document.createRange();
                range.setStart(node, ci);
                range.setEnd(node, ci + 1);
                const rect = range.getBoundingClientRect();

                if (rect.width === 0 && rect.height === 0) continue;

                if (lastY !== null && rect.top > lastY + 1) {
                    let isBRBreak = false;
                    if (ci === 0) {
                        let prev = node.previousSibling;
                        while (prev) {
                            if (prev.nodeName === 'BR' && !prev.classList.contains(SYNC_BREAK_CLASS)) {
                                isBRBreak = true;
                                break;
                            }
                            if (prev.nodeType === 3 && prev.textContent.length > 0) break;
                            prev = prev.previousSibling;
                        }
                    }
                    if (!isBRBreak) {
                        breaks.push({ nodeIndex: ni, charOffset: ci });
                    }
                }
                lastY = rect.top;
            }
        }
        return breaks;
    }

    function applyBreaks(el, breaks) {
        const textNodes = getTextNodes(el);
        for (let i = breaks.length - 1; i >= 0; i--) {
            const brk = breaks[i];
            const node = textNodes[brk.nodeIndex];
            if (!node || brk.charOffset > node.length || brk.charOffset === 0) continue;
            const newNode = node.splitText(brk.charOffset);
            const br = document.createElement('br');
            br.className = SYNC_BREAK_CLASS;
            node.parentNode.insertBefore(br, newNode);
        }
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

    function syncLineBreaks() {
        if (_syncing) return;
        _syncing = true;
        pauseObserver();

        try {
            const columns = getVisibleColumns();
            if (columns.length < 2) return;

            const focusedP = document.activeElement;

            columns.forEach(stripSyncBreaks);
            void columns[0].offsetHeight;

            const allBreaks = columns.map(col => detectWrapBreaks(col));

            let maxIdx = 0;
            for (let i = 1; i < allBreaks.length; i++) {
                if (allBreaks[i].length > allBreaks[maxIdx].length) maxIdx = i;
            }

            if (allBreaks[maxIdx].length === 0) return;

            const breakHash = JSON.stringify(allBreaks[maxIdx]);
            if (breakHash === _lastBreakHash) return;
            _lastBreakHash = breakHash;

            columns.forEach((col, i) => {
                if (col !== focusedP && i !== maxIdx) {
                    applyBreaks(col, allBreaks[maxIdx]);
                }
            });
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
            document.fonts.addEventListener('loadingdone', scheduleSyncLineBreaks);
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
        initHardWrap();
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
})();
