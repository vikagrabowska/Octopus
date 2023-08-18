//
// Thanks to this script, it's possible to paste text without styles.
//

var lista = [
    "#p-t1",
    "#p-t2",
    "#p-t3",
    "#p-t4",
    "#p-t5",
    "#p-t6",
]
// IMPORTANT FUNCTION! When pasting text from another website/file, it does not paste the text style.
for (i = 0; i < lista.length; i++) {
    document.querySelector(lista[i]).addEventListener("paste",
        function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");

            // ATTENTION! execCommand stops working
            // find a replacement
            document.execCommand("insertHTML", false, text);

            window.location.reload();
        });
        
    
}