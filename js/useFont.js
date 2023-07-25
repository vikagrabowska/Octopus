// Twoenie CSS
function loadFont(name,url){
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode(
        '@font-face{font-family: '+name+'; src: url('+url+');}'
    ));
    document.head.appendChild(newStyle);
}
// 1
// pobiera ściekę i zapisuje do pamięci
const file_1 = document.querySelector("#importFont_1");
file_1.addEventListener("change", (event) => {
const files = event.target.files;
    for (const file_1 of files) {
        const key_font_1 = "font_1";
        const toStorage_name = file_1.name;
        const toStorage_path = "./font/" + file_1.name;
        localStorage.setItem(key_font_1, toStorage_path)
        loadFont("'Col_font_1'","'" + toStorage_path + "'");
    }
});
// // USE CSS in selector
const imp_Storage_1 = localStorage.getItem("font_1");
loadFont("'Col_font_1'", "'" + imp_Storage_1 + "'");
document.querySelector('#p-t1').style.fontFamily = "'Col_font_1'";
// 2
// pobiera ściekę i zapisuje do pamięci
const file_2 = document.querySelector("#importFont_2");
file_2.addEventListener("change", (event) => {
const files = event.target.files;
    for (const file_2 of files) {
        const key_font_2 = "font_2";
        const toStorage_name = file_2.name;
        const toStorage_path = "./font/" + file_2.name;
        localStorage.setItem(key_font_2, toStorage_path)
        loadFont("'Col_font_2'","'" + toStorage_path + "'");
    }
});
// // USE CSS in selector
const imp_Storage_2 = localStorage.getItem("font_2");
loadFont("'Col_font_2'", "'" + imp_Storage_2 + "'");
document.querySelector('#p-t2').style.fontFamily = "'Col_font_2'";
// 3
// pobiera ściekę i zapisuje do pamięci
const file_3 = document.querySelector("#importFont_3");
file_3.addEventListener("change", (event) => {
const files = event.target.files;
    for (const file_3 of files) {
        const key_font_3 = "font_3";
        const toStorage_name = file_3.name;
        const toStorage_path = "./font/" + file_3.name;
        localStorage.setItem(key_font_3, toStorage_path)
        loadFont("'Col_font_3'","'" + toStorage_path + "'");
    }
});
// // USE CSS in selector
const imp_Storage_3 = localStorage.getItem("font_3");
loadFont("'Col_font_3'", "'" + imp_Storage_3 + "'");
document.querySelector('#p-t3').style.fontFamily = "'Col_font_3'";
// 4
// pobiera ściekę i zapisuje do pamięci
const file_4 = document.querySelector("#importFont_4");
file_4.addEventListener("change", (event) => {
const files = event.target.files;
    for (const file_4 of files) {
        const key_font_4 = "font_4";
        const toStorage_name = file_4.name;
        const toStorage_path = "./font/" + file_4.name;
        localStorage.setItem(key_font_4, toStorage_path)
        loadFont("'Col_font_4'","'" + toStorage_path + "'");
    }
});
// // USE CSS in selector
const imp_Storage_4 = localStorage.getItem("font_4");
loadFont("'Col_font_4'", "'" + imp_Storage_4 + "'");
document.querySelector('#p-t4').style.fontFamily = "'Col_font_4'";
// 5
// pobiera ściekę i zapisuje do pamięci
const file_5 = document.querySelector("#importFont_5");
file_5.addEventListener("change", (event) => {
const files = event.target.files;
    for (const file_5 of files) {
        const key_font_5 = "font_5";
        const toStorage_name = file_5.name;
        const toStorage_path = "./font/" + file_5.name;
        localStorage.setItem(key_font_5, toStorage_path)
        loadFont("'Col_font_5'","'" + toStorage_path + "'");
    }
});
// // USE CSS in selector
const imp_Storage_5 = localStorage.getItem("font_5");
loadFont("'Col_font_5'", "'" + imp_Storage_5 + "'");
document.querySelector('#p-t5').style.fontFamily = "'Col_font_5'";
// 6
// pobiera ściekę i zapisuje do pamięci
const file_6 = document.querySelector("#importFont_6");
file_6.addEventListener("change", (event) => {
const files = event.target.files;
    for (const file_6 of files) {
        const key_font_6 = "font_6";
        const toStorage_name = file_6.name;
        const toStorage_path = "./font/" + file_6.name;
        localStorage.setItem(key_font_6, toStorage_path)
        loadFont("'Col_font_6'","'" + toStorage_path + "'");
    }
});
// // USE CSS in selector
const imp_Storage_6 = localStorage.getItem("font_6");
loadFont("'Col_font_6'", "'" + imp_Storage_6 + "'");
document.querySelector('#p-t6').style.fontFamily = "'Col_font_6'";