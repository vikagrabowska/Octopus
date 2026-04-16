// Load font from a data URL or object URL
function loadFont(name, url) {
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode(
        '@font-face{font-family: ' + name + '; src: url(' + url + ');}'
    ));
    document.head.appendChild(newStyle);
}

// Read a font File object and apply it to a column
function loadFontFile(file, colNum) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var dataUrl = e.target.result;
        localStorage.setItem("font_" + colNum, dataUrl);
        localStorage.setItem("font_name_" + colNum, file.name);
        loadFont("'Col_font_" + colNum + "'", "'" + dataUrl + "'");
        document.querySelector('#p-t' + colNum).style.fontFamily = "'Col_font_" + colNum + "'";
    };
    reader.readAsDataURL(file);
}

// Set up file input and drag-and-drop for each column
for (var i = 1; i <= 8; i++) {
    (function (colNum) {
        // File input handler
        var fileInput = document.querySelector("#importFont_" + colNum);
        fileInput.addEventListener("change", function (event) {
            var files = event.target.files;
            if (files.length > 0) {
                loadFontFile(files[0], colNum);
            }
        });

        // Restore from localStorage
        var stored = localStorage.getItem("font_" + colNum);
        if (stored) {
            loadFont("'Col_font_" + colNum + "'", "'" + stored + "'");
            document.querySelector('#p-t' + colNum).style.fontFamily = "'Col_font_" + colNum + "'";
        }

        // Drag-and-drop on the column's text area
        var textArea = document.querySelector('#p-t' + colNum);
        var colWrapper = textArea.closest('.col');

        colWrapper.addEventListener("dragover", function (event) {
            event.preventDefault();
            event.stopPropagation();
            colWrapper.classList.add("drag-over");
        });

        colWrapper.addEventListener("dragleave", function (event) {
            event.preventDefault();
            event.stopPropagation();
            colWrapper.classList.remove("drag-over");
        });

        colWrapper.addEventListener("drop", function (event) {
            event.preventDefault();
            event.stopPropagation();
            colWrapper.classList.remove("drag-over");

            var files = event.dataTransfer.files;
            if (files.length > 0) {
                var file = files[0];
                var ext = file.name.split('.').pop().toLowerCase();
                if (['ttf', 'otf', 'woff', 'woff2'].indexOf(ext) !== -1) {
                    loadFontFile(file, colNum);
                }
            }
        });
    })(i);
}
