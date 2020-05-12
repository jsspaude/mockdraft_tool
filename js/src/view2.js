import { positionsArray, groupBy, positions } from './config'; // HERE - positions is a user setting to be added later so switch to a handler event - similiar to other user settings

// CHECKS IF MAXNUMBER OF POSITION FILLED THEN CREATES BENCH ARRAY FOR BENCH DISPLAY

// HERE get array of values pased on data.players.pos, if length is greater than positions # (i.e. positions.RB.value)
// add to benchArray, have bench be an if statement and display array
// for flex do if (benchArray.pos !=== QB) { display benchArray[0]} or create flexArray as well it can be a map/filter of bench Array;
// function benchTest(data) {
//   if (data.players === undefined) {
//     return '';
//   }
//   const benchArray = [];
//   Object.entries(positions).forEach((pos) => {
//     if (data.players[`${pos[0]}`] !== undefined) {
//       data.players[`${pos[0]}`].forEach((item, i) => {
//         if (i + 1 > pos[1]) {
//           benchArray.push(item);
//         }
//       });
//     }
//   });
//   return benchArray;
// }

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
    this.intInput = document.querySelector('[data-js="numRounds"]');
    this.optionInput = document.querySelector('[data-js="numManagers"]');
    this.positions = positions;
    this.inputContainer = document.querySelector('[data-js="managerInputContainer"]');
    this.displayContainer1 = document.querySelector('[data-js="playerTable"]');
    this.displayContainer2 = document.querySelector('[data-js="managerContainer"]');
    this.displayContainer3 = document.querySelector('[data-js="settingsContainer"]');
  }

  bindInputs(handler) {
    document.querySelector('[data-js="settingsForm"]').addEventListener('submit', async (event) => {
      event.preventDefault();
      [...Array(parseInt(this.optionInput.value, 10))].forEach((_, i) => createManagerInputs(i));
      handler([parseInt(this.intInput.value, 10), parseInt(this.optionInput.value, 10)]);
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

  async populateTables(data) {
    const benchArray = [];
    const table = this.displayContainer2.querySelector(`table[data-manager="${data.managerNum}"]`);
    if (data.players !== undefined) {
      const players = await groupBy(data.players, 'pos');
      Object.keys(players).forEach((key) => {
        const tableRows = table.querySelectorAll(`tr[data-pos="${key}"]`);
        tableRows.forEach((row, i) => {
          const newCell = document.createElement('td');
          if (players[key][i] !== undefined) {
            newCell.innerHTML = players[key][i].name;
            if (row.children.length === 1) {
              row.append(newCell);
            }
          }
        });
      });
      [players].forEach((player) => {
        Object.keys(player).forEach((pos) => {
          players[pos].forEach((item, i) => {
            if (i + 1 > this.positions[pos]) {
              benchArray.push(item);
            }
          });
        });
      });
    }
    if (benchArray !== []) {
      benchArray.forEach((bench) => {
        const benchRow = document.createElement('tr');
        const benchLabel = document.createElement('td');
        const benchCell = document.createElement('td');
        benchCell.innerHTML = bench.name;
        benchLabel.innerHTML = 'BENCH';
        benchRow.append(benchLabel);
        benchRow.append(benchCell);
        table.append(benchRow);
      });
    }
  }
}


export { View };
