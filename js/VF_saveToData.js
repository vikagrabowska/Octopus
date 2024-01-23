function initializeVariableFont(columnNumber, defaultValue) {
    const wghtSelector = `#wght-${columnNumber}`;
    const wdthSelector = `#wdth-${columnNumber}`;
    const opszSelector = `#opsz-${columnNumber}`;
    const gradSelector = `#grad-${columnNumber}`;
    const vf_tSelector = `#p-t${columnNumber}`;

    const key_wght = `wght-${columnNumber}`;
    const key_wdth = `wdth-${columnNumber}`;
    const key_opsz = `opsz-${columnNumber}`;
    const key_grad = `grad-${columnNumber}`;

    const defValue_wght = defaultValue.wght;
    const defValue_wdth = defaultValue.wdth;
    const defValue_opsz = defaultValue.opsz;
    const defValue_grad = defaultValue.grad;

    // WGHT
    initializeSingleVariableFont(key_wght, defValue_wght, wghtSelector);

    // WDTH
    initializeSingleVariableFont(key_wdth, defValue_wdth, wdthSelector);

    // OPSZ
    initializeSingleVariableFont(key_opsz, defValue_opsz, opszSelector);

    // GRAD
    initializeSingleVariableFont(key_grad, defValue_grad, gradSelector);

    function initializeSingleVariableFont(key, defaultValue, selector) {
        const storedValue = localStorage.getItem(key);

        if (storedValue === null) {
            const element = document.querySelector(selector);
            localStorage.setItem(key, defaultValue);
            element.value = defaultValue;
        } else {
            const element = document.querySelector(selector);
            element.value = storedValue;

            element.addEventListener('input', function () {
                const obj = document.querySelector(selector);
                localStorage.setItem(key, obj.value);
                updateVF(columnNumber);
            });

            element.style.fontVariationSettings = `'${key}' ${localStorage.getItem(key)}`;
        }
    }

    function updateVF(columnNumber) {
        const a = localStorage.getItem(`wght-${columnNumber}`);
        const b = localStorage.getItem(`wdth-${columnNumber}`);
        const c = localStorage.getItem(`opsz-${columnNumber}`);
        const d = localStorage.getItem(`grad-${columnNumber}`);
        document.querySelector(`#p-t${columnNumber}`).style.fontVariationSettings = `'wght' ${a}, 'wdth' ${b}, 'opsz' ${c}, 'GRAD' ${d}`;
    }
}

// Inicjalizacja kolumny 1
initializeVariableFont(1, { wght: "100", wdth: "100", opsz: "0", grad: "0" });
initializeVariableFont(2, { wght: "100", wdth: "100", opsz: "0", grad: "0" });
initializeVariableFont(3, { wght: "100", wdth: "100", opsz: "0", grad: "0" });
initializeVariableFont(4, { wght: "100", wdth: "100", opsz: "0", grad: "0" });
initializeVariableFont(5, { wght: "100", wdth: "100", opsz: "0", grad: "0" });
initializeVariableFont(6, { wght: "100", wdth: "100", opsz: "0", grad: "0" });
