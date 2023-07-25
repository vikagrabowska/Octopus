// .col-{} – to jest kolumna
// .gcp-{} – to jest kolumna
// gcp_{}()

function toggleColumn(section, columnId) {
    const column = document.getElementById(columnId);
    const topColumns = Array.from(document.querySelectorAll('.wrap-col-top .col'));
    const bottomColumns = Array.from(document.querySelectorAll('.wrap-col-bot .col'));
    const topButton = document.getElementById('toggle-top');
    const bottomButton = document.getElementById('toggle-bottom');

    if (column.style.display === 'none') {
      column.style.display = '';
    } else {
      column.style.display = 'none';
    }

    const isAllTopColumnsHidden = topColumns.every(col => col.style.display === 'none');
    if (isAllTopColumnsHidden) {
      document.getElementById('row-top').style.display = 'none';
      topButton.textContent = 'Pokaż kolumny na górze';
    } else {
      document.getElementById('row-top').style.display = '';
      topButton.textContent = 'Ukryj kolumny na górze';
    }

    const isAllBottomColumnsHidden = bottomColumns.every(col => col.style.display === 'none');
    if (isAllBottomColumnsHidden) {
      document.getElementById('row-bot').style.display = 'none';
      bottomButton.textContent = 'Pokaż kolumny na dole';
    } else {
      document.getElementById('row-bot').style.display = '';
      bottomButton.textContent = 'Ukryj kolumny na dole';
    }
  }