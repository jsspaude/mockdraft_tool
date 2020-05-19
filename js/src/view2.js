import { positionsArray, groupBy, positions } from './config'; // HERE - positions is a user setting to be added later so switch to a handler event - similiar to other user settings

// CREATE TEXT INPUTS
function createManagerInputs(i) {
  const nameInput = document.createElement('input');
  const managerName = document.querySelector('[data-js="managerInputContainer"]').appendChild(nameInput);
  managerName.setAttribute('placeholder', `Manager ${i}`);
  managerName.setAttribute('data-manager', i);
  managerName.setAttribute('data-js', 'managerInput');
}

export default class View {
  constructor() {
    this.optionInput1 = document.querySelector('[data-js="numRounds"]');
    this.optionInput2 = document.querySelector('[data-js="numManagers"]');
    this.optionInput3 = document.querySelector('[data-js="numAuto"]');
    this.positions = positions;
    this.inputContainer = document.querySelector('[data-js="managerInputContainer"]');
    this.displayContainer1 = document.querySelector('[data-js="playerTable"]');
    this.displayContainer2 = document.querySelector('[data-js="managerContainer"]');
    this.displayContainer3 = document.querySelector('[data-js="settingsContainer"]');
  }

  bindInputs(handler) {
    document.querySelector('[data-js="settingsForm"]').addEventListener('submit', async (event) => {
      event.preventDefault();
      [...Array(parseInt(this.optionInput2.value, 10))].forEach((_, i) => createManagerInputs(i));
      handler([parseInt(this.optionInput1.value, 10), parseInt(this.optionInput2.value, 10)]);
    });
  }

  bindAuto(handler) {
    document.querySelector('[data-js="autoForm"]').addEventListener('submit', async (event) => {
      event.preventDefault();
      handler(parseInt(this.optionInput3.value, 10));
    });
  }

  bindReset(handler) {
    document.querySelector('[data-js="resetBtn"]').addEventListener('click', async (event) => {
      event.preventDefault();
      this.inputContainer.innerHTML = '';
      this.displayContainer1.innerHTML = '';
      this.displayContainer2.innerHTML = '';
      this.displayContainer3.innerHTML = '';
      handler();
    });
  }

  bindStart(handler) {
    document.querySelector('[data-js="startDraft"]').addEventListener('submit', async (event) => {
      event.preventDefault();
      this.inputText = [...document.querySelectorAll('[data-js="managerInput"]')];
      const managerInputData = Array.from([...this.inputText.map((v) => v.value)], (item, i) => item || `Manager ${i}`);
      const managerStoreData = managerInputData.map((v, i) => {
        const myObj = {};
        myObj.managerNum = i;
        myObj.managerName = v;
        myObj.players = undefined;
        return myObj;
      });
      handler(managerStoreData);
    });
  }

  bindDraft(handler) {
    this.displayContainer1.addEventListener('click', async (e) => {
      e.preventDefault();
      if (e.target.tagName === 'BUTTON') {
        const obj = e.target.dataset;
        handler({ ...obj });
      }
      e.stopPropagation();
    }, false);
  }

  // HERE GET RID OF INIT IF POSSIBLE - TOO CLUNKY
  displayMarkup(data, markup) {
    let newMarkup = '';
    let container;
    if (markup === 'players') {
      container = this.displayContainer1;
      newMarkup = `
        <tr>
          <td data-name='${data.name}'>${data.name}</td>
          <td>${data.pos}</td>
          <td>${data.adp}</td>
          <td>${data.team}</td>
          <td> 
            <button data-key='${data.primaryKey}' data-manager='${data.managerNum}' data-adp='${data.adp}' data-name='${data.name}' data-team='${data.team}' data-pos='${data.pos}'>DRAFT</button> 
          </td>
        </tr>`;
      container.innerHTML += newMarkup;
    }
    if (markup === 'manager') {
      container = this.displayContainer2;
      newMarkup = `
          <article id=${data.managerName.replace(/\s+/g, '')} data-manager=${data.managerNum}>
            <table data-manager=${data.managerNum}>
              <th>${data.managerName}</th>
            </table>
          </article>
        `;
      container.innerHTML += newMarkup;
    }
    if (markup === 'settings') {
      container = this.displayContainer3;
      newMarkup = `
        <article data-js='settingsList'>
          <h2>Round ${data.currRound}</h2>
          <h3>Now Drafting: Manager ${data.currManager}</h3>
        </article>
        `;
      container.innerHTML = newMarkup;
    }
    return newMarkup;
  }

  async createTables(data) {
    return new Promise((resolve) => {
      const rowArray = [];
      positionsArray(this.positions).forEach((item) => {
        const newRow = document.createElement('tr');
        const newCell = document.createElement('td');
        newCell.innerHTML = item;
        newRow.append(newCell);
        newRow.dataset.pos = item;
        rowArray.push(newRow);
      });
      resolve(rowArray);
    }).then((result) => {
      document.querySelector(`table[data-manager="${data.managerNum}"]`).append(...result);
      return document.querySelector(`table[data-manager="${data.managerNum}"]`);
    });
  }

  populateTables(data, display) {
    return new Promise((resolve) => {
      const container = this.displayContainer2.querySelector(`table[data-manager="${display}"]`);
      const groupedObjects = groupBy(data, 'pos');
      const benchArray = Object.keys(groupedObjects).map((pos) => {
        const tableRows = container.querySelectorAll(`tr[data-pos="${pos}"]`);
        tableRows.forEach((row, i) => {
          const newCell = document.createElement('td');
          if (groupedObjects[pos][i] !== undefined && row.children.length === 1) {
            newCell.innerHTML = groupedObjects[pos][i].name;
            row.append(newCell);
          }
        });
        const bench = groupedObjects[pos].map((item, i) => i >= this.positions[pos] && item)
          .filter((result) => result !== false);
        return bench;
      }).reduce((a, b) => a.concat(b));
      resolve(benchArray);
    });
  }

  populateBench(array, display) {
    const container = this.displayContainer2.querySelector(`table[data-manager="${display}"]`);
    const flexContainer = container.querySelector('tr[data-pos="FLEX"]');
    const flexIndex = array.findIndex(({ pos }) => pos !== 'QB', 'K', 'DST');
    const benchArray = () => { array.splice(flexIndex, 1); return array; };
    const createFlex = () => {
      if (array) {
        const newCell = document.createElement('td');
        newCell.innerHTML = `${array[flexIndex].name}, ${array[flexIndex].pos} - ${array[flexIndex].team}`;
        flexContainer.append(newCell);
      }
    };
    if (flexContainer.children.length === 1) {
      createFlex();
      if (benchArray()) {
        benchArray().forEach((item) => {
          const newRow = document.createElement('tr');
          const newCellLabel = document.createElement('td');
          const newCellData = document.createElement('td');
          newCellLabel.innerHTML = 'BENCH';
          newCellLabel.setAttribute('data-js', 'bench');
          newCellData.innerHTML = `${item.name}, ${item.pos} - ${item.team}`;
          newRow.append(newCellLabel);
          newRow.append(newCellData);
          container.append(newRow);
        });
      }
    } else {
      console.log(container.querySelector('[data-js="bench"]'));
    }
  }
}


export { View };
