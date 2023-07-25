var lista = [
    "#p-t1",
    "#p-t2",
    "#p-t3",
    "#p-t4",
    "#p-t5",
    "#p-t6",
]
// WAŻNA FUNKCJA! Przy wklejaniu tekstu z innej witryny/pliku, nie wkleja stylu tekstowego
for (i = 0; i < lista.length; i++) {
    document.querySelector(lista[i]).addEventListener("paste",
        function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");

            // UWAGA! execCommand przestaje działać
            // znaleźć zamiennik
            document.execCommand("insertHTML", false, text);

            window.location.reload();
        });
        
    
}