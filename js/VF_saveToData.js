//
// Saving input values to browser memory (localStorage)
//

// For 1
// Window
const wght_1 =  "#wght-1";
const wdth_1 =  "#wdth-1";
const opsz_1 =  "#opsz-1";
// Text column
const vf_t_1 = "#p-t1";
// Keys
const key_wght_1 =  "wght-1";
const key_wdth_1 =  "wdth-1";
const key_opsz_1 =  "opsz-1";
// Default value
const defValue_wght_1 = "100";
const defValue_wdth_1 = "100";
const defValue_opsz_1 = "0";
// WGHT 1
if (localStorage.getItem(key_wght_1) == null) {
    const fWGHT_1 = document.querySelector(wght_1);
    const new_LS_wght_1 = localStorage.setItem(key_wght_1, defValue_wght_1);
    fWGHT_1.value = defValue_wght_1;
}
else{
    document.querySelector(wght_1).value = localStorage.getItem(key_wght_1);
    //function input 1
    function VFwght_1() {
        const obj = document.querySelector(wght_1);
        localStorage.setItem(key_wght_1, obj.value);
        useVF_1();
    }
}
// WDTH 1
if (localStorage.getItem(key_wdth_1) == null) {
    const fwdth_1 = document.querySelector(wdth_1);
    const new_LS_wdth_1 = localStorage.setItem(key_wdth_1, defValue_wdth_1);
    fwdth_1.value = defValue_wdth_1;
}
else{
    document.querySelector(wdth_1).value = localStorage.getItem(key_wdth_1);
    //function input 1
    function VFwdth_1() {
        const obj = document.querySelector(wdth_1);
        localStorage.setItem(key_wdth_1, obj.value);
        useVF_1();
    }
}
// OPSZ 1
if (localStorage.getItem(key_opsz_1) == null) {
    const fopsz_1 = document.querySelector(opsz_1);
    const new_LS_opsz_1 = localStorage.setItem(key_opsz_1, defValue_opsz_1);
    fopsz_1.value = defValue_opsz_1;
}
else{
    document.querySelector(opsz_1).value = localStorage.getItem(key_opsz_1);
    //function input 1
    function VFopsz_1() {
        const obj = document.querySelector(opsz_1);
        localStorage.setItem(key_opsz_1, obj.value);
        useVF_1();
    }
}

function useVF_1() {
    // console.log("dziala");
    const a = localStorage.getItem("wght-1");
    const b = localStorage.getItem("wdth-1");
    const c = localStorage.getItem("opsz-1");
    // t_1.innerHTML.style.fontVariationSettings = "'wght'" + a, "'wdth'" + b, "'opsz'" + c;
    document.querySelector("#p-t1").style.fontVariationSettings = "'wght'" + a + "," +  "'wdth'" + b + "," + "'opsz'" + c;
}
// For 2
// Window
const wght_2 =  "#wght-2";
const wdth_2 =  "#wdth-2";
const opsz_2 =  "#opsz-2";
// Text column
const vf_t_2 = "#p-t2";
// Keys
const key_wght_2 =  "wght-2";
const key_wdth_2 =  "wdth-2";
const key_opsz_2 =  "opsz-2";
// Default value
const defValue_wght_2 = "100";
const defValue_wdth_2 = "100";
const defValue_opsz_2 = "0";
// WGHT 2

if (localStorage.getItem(key_wght_2) == null) {
    const fWGHT_2 = document.querySelector(wght_2);
    const new_LS_wght_2 = localStorage.setItem(key_wght_2, defValue_wght_2);
    fWGHT_2.value = defValue_wght_2;
}
else{
    document.querySelector(wght_2).value = localStorage.getItem(key_wght_2);
    //function input 2
    function VFwght_2() {
        const obj = document.querySelector(wght_2);
        localStorage.setItem(key_wght_2, obj.value);
        useVF_2();
    }
}
// WDTH 2
if (localStorage.getItem(key_wdth_2) == null) {
    const fwdth_2 = document.querySelector(wdth_2);
    const new_LS_wdth_2 = localStorage.setItem(key_wdth_2, defValue_wdth_2);
    fwdth_2.value = defValue_wdth_2;
}
else{
    document.querySelector(wdth_2).value = localStorage.getItem(key_wdth_2);
    //function input 2
    function VFwdth_2() {
        const obj = document.querySelector(wdth_2);
        localStorage.setItem(key_wdth_2, obj.value);
        useVF_2();
    }
}
// OPSZ 2
if (localStorage.getItem(key_opsz_2) == null) {
    const fopsz_2 = document.querySelector(opsz_2);
    const new_LS_opsz_2 = localStorage.setItem(key_opsz_2, defValue_opsz_2);
    fopsz_2.value = defValue_opsz_2;
}
else{
    document.querySelector(opsz_2).value = localStorage.getItem(key_opsz_2);
    //function input 2
    function VFopsz_2() {
        const obj = document.querySelector(opsz_2);
        localStorage.setItem(key_opsz_2, obj.value);
        useVF_2();
    }
}

function useVF_2() {
    // console.log("dziala");
    const a = localStorage.getItem("wght-2");
    const b = localStorage.getItem("wdth-2");
    const c = localStorage.getItem("opsz-2");
    // t_2.innerHTML.style.fontVariationSettings = "'wght'" + a, "'wdth'" + b, "'opsz'" + c;
    document.querySelector("#p-t2").style.fontVariationSettings = "'wght'" + a + "," +  "'wdth'" + b + "," + "'opsz'" + c;
}
// For 3
// Window
const wght_3 =  "#wght-3";
const wdth_3 =  "#wdth-3";
const opsz_3 =  "#opsz-3";
// Text column
const vf_t_3 = "#p-t3";
// Keys
const key_wght_3 =  "wght-3";
const key_wdth_3 =  "wdth-3";
const key_opsz_3 =  "opsz-3";
// Default value
const defValue_wght_3 = "100";
const defValue_wdth_3 = "100";
const defValue_opsz_3 = "0";
// WGHT 3
if (localStorage.getItem(key_wght_3) == null) {
    const fWGHT_3 = document.querySelector(wght_3);
    const new_LS_wght_3 = localStorage.setItem(key_wght_3, defValue_wght_3);
    fWGHT_3.value = defValue_wght_3;
}
else{
    document.querySelector(wght_3).value = localStorage.getItem(key_wght_3);
    //function input 3
    function VFwght_3() {
        const obj = document.querySelector(wght_3);
        localStorage.setItem(key_wght_3, obj.value);
        useVF_3();
    }
}
// WDTH 3
if (localStorage.getItem(key_wdth_3) == null) {
    const fwdth_3 = document.querySelector(wdth_3);
    const new_LS_wdth_3 = localStorage.setItem(key_wdth_3, defValue_wdth_3);
    fwdth_3.value = defValue_wdth_3;
}
else{
    document.querySelector(wdth_3).value = localStorage.getItem(key_wdth_3);
    //function input 3
    function VFwdth_3() {
        const obj = document.querySelector(wdth_3);
        localStorage.setItem(key_wdth_3, obj.value);
        useVF_3();
    }
}
// OPSZ 3
if (localStorage.getItem(key_opsz_3) == null) {
    const fopsz_3 = document.querySelector(opsz_3);
    const new_LS_opsz_3 = localStorage.setItem(key_opsz_3, defValue_opsz_3);
    fopsz_3.value = defValue_opsz_3;
}
else{
    document.querySelector(opsz_3).value = localStorage.getItem(key_opsz_3);
    //function input 3
    function VFopsz_3() {
        const obj = document.querySelector(opsz_3);
        localStorage.setItem(key_opsz_3, obj.value);
        useVF_3();
    }
}

function useVF_3() {
    // console.log("dziala");
    const a = localStorage.getItem("wght-3");
    const b = localStorage.getItem("wdth-3");
    const c = localStorage.getItem("opsz-3");
    // t_3.innerHTML.style.fontVariationSettings = "'wght'" + a, "'wdth'" + b, "'opsz'" + c;
    document.querySelector("#p-t3").style.fontVariationSettings = "'wght'" + a + "," +  "'wdth'" + b + "," + "'opsz'" + c;
}
// For 4
// Window
const wght_4 =  "#wght-4";
const wdth_4 =  "#wdth-4";
const opsz_4 =  "#opsz-4";
// Text column
const vf_t_4 = "#p-t4";
// Keys
const key_wght_4 =  "wght-4";
const key_wdth_4 =  "wdth-4";
const key_opsz_4 =  "opsz-4";
// Default value
const defValue_wght_4 = "100";
const defValue_wdth_4 = "100";
const defValue_opsz_4 = "0";
// WGHT 4
if (localStorage.getItem(key_wght_4) == null) {
    const fWGHT_4 = document.querySelector(wght_4);
    const new_LS_wght_4 = localStorage.setItem(key_wght_4, defValue_wght_4);
    fWGHT_4.value = defValue_wght_4;
}
else{
    document.querySelector(wght_4).value = localStorage.getItem(key_wght_4);
    //function input 4
    function VFwght_4() {
        const obj = document.querySelector(wght_4);
        localStorage.setItem(key_wght_4, obj.value);
        useVF_4();
    }
}
// WDTH 4
if (localStorage.getItem(key_wdth_4) == null) {
    const fwdth_4 = document.querySelector(wdth_4);
    const new_LS_wdth_4 = localStorage.setItem(key_wdth_4, defValue_wdth_4);
    fwdth_4.value = defValue_wdth_4;
}
else{
    document.querySelector(wdth_4).value = localStorage.getItem(key_wdth_4);
    //function input 4
    function VFwdth_4() {
        const obj = document.querySelector(wdth_4);
        localStorage.setItem(key_wdth_4, obj.value);
        useVF_4();
    }
}
// OPSZ 4
if (localStorage.getItem(key_opsz_4) == null) {
    const fopsz_4 = document.querySelector(opsz_4);
    const new_LS_opsz_4 = localStorage.setItem(key_opsz_4, defValue_opsz_4);
    fopsz_4.value = defValue_opsz_4;
}
else{
    document.querySelector(opsz_4).value = localStorage.getItem(key_opsz_4);
    //function input 4
    function VFopsz_4() {
        const obj = document.querySelector(opsz_4);
        localStorage.setItem(key_opsz_4, obj.value);
        useVF_4();
    }
}

function useVF_4() {
    // console.log("dziala");
    const a = localStorage.getItem("wght-4");
    const b = localStorage.getItem("wdth-4");
    const c = localStorage.getItem("opsz-4");
    // t_4.innerHTML.style.fontVariationSettings = "'wght'" + a, "'wdth'" + b, "'opsz'" + c;
    document.querySelector("#p-t4").style.fontVariationSettings = "'wght'" + a + "," +  "'wdth'" + b + "," + "'opsz'" + c;
}
// For 5
// Window
const wght_5 =  "#wght-5";
const wdth_5 =  "#wdth-5";
const opsz_5 =  "#opsz-5";
// Text column
const vf_t_5 = "#p-t5";
// Keys
const key_wght_5 =  "wght-5";
const key_wdth_5 =  "wdth-5";
const key_opsz_5 =  "opsz-5";
// Default value
const defValue_wght_5 = "100";
const defValue_wdth_5 = "100";
const defValue_opsz_5 = "0";
// WGHT 5
if (localStorage.getItem(key_wght_5) == null) {
    const fWGHT_5 = document.querySelector(wght_5);
    const new_LS_wght_5 = localStorage.setItem(key_wght_5, defValue_wght_5);
    fWGHT_5.value = defValue_wght_5;
}
else{
    document.querySelector(wght_5).value = localStorage.getItem(key_wght_5);
    //function input 5
    function VFwght_5() {
        const obj = document.querySelector(wght_5);
        localStorage.setItem(key_wght_5, obj.value);
        useVF_5();
    }
}
// WDTH 5
if (localStorage.getItem(key_wdth_5) == null) {
    const fwdth_5 = document.querySelector(wdth_5);
    const new_LS_wdth_5 = localStorage.setItem(key_wdth_5, defValue_wdth_5);
    fwdth_5.value = defValue_wdth_5;
}
else{
    document.querySelector(wdth_5).value = localStorage.getItem(key_wdth_5);
    //function input 5
    function VFwdth_5() {
        const obj = document.querySelector(wdth_5);
        localStorage.setItem(key_wdth_5, obj.value);
        useVF_5();
    }
}
// OPSZ 5
if (localStorage.getItem(key_opsz_5) == null) {
    const fopsz_5 = document.querySelector(opsz_5);
    const new_LS_opsz_5 = localStorage.setItem(key_opsz_5, defValue_opsz_5);
    fopsz_5.value = defValue_opsz_5;
}
else{
    document.querySelector(opsz_5).value = localStorage.getItem(key_opsz_5);
    //function input 5
    function VFopsz_5() {
        const obj = document.querySelector(opsz_5);
        localStorage.setItem(key_opsz_5, obj.value);
        useVF_5();
    }
}

function useVF_5() {
    // console.log("dziala");
    const a = localStorage.getItem("wght-5");
    const b = localStorage.getItem("wdth-5");
    const c = localStorage.getItem("opsz-5");
    // t_5.innerHTML.style.fontVariationSettings = "'wght'" + a, "'wdth'" + b, "'opsz'" + c;
    document.querySelector("#p-t5").style.fontVariationSettings = "'wght'" + a + "," +  "'wdth'" + b + "," + "'opsz'" + c;
}
// For 6
// Window
const wght_6 =  "#wght-6";
const wdth_6 =  "#wdth-6";
const opsz_6 =  "#opsz-6";
// Text column
const vf_t_6 = "#p-t6";
// Keys
const key_wght_6 =  "wght-6";
const key_wdth_6 =  "wdth-6";
const key_opsz_6 =  "opsz-6";
// Default value
const defValue_wght_6 = "100";
const defValue_wdth_6 = "100";
const defValue_opsz_6 = "0";
// WGHT 6
if (localStorage.getItem(key_wght_6) == null) {
    const fWGHT_6 = document.querySelector(wght_6);
    const new_LS_wght_6 = localStorage.setItem(key_wght_6, defValue_wght_6);
    fWGHT_6.value = defValue_wght_6;
}
else{
    document.querySelector(wght_6).value = localStorage.getItem(key_wght_6);
    //function input 6
    function VFwght_6() {
        const obj = document.querySelector(wght_6);
        localStorage.setItem(key_wght_6, obj.value);
        useVF_6();
    }
}
// WDTH 6
if (localStorage.getItem(key_wdth_6) == null) {
    const fwdth_6 = document.querySelector(wdth_6);
    const new_LS_wdth_6 = localStorage.setItem(key_wdth_6, defValue_wdth_6);
    fwdth_6.value = defValue_wdth_6;
}
else{
    document.querySelector(wdth_6).value = localStorage.getItem(key_wdth_6);
    //function input 6
    function VFwdth_6() {
        const obj = document.querySelector(wdth_6);
        localStorage.setItem(key_wdth_6, obj.value);
        useVF_6();
    }
}
// OPSZ 6
if (localStorage.getItem(key_opsz_6) == null) {
    const fopsz_6 = document.querySelector(opsz_6);
    const new_LS_opsz_6 = localStorage.setItem(key_opsz_6, defValue_opsz_6);
    fopsz_6.value = defValue_opsz_6;
}
else{
    document.querySelector(opsz_6).value = localStorage.getItem(key_opsz_6);
    //function input 6
    function VFopsz_6() {
        const obj = document.querySelector(opsz_6);
        localStorage.setItem(key_opsz_6, obj.value);
        useVF_6();
    }
}

function useVF_6() {
    // console.log("dziala");
    const a = localStorage.getItem("wght-6");
    const b = localStorage.getItem("wdth-6");
    const c = localStorage.getItem("opsz-6");
    // t_6.innerHTML.style.fontVariationSettings = "'wght'" + a, "'wdth'" + b, "'opsz'" + c;
    document.querySelector("#p-t6").style.fontVariationSettings = "'wght'" + a + "," +  "'wdth'" + b + "," + "'opsz'" + c;
}