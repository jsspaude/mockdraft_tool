const isEven = (value) => { // HELPER FOR ROUND TRACKING
  if (value % 2 == 0) return true;
  return false;
};

const addRows = (parent, value) => {
  for (let i = 0; i < rounds; i++) {
    const draftRow = document.createElement('tr');
    parent.appendChild(draftRow);

    for (let i = 0; i < 2; i++) {
      draftData = document.createElement('td');
      draftRow.appendChild(draftData);
      draftData.setAttribute('data-td', i);
    }

    if (i > 8) {
      draftRow.firstChild.innerText = 'BENCH';
      draftData.parentElement.children[1].setAttribute('data-pos', 'bench');
      draftData.parentElement.children[1].setAttribute('data-manager', value.managerNum);
    } else {
      draftRow.firstElementChild.innerText = positions[i].toUpperCase();
      draftData.parentElement.children[1].setAttribute('data-pos', positions[i]);
      draftData.parentElement.children[1].setAttribute('data-manager', value.managerNum);
    }
  }
};


function displayData() {
  console.log('test');
}

function managerMarkup(data) {
  const markup = `
  <article data-js='manager '>
  <tr data-playerKey=${data} data-manager=${data}>
  <td>${cursor.value.adp}</td>
  <td>${cursor.value.name}</td>
  <td>${cursor.value.pos}</td>
  <td>${cursor.value.team}</td>
  <button data-playerKey=${cursor.value.id} data-manager=${cursor.value.manager} data-js='draftBtn'>DRAFT</button>
</tr>`;
}


export default { displayData };
export { displayData };
