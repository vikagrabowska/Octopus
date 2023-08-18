//
// Functions saving data from inputs to browser memory (localStorage)
//

// Data recording for:
// - Letter case
// - Line spacing
// - Spacing
// - Features
// - .locl
//
// Font in the file "./ImportFont.js"

// For 1
// Window
const fSize_1 = "#inp-f-size-1";
let fTracking_1 = "#inp-f-tracking-1";
const fLineHeight_1 = "#inp-f-lineHeight-1";
const fFeatures_1 = "#f-features-1";
const fLocl_1 = "#f-locl-1";
// VF

// Text column
const id_t_1 = "#p-t1";

// Keys
const key_fSize_1 = "inp-f-size-1";
const key_fTracking_1 = "inp-f-tracking-1";
const key_fLineHeight_1 = "inp-f-lineHeight-1";
const key_fFeatures_1 = "f-features-1";
const key_fLocl_1 = "f-locl-1";

// Default value
const defValue_fSize_1 = "64pt";
const defValue_fTracking_1 = "0";
const defValue_fLineHeight_1 = "1.25";
const defValue_fFeatures_1 = "";
const defValue_fLocl_1 = "";

// FontSize 1
function textSize_1() {
    const obj = document.querySelector(fSize_1);
    const t_1 = document.querySelector(id_t_1);
    localStorage.setItem(key_fSize_1, obj.value);
    t_1.style.fontSize = obj.value;
}

if (localStorage.getItem(key_fSize_1) == null) {
    const fS_1 = document.querySelector(fSize_1);
    const t_1 = document.querySelector(id_t_1);
    fS_1.value = defValue_fSize_1;
    t_1.style.fontSize = defValue_fSize_1;
} else {
    document.querySelector(fSize_1).value = localStorage.getItem(key_fSize_1);
}
document.querySelector(fSize_1).addEventListener("change", textSize_1);

// Tracking 1
function tracking_1() {
    const obj = document.querySelector(fTracking_1);
    const t_1 = document.querySelector(id_t_1);
    localStorage.setItem(key_fTracking_1, obj.value);
    t_1.style.letterSpacing = (obj.value  * 0.001) + "em";
}

if (localStorage.getItem(key_fTracking_1) == null) {
    const fT_1 = document.querySelector(fTracking_1);
    const t_1 = document.querySelector(id_t_1);
    fT_1.value = defValue_fTracking_1;
    t_1.style.letterSpacing = defValue_fTracking_1;
} else {
    document.querySelector(fTracking_1).value = localStorage.getItem(key_fTracking_1);
}
document.querySelector(fTracking_1).addEventListener("change", tracking_1);

// LineHeight 1
function lineHeight_1() {
    const obj = document.querySelector(fLineHeight_1);
    const t_1 = document.querySelector(id_t_1);
    localStorage.setItem(key_fLineHeight_1, obj.value);
    t_1.style.lineHeight = obj.value;
}

if (localStorage.getItem(key_fLineHeight_1) == null) {
    const fL_1 = document.querySelector(fLineHeight_1);
    const t_1 = document.querySelector(id_t_1);
    fL_1.value = defValue_fLineHeight_1;
    t_1.style.lineHeight = defValue_fLineHeight_1;
}
else {
    document.querySelector(fLineHeight_1).value = localStorage.getItem(key_fLineHeight_1);
}
document.querySelector(fLineHeight_1).addEventListener("change", lineHeight_1);

// Features 1
function features_1() {
    const obj = document.querySelector(fFeatures_1);
    const t_1 = document.querySelector(id_t_1);
    localStorage.setItem(key_fFeatures_1, obj.value);
    t_1.style.fontFeatureSettings = obj.value;
}
if (localStorage.getItem(key_fFeatures_1) == null) {
    const fF_1 = document.querySelector(fFeatures_1);
    const t_1 = document.querySelector(id_t_1);
    fF_1.value = defValue_fFeatures_1;
    t_1.style.fontFeatureSettings = defValue_fFeatures_1;
}
else {
    document.querySelector(fFeatures_1).value = localStorage.getItem(key_fFeatures_1);
}
document.querySelector(fFeatures_1).addEventListener("change", features_1);

// Locl 1
function locl_1() {
    const obj = document.querySelector(fLocl_1);
    const t_1 = document.querySelector(id_t_1);
    localStorage.setItem(key_fLocl_1, obj.value);
    t_1.lang = obj.value;
}
if (localStorage.getItem(key_fLocl_1) == null) {
    const fLoc_1 = document.querySelector(fLocl_1);
    const t_1 = document.querySelector(id_t_1);
    fLoc_1.value = defValue_fLocl_1;
    t_1.lang = defValue_fLocl_1;
}
else {
    document.querySelector(fLocl_1).value = localStorage.getItem(key_fLocl_1);
}
document.querySelector(fLocl_1).addEventListener("change", locl_1);
// --END 1--
// ---------
// For 2 ---
// Window
const fSize_2 = "#inp-f-size-2";
let fTracking_2 = "#inp-f-tracking-2";
const fLineHeight_2 = "#inp-f-lineHeight-2";
const fFeatures_2 = "#f-features-2";
const fLocl_2 = "#f-locl-2";
// VF

// Text column
const id_t_2 = "#p-t2";

// Keys
const key_fSize_2 = "inp-f-size-2";
const key_fTracking_2 = "inp-f-tracking-2";
const key_fLineHeight_2 = "inp-f-lineHeight-2";
const key_fFeatures_2 = "f-features-2";
const key_fLocl_2 = "f-locl-2";

// Default value
const defValue_fSize_2 = "64pt";
const defValue_fTracking_2 = "0";
const defValue_fLineHeight_2 = "1.25";
const defValue_fFeatures_2 = "";
const defValue_fLocl_2 = "";

// FontSize 2
function textSize_2() {
    const obj = document.querySelector(fSize_2);
    const t_2 = document.querySelector(id_t_2);
    localStorage.setItem(key_fSize_2, obj.value);
    t_2.style.fontSize = obj.value;
}
if (localStorage.getItem(key_fSize_2) == null) {
    const fS_2 = document.querySelector(fSize_2);
    const t_2 = document.querySelector(id_t_2);
    fS_2.value = defValue_fSize_2;
    t_2.style.fontSize = defValue_fSize_2;
} else {
    document.querySelector(fSize_2).value = localStorage.getItem(key_fSize_2);
}
document.querySelector(fSize_2).addEventListener("change", textSize_2);

// Tracking 2
function tracking_2() {
    const obj = document.querySelector(fTracking_2);
    const t_2 = document.querySelector(id_t_2);
    localStorage.setItem(key_fTracking_2, obj.value);
    t_2.style.letterSpacing = (obj.value * 0.001) + "em";
}

if (localStorage.getItem(key_fTracking_2) == null) {
    const fT_2 = document.querySelector(fTracking_2);
    const t_2 = document.querySelector(id_t_2);
    fT_2.value = defValue_fTracking_2;
    t_2.style.letterSpacing = defValue_fTracking_2;
} else {
    document.querySelector(fTracking_2).value = localStorage.getItem(key_fTracking_2);
}
document.querySelector(fTracking_2).addEventListener("change", tracking_2);

// LineHeight 2
function lineHeight_2() {
    const obj = document.querySelector(fLineHeight_2);
    const t_2 = document.querySelector(id_t_2);
    localStorage.setItem(key_fLineHeight_2, obj.value);
    t_2.style.lineHeight = obj.value;
}

if (localStorage.getItem(key_fLineHeight_2) == null) {
    const fL_2 = document.querySelector(fLineHeight_2);
    const t_2 = document.querySelector(id_t_2);
    fL_2.value = defValue_fLineHeight_2;
    t_2.style.lineHeight = defValue_fLineHeight_2;
}
else {
    document.querySelector(fLineHeight_2).value = localStorage.getItem(key_fLineHeight_2);
}
document.querySelector(fLineHeight_2).addEventListener("change", lineHeight_2);

// Features 2
function features_2() {
    const obj = document.querySelector(fFeatures_2);
    const t_2 = document.querySelector(id_t_2);
    localStorage.setItem(key_fFeatures_2, obj.value);
    t_2.style.fontFeatureSettings = obj.value;
}
if (localStorage.getItem(key_fFeatures_2) == null) {
    const fF_2 = document.querySelector(fFeatures_2);
    const t_2 = document.querySelector(id_t_2);
    fF_2.value = defValue_fFeatures_2;
    t_2.style.fontFeatureSettings = defValue_fFeatures_2;
}
else {
    document.querySelector(fFeatures_2).value = localStorage.getItem(key_fFeatures_2);
}
document.querySelector(fFeatures_2).addEventListener("change", features_2);

// Locl 2
function locl_2() {
    const obj = document.querySelector(fLocl_2);
    const t_2 = document.querySelector(id_t_2);
    localStorage.setItem(key_fLocl_2, obj.value);
    t_2.lang = obj.value;
}
if (localStorage.getItem(key_fLocl_2) == null) {
    const fLoc_2 = document.querySelector(fLocl_2);
    const t_2 = document.querySelector(id_t_2);
    fLoc_2.value = defValue_fLocl_2;
    t_2.lang = defValue_fLocl_2;
}
else {
    document.querySelector(fLocl_2).value = localStorage.getItem(key_fLocl_2);
}
document.querySelector(fLocl_2).addEventListener("change", locl_2);
// --END 2--
// ---------
// For 3 ---
// Window
const fSize_3 = "#inp-f-size-3";
let fTracking_3 = "#inp-f-tracking-3";
const fLineHeight_3 = "#inp-f-lineHeight-3";
const fFeatures_3 = "#f-features-3";
const fLocl_3 = "#f-locl-3";
// VF

// Text column
const id_t_3 = "#p-t3";

// Keys
const key_fSize_3 = "inp-f-size-3";
const key_fTracking_3 = "inp-f-tracking-3";
const key_fLineHeight_3 = "inp-f-lineHeight-3";
const key_fFeatures_3 = "f-features-3";
const key_fLocl_3 = "f-locl-3";

// Default value
const defValue_fSize_3 = "64pt";
const defValue_fTracking_3 = "0";
const defValue_fLineHeight_3 = "1.25";
const defValue_fFeatures_3 = "";
const defValue_fLocl_3 = "";

// FontSize 3
function textSize_3() {
    const obj = document.querySelector(fSize_3);
    const t_3 = document.querySelector(id_t_3);
    localStorage.setItem(key_fSize_3, obj.value);
    t_3.style.fontSize = obj.value;
}
if (localStorage.getItem(key_fSize_3) == null) {
    const fS_3 = document.querySelector(fSize_3);
    const t_3 = document.querySelector(id_t_3);
    fS_3.value = defValue_fSize_3;
    t_3.style.fontSize = defValue_fSize_3;
} else {
    document.querySelector(fSize_3).value = localStorage.getItem(key_fSize_3);
}
document.querySelector(fSize_3).addEventListener("change", textSize_3);

// Tracking 3
function tracking_3() {
    const obj = document.querySelector(fTracking_3);
    const t_3 = document.querySelector(id_t_3);
    localStorage.setItem(key_fTracking_3, obj.value);
    t_3.style.letterSpacing = (obj.value  * 0.001) + "em";
}

if (localStorage.getItem(key_fTracking_3) == null) {
    const fT_3 = document.querySelector(fTracking_3);
    const t_3 = document.querySelector(id_t_3);
    fT_3.value = defValue_fTracking_3;
    t_3.style.letterSpacing = defValue_fTracking_3;
} else {
    document.querySelector(fTracking_3).value = localStorage.getItem(key_fTracking_3);
}
document.querySelector(fTracking_3).addEventListener("change", tracking_3);

// LineHeight 3
function lineHeight_3() {
    const obj = document.querySelector(fLineHeight_3);
    const t_3 = document.querySelector(id_t_3);
    localStorage.setItem(key_fLineHeight_3, obj.value);
    t_3.style.lineHeight = obj.value;
}

if (localStorage.getItem(key_fLineHeight_3) == null) {
    const fL_3 = document.querySelector(fLineHeight_3);
    const t_3 = document.querySelector(id_t_3);
    fL_3.value = defValue_fLineHeight_3;
    t_3.style.lineHeight = defValue_fLineHeight_3;
}
else {
    document.querySelector(fLineHeight_3).value = localStorage.getItem(key_fLineHeight_3);
}
document.querySelector(fLineHeight_3).addEventListener("change", lineHeight_3);

// Features 3
function features_3() {
    const obj = document.querySelector(fFeatures_3);
    const t_3 = document.querySelector(id_t_3);
    localStorage.setItem(key_fFeatures_3, obj.value);
    t_3.style.fontFeatureSettings = obj.value;
}
if (localStorage.getItem(key_fFeatures_3) == null) {
    const fF_3 = document.querySelector(fFeatures_3);
    const t_3 = document.querySelector(id_t_3);
    fF_3.value = defValue_fFeatures_3;
    t_3.style.fontFeatureSettings = defValue_fFeatures_3;
}
else {
    document.querySelector(fFeatures_3).value = localStorage.getItem(key_fFeatures_3);
}
document.querySelector(fFeatures_3).addEventListener("change", features_3);

// Locl 3
function locl_3() {
    const obj = document.querySelector(fLocl_3);
    const t_3 = document.querySelector(id_t_3);
    localStorage.setItem(key_fLocl_3, obj.value);
    t_3.lang = obj.value;
}
if (localStorage.getItem(key_fLocl_3) == null) {
    const fLoc_3 = document.querySelector(fLocl_3);
    const t_3 = document.querySelector(id_t_3);
    fLoc_3.value = defValue_fLocl_3;
    t_3.lang = defValue_fLocl_3;
}
else {
    document.querySelector(fLocl_3).value = localStorage.getItem(key_fLocl_3);
}
document.querySelector(fLocl_3).addEventListener("change", locl_3);
// --END 3--
// ---------
// For 4 ---
const fSize_4 = "#inp-f-size-4";
let fTracking_4 = "#inp-f-tracking-4";
const fLineHeight_4 = "#inp-f-lineHeight-4";
const fFeatures_4 = "#f-features-4";
const fLocl_4 = "#f-locl-4";
// VF

// Text column
const id_t_4 = "#p-t4";

// Keys
const key_fSize_4 = "inp-f-size-4";
const key_fTracking_4 = "inp-f-tracking-4";
const key_fLineHeight_4 = "inp-f-lineHeight-4";
const key_fFeatures_4 = "f-features-4";
const key_fLocl_4 = "f-locl-4";

// Default value
const defValue_fSize_4 = "64pt";
const defValue_fTracking_4 = "0";
const defValue_fLineHeight_4 = "1.25";
const defValue_fFeatures_4 = "";
const defValue_fLocl_4 = "";

// FontSize 4
function textSize_4() {
    const obj = document.querySelector(fSize_4);
    const t_4 = document.querySelector(id_t_4);
    localStorage.setItem(key_fSize_4, obj.value);
    t_4.style.fontSize = obj.value;
}
if (localStorage.getItem(key_fSize_4) == null) {
    const fS_4 = document.querySelector(fSize_4);
    const t_4 = document.querySelector(id_t_4);
    fS_4.value = defValue_fSize_4;
    t_4.style.fontSize = defValue_fSize_4;
} else {
    document.querySelector(fSize_4).value = localStorage.getItem(key_fSize_4);
}
document.querySelector(fSize_4).addEventListener("change", textSize_4);

// Tracking 4
function tracking_4() {
    const obj = document.querySelector(fTracking_4);
    const t_4 = document.querySelector(id_t_4);
    localStorage.setItem(key_fTracking_4, obj.value);
    t_4.style.letterSpacing = (obj.value  * 0.001) + "em";
}

if (localStorage.getItem(key_fTracking_4) == null) {
    const fT_4 = document.querySelector(fTracking_4);
    const t_4 = document.querySelector(id_t_4);
    fT_4.value = defValue_fTracking_4;
    t_4.style.letterSpacing = defValue_fTracking_4;
} else {
    document.querySelector(fTracking_4).value = localStorage.getItem(key_fTracking_4);
}
document.querySelector(fTracking_4).addEventListener("change", tracking_4);

// LineHeight 4
function lineHeight_4() {
    const obj = document.querySelector(fLineHeight_4);
    const t_4 = document.querySelector(id_t_4);
    localStorage.setItem(key_fLineHeight_4, obj.value);
    t_4.style.lineHeight = obj.value;
}

if (localStorage.getItem(key_fLineHeight_4) == null) {
    const fL_4 = document.querySelector(fLineHeight_4);
    const t_4 = document.querySelector(id_t_4);
    fL_4.value = defValue_fLineHeight_4;
    t_4.style.lineHeight = defValue_fLineHeight_4;
}
else {
    document.querySelector(fLineHeight_4).value = localStorage.getItem(key_fLineHeight_4);
}
document.querySelector(fLineHeight_4).addEventListener("change", lineHeight_4);

// Features 4
function features_4() {
    const obj = document.querySelector(fFeatures_4);
    const t_4 = document.querySelector(id_t_4);
    localStorage.setItem(key_fFeatures_4, obj.value);
    t_4.style.fontFeatureSettings = obj.value;
}
if (localStorage.getItem(key_fFeatures_4) == null) {
    const fF_4 = document.querySelector(fFeatures_4);
    const t_4 = document.querySelector(id_t_4);
    fF_4.value = defValue_fFeatures_4;
    t_4.style.fontFeatureSettings = defValue_fFeatures_4;
}
else {
    document.querySelector(fFeatures_4).value = localStorage.getItem(key_fFeatures_4);
}
document.querySelector(fFeatures_4).addEventListener("change", features_4);

// Locl 4
function locl_4() {
    const obj = document.querySelector(fLocl_4);
    const t_4 = document.querySelector(id_t_4);
    localStorage.setItem(key_fLocl_4, obj.value);
    t_4.lang = obj.value;
}
if (localStorage.getItem(key_fLocl_4) == null) {
    const fLoc_4 = document.querySelector(fLocl_4);
    const t_4 = document.querySelector(id_t_4);
    fLoc_4.value = defValue_fLocl_4;
    t_4.lang = defValue_fLocl_4;
}
else {
    document.querySelector(fLocl_4).value = localStorage.getItem(key_fLocl_4);
}
document.querySelector(fLocl_4).addEventListener("change", locl_4);
// --END 4--
// ---------
// For 5 ---
const fSize_5 = "#inp-f-size-5";
let fTracking_5 = "#inp-f-tracking-5";
const fLineHeight_5 = "#inp-f-lineHeight-5";
const fFeatures_5 = "#f-features-5";
const fLocl_5 = "#f-locl-5";
// VF

// Text column
const id_t_5 = "#p-t5";

// Keys
const key_fSize_5 = "inp-f-size-5";
const key_fTracking_5 = "inp-f-tracking-5";
const key_fLineHeight_5 = "inp-f-lineHeight-5";
const key_fFeatures_5 = "f-features-5";
const key_fLocl_5 = "f-locl-5";

// Default value
const defValue_fSize_5 = "64pt";
const defValue_fTracking_5 = "0";
const defValue_fLineHeight_5 = "1.25";
const defValue_fFeatures_5 = "";
const defValue_fLocl_5 = "";

// FontSize 5
function textSize_5() {
    const obj = document.querySelector(fSize_5);
    const t_5 = document.querySelector(id_t_5);
    localStorage.setItem(key_fSize_5, obj.value);
    t_5.style.fontSize = obj.value;
}
if (localStorage.getItem(key_fSize_5) == null) {
    const fS_5 = document.querySelector(fSize_5);
    const t_5 = document.querySelector(id_t_5);
    fS_5.value = defValue_fSize_5;
    t_5.style.fontSize = defValue_fSize_5;
} else {
    document.querySelector(fSize_5).value = localStorage.getItem(key_fSize_5);
}
document.querySelector(fSize_5).addEventListener("change", textSize_5);

// Tracking 5
function tracking_5() {
    const obj = document.querySelector(fTracking_5);
    const t_5 = document.querySelector(id_t_5);
    localStorage.setItem(key_fTracking_5, obj.value);
    t_5.style.letterSpacing = (obj.value  * 0.001) + "em";
}

if (localStorage.getItem(key_fTracking_5) == null) {
    const fT_5 = document.querySelector(fTracking_5);
    const t_5 = document.querySelector(id_t_5);
    fT_5.value = defValue_fTracking_5;
    t_5.style.letterSpacing = defValue_fTracking_5;
} else {
    document.querySelector(fTracking_5).value = localStorage.getItem(key_fTracking_5);
}
document.querySelector(fTracking_5).addEventListener("change", tracking_5);

// LineHeight 5
function lineHeight_5() {
    const obj = document.querySelector(fLineHeight_5);
    const t_5 = document.querySelector(id_t_5);
    localStorage.setItem(key_fLineHeight_5, obj.value);
    t_5.style.lineHeight = obj.value;
}

if (localStorage.getItem(key_fLineHeight_5) == null) {
    const fL_5 = document.querySelector(fLineHeight_5);
    const t_5 = document.querySelector(id_t_5);
    fL_5.value = defValue_fLineHeight_5;
    t_5.style.lineHeight = defValue_fLineHeight_5;
}
else {
    document.querySelector(fLineHeight_5).value = localStorage.getItem(key_fLineHeight_5);
}
document.querySelector(fLineHeight_5).addEventListener("change", lineHeight_5);

// Features 5
function features_5() {
    const obj = document.querySelector(fFeatures_5);
    const t_5 = document.querySelector(id_t_5);
    localStorage.setItem(key_fFeatures_5, obj.value);
    t_5.style.fontFeatureSettings = obj.value;
}
if (localStorage.getItem(key_fFeatures_5) == null) {
    const fF_5 = document.querySelector(fFeatures_5);
    const t_5 = document.querySelector(id_t_5);
    fF_5.value = defValue_fFeatures_5;
    t_5.style.fontFeatureSettings = defValue_fFeatures_5;
}
else {
    document.querySelector(fFeatures_5).value = localStorage.getItem(key_fFeatures_5);
}
document.querySelector(fFeatures_5).addEventListener("change", features_5);

// Locl 5
function locl_5() {
    const obj = document.querySelector(fLocl_5);
    const t_5 = document.querySelector(id_t_5);
    localStorage.setItem(key_fLocl_5, obj.value);
    t_5.lang = obj.value;
}
if (localStorage.getItem(key_fLocl_5) == null) {
    const fLoc_5 = document.querySelector(fLocl_5);
    const t_5 = document.querySelector(id_t_5);
    fLoc_5.value = defValue_fLocl_5;
    t_5.lang = defValue_fLocl_5;
}
else {
    document.querySelector(fLocl_5).value = localStorage.getItem(key_fLocl_5);
}
document.querySelector(fLocl_5).addEventListener("change", locl_5);
// --END 5--
// ---------
// For 6 ---
const fSize_6 = "#inp-f-size-6";
let fTracking_6 = "#inp-f-tracking-6";
const fLineHeight_6 = "#inp-f-lineHeight-6";
const fFeatures_6 = "#f-features-6";
const fLocl_6 = "#f-locl-6";
// VF

// Text column
const id_t_6 = "#p-t6";

// Keys
const key_fSize_6 = "inp-f-size-6";
const key_fTracking_6 = "inp-f-tracking-6";
const key_fLineHeight_6 = "inp-f-lineHeight-6";
const key_fFeatures_6 = "f-features-6";
const key_fLocl_6 = "f-locl-6";

// Default value
const defValue_fSize_6 = "64pt";
const defValue_fTracking_6 = "0";
const defValue_fLineHeight_6 = "1.25";
const defValue_fFeatures_6 = "";
const defValue_fLocl_6 = "";

// FontSize 6
function textSize_6() {
    const obj = document.querySelector(fSize_6);
    const t_6 = document.querySelector(id_t_6);
    localStorage.setItem(key_fSize_6, obj.value);
    t_6.style.fontSize = obj.value;
}
if (localStorage.getItem(key_fSize_6) == null) {
    const fS_6 = document.querySelector(fSize_6);
    const t_6 = document.querySelector(id_t_6);
    fS_6.value = defValue_fSize_6;
    t_6.style.fontSize = defValue_fSize_6;
} else {
    document.querySelector(fSize_6).value = localStorage.getItem(key_fSize_6);
}
document.querySelector(fSize_6).addEventListener("change", textSize_6);

// Tracking 6
function tracking_6() {
    const obj = document.querySelector(fTracking_6);
    const t_6 = document.querySelector(id_t_6);
    localStorage.setItem(key_fTracking_6, obj.value);
    t_6.style.letterSpacing = (obj.value  * 0.001) + "em";
}

if (localStorage.getItem(key_fTracking_6) == null) {
    const fT_6 = document.querySelector(fTracking_6);
    const t_6 = document.querySelector(id_t_6);
    fT_6.value = defValue_fTracking_6;
    t_6.style.letterSpacing = defValue_fTracking_6;
} else {
    document.querySelector(fTracking_6).value = localStorage.getItem(key_fTracking_6);
}
document.querySelector(fTracking_6).addEventListener("change", tracking_6);

// LineHeight 6
function lineHeight_6() {
    const obj = document.querySelector(fLineHeight_6);
    const t_6 = document.querySelector(id_t_6);
    localStorage.setItem(key_fLineHeight_6, obj.value);
    t_6.style.lineHeight = obj.value;
}

if (localStorage.getItem(key_fLineHeight_6) == null) {
    const fL_6 = document.querySelector(fLineHeight_6);
    const t_6 = document.querySelector(id_t_6);
    fL_6.value = defValue_fLineHeight_6;
    t_6.style.lineHeight = defValue_fLineHeight_6;
}
else {
    document.querySelector(fLineHeight_6).value = localStorage.getItem(key_fLineHeight_6);
}
document.querySelector(fLineHeight_6).addEventListener("change", lineHeight_6);

// Features 6
function features_6() {
    const obj = document.querySelector(fFeatures_6);
    const t_6 = document.querySelector(id_t_6);
    localStorage.setItem(key_fFeatures_6, obj.value);
    t_6.style.fontFeatureSettings = obj.value;
}
if (localStorage.getItem(key_fFeatures_6) == null) {
    const fF_6 = document.querySelector(fFeatures_6);
    const t_6 = document.querySelector(id_t_6);
    fF_6.value = defValue_fFeatures_6;
    t_6.style.fontFeatureSettings = defValue_fFeatures_6;
}
else {
    document.querySelector(fFeatures_6).value = localStorage.getItem(key_fFeatures_6);
}
document.querySelector(fFeatures_6).addEventListener("change", features_6);

// Locl 6
function locl_6() {
    const obj = document.querySelector(fLocl_6);
    const t_6 = document.querySelector(id_t_6);
    localStorage.setItem(key_fLocl_6, obj.value);
    t_6.lang = obj.value;
}
if (localStorage.getItem(key_fLocl_6) == null) {
    const fLoc_6 = document.querySelector(fLocl_6);
    const t_6 = document.querySelector(id_t_6);
    fLoc_6.value = defValue_fLocl_6;
    t_6.lang = defValue_fLocl_6;
}
else {
    document.querySelector(fLocl_6).value = localStorage.getItem(key_fLocl_6);
}
document.querySelector(fLocl_6).addEventListener("change", locl_6);
// --END 6--
// ---------