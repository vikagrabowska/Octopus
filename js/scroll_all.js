//
// This is a function that enables scrolling of all columns simultaneously,
// relative to scrolling in a single text column
//

var p_1 = document.querySelector('.col-scrl-1')
var p_2 = document.querySelector('.col-scrl-2')
var p_3 = document.querySelector('.col-scrl-3')
var p_4 = document.querySelector('.col-scrl-4')
var p_5 = document.querySelector('.col-scrl-5')
var p_6 = document.querySelector('.col-scrl-6')

p_1.addEventListener('scroll', function () {
    p_2.scrollTop = p_1.scrollTop
    p_3.scrollTop = p_1.scrollTop
    p_4.scrollTop = p_1.scrollTop
    p_5.scrollTop = p_1.scrollTop
    p_6.scrollTop = p_1.scrollTop
})
p_2.addEventListener('scroll', function () {
    p_1.scrollTop = p_2.scrollTop
    p_3.scrollTop = p_2.scrollTop
    p_4.scrollTop = p_2.scrollTop
    p_5.scrollTop = p_2.scrollTop
    p_6.scrollTop = p_2.scrollTop
})
p_3.addEventListener('scroll', function () {
    p_1.scrollTop = p_3.scrollTop
    p_2.scrollTop = p_3.scrollTop
    p_4.scrollTop = p_3.scrollTop
    p_5.scrollTop = p_3.scrollTop
    p_6.scrollTop = p_3.scrollTop
})
p_4.addEventListener('scroll', function () {
    p_1.scrollTop = p_4.scrollTop
    p_2.scrollTop = p_4.scrollTop
    p_3.scrollTop = p_4.scrollTop
    p_5.scrollTop = p_4.scrollTop
    p_6.scrollTop = p_4.scrollTop
})
p_5.addEventListener('scroll', function () {
    p_1.scrollTop = p_5.scrollTop
    p_2.scrollTop = p_5.scrollTop
    p_3.scrollTop = p_5.scrollTop
    p_4.scrollTop = p_5.scrollTop
    p_6.scrollTop = p_5.scrollTop
})
p_6.addEventListener('scroll', function () {
    p_1.scrollTop = p_6.scrollTop
    p_2.scrollTop = p_6.scrollTop
    p_3.scrollTop = p_6.scrollTop
    p_4.scrollTop = p_6.scrollTop
    p_5.scrollTop = p_6.scrollTop
})