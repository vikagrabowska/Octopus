// Lista ID ramek tekstowych do których zostanie wgrany tekst i zmieniony font
var lista = [
    "#p-t1",
    "#p-t2",
    "#p-t3",
    "#p-t4",
    "#p-t5",
    "#p-t6",
]
let columns = lista.length;

    // Funkcja importująca plik .txt i zastępująca tekst w ramce teksowej
document.getElementById('inputfile').addEventListener('change', function () {
    const fr = new FileReader();
    fr.onload = function () {
        var step;
        for (step = 0; step < 1; step++) {
            for (i = 0; i < columns; i++) {
                document.querySelector(lista[i])
                    .textContent = fr.result;
                const str = fr.result;
                localStorage.setItem('txt', str)
            }
        }
    }
    fr.readAsText(this.files[0]);
})

for (i = 0; i < columns; i++) {
    if (localStorage.getItem("txt") == null) {   
        const tt = "ABCabc..."
        document.querySelector(lista[i]).textContent = tt;
        localStorage.setItem('txt', tt);

    }
    else{
        document.querySelector(lista[i]).textContent = localStorage.getItem('txt');
    }
}