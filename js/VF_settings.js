// Attaching static VF axes in assigned text frames
// Consider changing to a list and looping through
// Loading variables

const form_1 = document.querySelector('#form-1');
// #1
const wght_1 = document.getElementById('wght-1');
const wdth_1 = document.getElementById('wdth-1');
const opsz_1 = document.getElementById('opsz-1');
const grad_1 = document.getElementById('grad-1'); // #
const hw_1 = document.getElementById('hard-wrap-input-1');

// Loading LocalStorage data
// #1
wght_1.value = localStorage.getItem('wght-1');
wdth_1.value = localStorage.getItem('wdth-1');
opsz_1.value = localStorage.getItem('opsz-1');
grad_1.value = localStorage.getItem('grad-1'); // #
hw_1.value = localStorage.getItem('hard-wrap-input-1');

// Using the saved data in the text
document.querySelector('#p-t1').style.fontVariationSettings = ("'wght'" + wght_1.value + ', ' + "'wdth'" + wdth_1.value + ', ' + "'opsz'" + opsz_1.value + ', ' + "'GRAD'" + grad_1.value); // #

// #1 Data saving method
form_1.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('wght-1', wght_1.value);
    localStorage.setItem('wdth-1', wdth_1.value);
    localStorage.setItem('opsz-1', opsz_1.value);
    localStorage.setItem('grad-1', grad_1.value); //#
    localStorage.setItem('hard-wrap-input-1', hw_1.value);

    const a = wght_1.value;
    const b = wdth_1.value;
    const c = opsz_1.value;
    const d = grad_1.value; //#

    // column #1
    document.tx_1.style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c + ', ' + "'GRAD'" + d);
});
// column #1
function editVF_1() {
    const a = document.getElementById('wght-1').value;
    const b = document.getElementById('wdth-1').value;
    const c = document.getElementById('opsz-1').value;
    const d = document.getElementById('grad-1').value;
    document.getElementById('p-t1').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c + ', ' + "'GRAD'" + d);
}

//2
const form_2 = document.querySelector('#form-2');
// #2
const wght_2 = document.getElementById('wght-2');
const wdth_2 = document.getElementById('wdth-2');
const opsz_2 = document.getElementById('opsz-2');
const hw_2 = document.getElementById('hard-wrap-input-2');

// Loading LocalStorage data
// #2
wght_2.value = localStorage.getItem('wght-2');
wdth_2.value = localStorage.getItem('wdth-2');
opsz_2.value = localStorage.getItem('opsz-2');

// Using the saved data in the text
document.querySelector('#p-t2').style.fontVariationSettings = ("'wght'" + wght_2.value + ', ' + "'wdth'" + wdth_2.value + ', ' + "'opsz'" + opsz_2.value);

// #2 Data saving method
form_2.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('wght-2', wght_2.value);
    localStorage.setItem('wdth-2', wdth_2.value);
    localStorage.setItem('opsz-2', opsz_2.value);
    localStorage.setItem('hard-wrap-input-2', hw_2.value);

    const a = wght_2.value;
    const b = wdth_2.value;
    const c = opsz_2.value;

    // column #2
    document.getElementById('p-t2').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
});
// column #2
function editVF_2() {
    const a = document.getElementById('wght-2').value;
    const b = document.getElementById('wdth-2').value;
    const c = document.getElementById('opsz-2').value;
    document.getElementById('p-t2').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
}

//3
const form_3 = document.querySelector('#form-3');
// #3
const wght_3 = document.getElementById('wght-3');
const wdth_3 = document.getElementById('wdth-3');
const opsz_3 = document.getElementById('opsz-3');
const hw_3 = document.getElementById('hard-wrap-input-3');

// Loading LocalStorage data
// #3
wght_3.value = localStorage.getItem('wght-3');
wdth_3.value = localStorage.getItem('wdth-3');
opsz_3.value = localStorage.getItem('opsz-3');
hw_3.value = localStorage.getItem('hard-wrap-input-3');

// Using the saved data in the text
document.querySelector('#p-t3').style.fontVariationSettings = ("'wght'" + wght_3.value + ', ' + "'wdth'" + wdth_3.value + ', ' + "'opsz'" + opsz_3.value);

// #3 Data saving method
form_3.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('wght-3', wght_3.value);
    localStorage.setItem('wdth-3', wdth_3.value);
    localStorage.setItem('opsz-3', opsz_3.value);
    localStorage.setItem('hard-wrap-input-3', hw_3.value);

    const a = wght_3.value;
    const b = wdth_3.value;
    const c = opsz_3.value;

    // column #3
    document.getElementById('p-t3').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
});
// column #3
function editVF_3() {
    const a = document.getElementById('wght-3').value;
    const b = document.getElementById('wdth-3').value;
    const c = document.getElementById('opsz-3').value;
    document.getElementById('p-t3').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
}
//4
const form_4 = document.querySelector('#form-4');
// #4
const wght_4 = document.getElementById('wght-4');
const wdth_4 = document.getElementById('wdth-4');
const opsz_4 = document.getElementById('opsz-4');
const hw_4 = document.getElementById('hard-wrap-input-4');

// Loading LocalStorage data
// #4
wght_4.value = localStorage.getItem('wght-4');
wdth_4.value = localStorage.getItem('wdth-4');
opsz_4.value = localStorage.getItem('opsz-4');
hw_4.value = localStorage.getItem('hard-wrap-input-4');

// Using the saved data in the text
document.querySelector('#p-t4').style.fontVariationSettings = ("'wght'" + wght_4.value + ', ' + "'wdth'" + wdth_4.value + ', ' + "'opsz'" + opsz_4.value);

// #4 Data saving method
form_4.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('wght-4', wght_4.value);
    localStorage.setItem('wdth-4', wdth_4.value);
    localStorage.setItem('opsz-4', opsz_4.value);
    localStorage.setItem('hard-wrap-input-4', hw_4.value);

    const a = wght_4.value;
    const b = wdth_4.value;
    const c = opsz_4.value;
    // column #4
    document.getElementById('p-t4').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
});

// column #4
function editVF_4() {
    const a = document.getElementById('wght-4').value;
    const b = document.getElementById('wdth-4').value;
    const c = document.getElementById('opsz-4').value;
    document.getElementById('p-t4').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
}

//5
const form_5 = document.querySelector('#form-5');

// #5
const wght_5 = document.getElementById('wght-5');
const wdth_5 = document.getElementById('wdth-5');
const opsz_5 = document.getElementById('opsz-5');
const hw_5 = document.getElementById('hard-wrap-input-5');

// Loading LocalStorage data
// #5
wght_5.value = localStorage.getItem('wght-5');
wdth_5.value = localStorage.getItem('wdth-5');
opsz_5.value = localStorage.getItem('opsz-5');
hw_5.value = localStorage.getItem('hard-wrap-input-5');

// Using the saved data in the text
document.querySelector('#p-t5').style.fontVariationSettings = ("'wght'" + wght_5.value + ', ' + "'wdth'" + wdth_5.value + ', ' + "'opsz'" + opsz_5.value);

// #5 Data saving method
form_5.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('wght-5', wght_5.value);
    localStorage.setItem('wdth-5', wdth_5.value);
    localStorage.setItem('opsz-5', opsz_5.value);
    localStorage.setItem('hard-wrap-input-5', hw_5.value);

    const a = wght_5.value;
    const b = wdth_5.value;
    const c = opsz_5.value;
    // column #5
    document.getElementById('p-t5').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
});
// column #5
function editVF_5() {
    const a = document.getElementById('wght-5').value;
    const b = document.getElementById('wdth-5').value;
    const c = document.getElementById('opsz-5').value;
    document.getElementById('p-t5').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
}

//6
const form_6 = document.querySelector('#form-6');

// #6
const wght_6 = document.getElementById('wght-6');
const wdth_6 = document.getElementById('wdth-6');
const opsz_6 = document.getElementById('opsz-6');
const hw_6 = document.getElementById('hard-wrap-input-6');

// Loading LocalStorage data
// #1
wght_6.value = localStorage.getItem('wght-6');
wdth_6.value = localStorage.getItem('wdth-6');
opsz_6.value = localStorage.getItem('opsz-6');
hw_6.value = localStorage.getItem('hard-wrap-input-6');

// Using the saved data in the text
document.querySelector('#p-t6').style.fontVariationSettings = ("'wght'" + wght_6.value + ', ' + "'wdth'" + wdth_6.value + ', ' + "'opsz'" + opsz_6.value);

// #6 Data saving method
form_6.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('wght-6', wght_6.value);
    localStorage.setItem('wdth-6', wdth_6.value);
    localStorage.setItem('opsz-6', opsz_6.value);
    localStorage.setItem('hard-wrap-input-6', hw_6.value);

    const a = wght_6.value;
    const b = wdth_6.value;
    const c = opsz_6.value;
    // column #6
    document.getElementById('p-t6').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
});
// column #6 
function editVF_6() {
    const a = document.getElementById('wght-6').value;
    const b = document.getElementById('wdth-6').value;
    const c = document.getElementById('opsz-6').value;
    document.getElementById('p-t6').style.fontVariationSettings = ("'wght'" + a + ', ' + "'wdth'" + b + ', ' + "'opsz'" + c);
}
