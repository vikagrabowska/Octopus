// HardWrap Function
// 1
// import Storage
if(localStorage.getItem("HW_1") == null) {
    const fHW_1 = document.querySelector("#hard-wrap-input-1");
    fHW_1.value = "10";
}
else{
    const fHW_1 = document.querySelector("#hard-wrap-input-1");
    fHW_1.value = localStorage.getItem("HW_1");
}
function editHW_1() {
        var n = document.querySelector("#hard-wrap-input-1").value;
        localStorage.setItem("HW_1", n);//
        if (n > 0) {
            for (j = 0; j < columns; j++) {
                let str = document.querySelector("#p-t1").textContent;
                str = wordWrap(str, n);

                function wordWrap(str, maxWidth) {
                    var newLineStr = "<br>"; done = false; res = '';
                    while (str.length > maxWidth) {
                        found = false;
                        for (i = maxWidth - 1; i >= 0; i--) {
                            if (testWhite(str.charAt(i))) {
                                res = res + [str.slice(0, i), newLineStr].join(' ');
                                str = str.slice(i + 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            res += [str.slice(0, maxWidth), newLineStr].join('');
                            str = str.slice(maxWidth);
                        }
                    }
                    return res + str;
                }
                function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                };
                document.querySelector("#p-t1").innerHTML = str;
                
            }
        }
    }
    editHW_1() // calling the HardWrap function
// 2
// import Storage
if(localStorage.getItem("HW_2") == null) {
    const fHW_2 = document.querySelector("#hard-wrap-input-2");
    fHW_2.value = "10";
}
else{
    const fHW_2 = document.querySelector("#hard-wrap-input-2");
    fHW_2.value = localStorage.getItem("HW_2");
}
// HardWrap Function
function editHW_2() {
        var n = document.querySelector("#hard-wrap-input-2").value
        localStorage.setItem("HW_2", n);//
        if (n > 0) {
            for (j = 0; j < columns; j++) {
                let str = document.querySelector("#p-t2").textContent;
                str = wordWrap(str, document.querySelector("#hard-wrap-input-2").value);

                function wordWrap(str, maxWidth) {
                    var newLineStr = "<br>"; done = false; res = '';
                    while (str.length > maxWidth) {
                        found = false;
                        for (i = maxWidth - 1; i >= 0; i--) {
                            if (testWhite(str.charAt(i))) {
                                res = res + [str.slice(0, i), newLineStr].join(' ');
                                str = str.slice(i + 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            res += [str.slice(0, maxWidth), newLineStr].join('');
                            str = str.slice(maxWidth);
                        }
                    }
                    return res + str;
                }
                function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                };
                document.querySelector("#p-t2").innerHTML = str;
            }
        }
    }
    editHW_2() // calling the HardWrap function
// 3
// HardWrap Function
// import Storage
if(localStorage.getItem("HW_3") == null) {
    const fHW_3 = document.querySelector("#hard-wrap-input-3");
    fHW_3.value = "10";
}
else{
    const fHW_3 = document.querySelector("#hard-wrap-input-3");
    fHW_3.value = localStorage.getItem("HW_3");
}
function editHW_3() {
        var n = document.querySelector("#hard-wrap-input-3").value
        localStorage.setItem("HW_3", n);//
        if (n > 0) {
            for (j = 0; j < columns; j++) {
                let str = document.querySelector("#p-t3").textContent;
                str = wordWrap(str, document.querySelector("#hard-wrap-input-3").value);

                function wordWrap(str, maxWidth) {
                    var newLineStr = "<br>"; done = false; res = '';
                    while (str.length > maxWidth) {
                        found = false;
                        for (i = maxWidth - 1; i >= 0; i--) {
                            if (testWhite(str.charAt(i))) {
                                res = res + [str.slice(0, i), newLineStr].join(' ');
                                str = str.slice(i + 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            res += [str.slice(0, maxWidth), newLineStr].join('');
                            str = str.slice(maxWidth);
                        }
                    }
                    return res + str;
                }
                function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                };
                document.querySelector("#p-t3").innerHTML = str;
            }
        }
    }
    editHW_3() // calling the HardWrap function
// 4
// import Storage
if(localStorage.getItem("HW_4") == null) {
    const fHW_4 = document.querySelector("#hard-wrap-input-4");
    fHW_4.value = "10";
}
else{
    const fHW_4 = document.querySelector("#hard-wrap-input-4");
    fHW_4.value = localStorage.getItem("HW_4");
}
// HardWrap Function
function editHW_4() {
        var n = document.querySelector("#hard-wrap-input-4").value
        localStorage.setItem("HW_4", n);//
        if (n > 0) {
            for (j = 0; j < columns; j++) {
                let str = document.querySelector("#p-t4").textContent;
                str = wordWrap(str, document.querySelector("#hard-wrap-input-4").value);

                function wordWrap(str, maxWidth) {
                    var newLineStr = "<br>"; done = false; res = '';
                    while (str.length > maxWidth) {
                        found = false;
                        for (i = maxWidth - 1; i >= 0; i--) {
                            if (testWhite(str.charAt(i))) {
                                res = res + [str.slice(0, i), newLineStr].join(' ');
                                str = str.slice(i + 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            res += [str.slice(0, maxWidth), newLineStr].join('');
                            str = str.slice(maxWidth);
                        }
                    }
                    return res + str;
                }
                function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                };
                document.querySelector("#p-t4").innerHTML = str;
            }
        }
    }
    editHW_4() // calling the HardWrap function
// 5
// import Storage
if(localStorage.getItem("HW_5") == null) {
    const fHW_5 = document.querySelector("#hard-wrap-input-5");
    fHW_5.value = "10";
}
else{
    const fHW_5 = document.querySelector("#hard-wrap-input-5");
    fHW_5.value = localStorage.getItem("HW_5");
}
// HardWrap Function
function editHW_5() {
        var n = document.querySelector("#hard-wrap-input-5").value
        localStorage.setItem("HW_5", n);//
        if (n > 0) {
            for (j = 0; j < columns; j++) {
                let str = document.querySelector("#p-t5").textContent;
                str = wordWrap(str, document.querySelector("#hard-wrap-input-5").value);

                function wordWrap(str, maxWidth) {
                    var newLineStr = "<br>"; done = false; res = '';
                    while (str.length > maxWidth) {
                        found = false;
                        for (i = maxWidth - 1; i >= 0; i--) {
                            if (testWhite(str.charAt(i))) {
                                res = res + [str.slice(0, i), newLineStr].join(' ');
                                str = str.slice(i + 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            res += [str.slice(0, maxWidth), newLineStr].join('');
                            str = str.slice(maxWidth);
                        }
                    }
                    return res + str;
                }
                function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                };
                document.querySelector("#p-t5").innerHTML = str;
            }
        }
    }
    editHW_5() // calling the HardWrap function
// 6
// import Storage
if(localStorage.getItem("HW_6") == null) {
    const fHW_6 = document.querySelector("#hard-wrap-input-6");
    fHW_6.value = "10";
}
else{
    const fHW_6 = document.querySelector("#hard-wrap-input-6");
    fHW_6.value = localStorage.getItem("HW_6");
}
// HardWrap Function
function editHW_6() {
        var n = document.querySelector("#hard-wrap-input-6").value
        localStorage.setItem("HW_6", n);//
        if (n > 0) {
            for (j = 0; j < columns; j++) {
                let str = document.querySelector("#p-t6").textContent;
                str = wordWrap(str, document.querySelector("#hard-wrap-input-6").value);

                function wordWrap(str, maxWidth) {
                    var newLineStr = "<br>"; done = false; res = '';
                    while (str.length > maxWidth) {
                        found = false;
                        for (i = maxWidth - 1; i >= 0; i--) {
                            if (testWhite(str.charAt(i))) {
                                res = res + [str.slice(0, i), newLineStr].join(' ');
                                str = str.slice(i + 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            res += [str.slice(0, maxWidth), newLineStr].join('');
                            str = str.slice(maxWidth);
                        }
                    }
                    return res + str;
                }
                function testWhite(x) {
                    var white = new RegExp(/^\s$/);
                    return white.test(x.charAt(0));
                };
                document.querySelector("#p-t6").innerHTML = str;
            }
        }
    }
    editHW_6() // calling the HardWrap function