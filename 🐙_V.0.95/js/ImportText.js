// List of text frame IDs to which the text will be uploaded and the font changed
var lista = [
    "#p-t1",
    "#p-t2",
    "#p-t3",
    "#p-t4",
    "#p-t5",
    "#p-t6",
];
let columns = lista.length;

// Function that gets executed when a file is selected
document.getElementById('inputfile').addEventListener('change', function () {
    const fr = new FileReader();

    // This part is executed when the file has been loaded
    fr.onload = function () {
        var step;
        // Loop through each element in the 'lista' array
        for (step = 0; step < 1; step++) { // This loop seems to run only once, you might not need it
            for (i = 0; i < columns; i++) {
                // Set the content of the specified text frame to the loaded file's content
                document.querySelector(lista[i]).textContent = fr.result;

                // Store the loaded text in the local storage
                const str = fr.result;
                localStorage.setItem('txt', str);
            }
        }
    };

    // Read the selected file as text
    fr.readAsText(this.files[0]);
});

// Loop through the 'lista' array to update text content
for (i = 0; i < columns; i++) {
    if (localStorage.getItem("txt") == null) {
        // Set default text if there's no stored text in local storage
        const tt = "ABCabc...";
        document.querySelector(lista[i]).textContent = tt;
        localStorage.setItem('txt', tt);
    } else {
        // Set the stored text from local storage to the specified text frame
        document.querySelector(lista[i]).textContent = localStorage.getItem('txt');
    }
}
