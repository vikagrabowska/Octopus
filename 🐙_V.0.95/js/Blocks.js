//
// Script responsible for toggling text blocks in the 'Features' window
//
// .col-{} - this is a column
// .gcp-{} - this is a column
// gcp_{}()

function toggleColumn(section, columnId, opct, gcp) {
  const column = document.getElementById(columnId);
  const opacityBoxEdit = opct;
  const topColumns = Array.from(document.querySelectorAll('.wrap-col-top .col'));
  const bottomColumns = Array.from(document.querySelectorAll('.wrap-col-bot .col'));
  const topButton = document.getElementById('toggle-top');
  const bottomButton = document.getElementById('toggle-bottom');
  const element = document.querySelector('#'+gcp);
  // opacity
  if (localStorage.getItem(columnId) == null) {
    // console.log("null");
    // document.getElementById(opacityBoxEdit).style.opacity = .3;
    element.classList.replace("grid-col-prop", "grid-col-prop-off");

  } else if (localStorage.getItem(columnId) == "hidden") {
    // console.log("hidden");
    // document.getElementById(opacityBoxEdit).style.opacity = 1;
    element.classList.replace("grid-col-prop-off", "grid-col-prop");

  } else if (localStorage.getItem(columnId) == "active") {
    // console.log("active");
    // document.getElementById(opacityBoxEdit).style.opacity = .3;
    element.classList.replace("grid-col-prop", "grid-col-prop-off");

  } else {
    // console.log("else");
    // document.getElementById(opacityBoxEdit).style.opacity = .3;
    element.classList.replace("grid-col-prop", "grid-col-prop-off");

  }

  // ON/OFF Columns & localStorage
  if (column.style.display === 'none') {
    column.style.display = '';
    localStorage.setItem(columnId, 'active');
  } else {
    column.style.display = 'none';
    localStorage.setItem(columnId, 'hidden');
  }

  const isAllTopColumnsHidden = topColumns.every(col => col.style.display === 'none');
  if (isAllTopColumnsHidden) {
    document.getElementById('row-top').style.display = 'none';
    // topButton.textContent = 'Pokaż kolumny na górze';
    localStorage.setItem('row-top', 'hidden');
  } else {
    document.getElementById('row-top').style.display = '';
    // topButton.textContent = 'Ukryj kolumny na górze';
    localStorage.setItem('row-top', 'active');
  }

  const isAllBottomColumnsHidden = bottomColumns.every(col => col.style.display === 'none');
  if (isAllBottomColumnsHidden) {
    document.getElementById('row-bot').style.display = 'none';
    // bottomButton.textContent = 'Pokaż kolumny na dole';
    localStorage.setItem('row-bot', 'hidden');
  } else {
    document.getElementById('row-bot').style.display = '';
    // bottomButton.textContent = 'Ukryj kolumny na dole';
    localStorage.setItem('row-bot', 'active');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const topColumns = Array.from(document.querySelectorAll('.wrap-col-top .col'));
  const bottomColumns = Array.from(document.querySelectorAll('.wrap-col-bot .col'));

  const colTopState = localStorage.getItem('row-top');
  const colBotState = localStorage.getItem('row-bot');

  if (colTopState === 'hidden') {
    document.getElementById('row-top').style.display = 'none';
    // document.getElementById('toggle-top').textContent = 'Pokaż kolumny na górze';
  }

  if (colBotState === 'hidden') {
    document.getElementById('row-bot').style.display = 'none';
    // document.getElementById('toggle-bottom').textContent = 'Pokaż kolumny na dole';
  }

  topColumns.forEach(column => {
    const columnId = column.id;
    const columnState = localStorage.getItem(columnId);
    if (columnState === 'hidden') {
      column.style.display = 'none';
    }
  });

  bottomColumns.forEach(column => {
    const columnId = column.id;
    const columnState = localStorage.getItem(columnId);
    if (columnState === 'hidden') {
      column.style.display = 'none';
    }
  });

});

// const buttons = document.querySelectorAll(".btn-close");

// buttons.forEach(button => {
//   button.addEventListener("click", function() {
//     const block = this.parentElement;
//     block.classList.toggle("grid-col-prop-off");
//   });
// });