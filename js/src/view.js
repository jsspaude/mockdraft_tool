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


const displayData = (db, store, mark, container) => {
  const tx = db.transaction([`${store}`], 'readwrite');
  const objectStore = tx.objectStore(`${store}`);
  const cont = container;

  objectStore.openCursor().onsuccess = async (e) => {
    const cursor = e.target.result;
    if (cursor) {
      const markup = mark;
      cont.innerHTML = markup;
      cursor.continue();
    } else {
      console.log('All Managers Displayed');
    }
  };
};

export default { displayData };
export { displayData };
