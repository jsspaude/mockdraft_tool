function positionTest(data, pos, posNum) {
  if (data.players === undefined || data.players[pos] === undefined
      || this.data.players[pos][posNum] === undefined) {
    return '';
  }
  return this.data.players[pos][posNum].name;
}

// CHECKS IF MAXNUMBER OF POSITION FILLED THEN CREATES BENCH ARRAY FOR BENCH DISPLAY
function benchTest(data) {
  if (data.players === undefined) {
    return '';
  }
  const benchArray = [];
  const maxPos = {
    QB: 1, RB: 2, WR: 2, TE: 1, K: 1, DST: 1, FLEX: 1,
  };
  Object.entries(maxPos).forEach((pos) => {
    if (data.players[`${pos[0]}`] !== undefined) {
      data.players[`${pos[0]}`].forEach((item, i) => {
        if (i + 1 > pos[1]) {
          benchArray.push(item);
        }
      });
    }
  });
  return benchArray;
}

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
    this.optionInput = parseInt(document.querySelector('[data-js="numManagers"]').value, 10);
    this.inputContainer = document.querySelector('[data-js="managerInputContainer"]');
    this.displayContainer1 = document.querySelector('[data-js="playerTable"]');
    this.displayContainer2 = document.querySelector('[data-js="managerContainer"]');
    this.displayContainer3 = document.querySelector('[data-js="settingsContainer"]');
  }

  bindInputs(handler) {
    document.querySelector('[data-js="settingsForm"]').addEventListener('submit', async (event) => {
      event.preventDefault();
      [...Array(this.optionInput)].forEach((_, i) => createManagerInputs(i));
      handler([parseInt(this.intInput.value, 10), this.optionInput]);
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
        return myObj;
      });
      handler(managerStoreData);
    });
  }

  bindDraft(handler) {
    this.displayContainer1.addEventListener('click', async (e) => {
      e.preventDefault();
      if (e.target.tagName === 'BUTTON') {
        handler(e.target.dataset);
      }
      e.stopPropagation();
    }, false);
  }

  // function activateDraftButtons() {
  //   const playerTable = document.querySelector('[data-js="playerTable"]');
  //   playerTable.addEventListener('click', async (e) => {
  //     e.preventDefault();
  //     if (e.target.tagName === 'BUTTON') {
  //       const storedPlayerData = updatePlayerData(e.target, currSettings.currManager);
  //       const primary = await dbGetCursorData('managerStore', undefined, true);
  //       draftPutDisplay(primary[currSettings.currManager].primaryKey, storedPlayerData);
  //     }
  //     e.stopPropagation();
  //   }, false);
  // }


  displayMarkup(data, markup, container, init) {
    const cont = container;
    let newMarkup = '';
    if (markup === 'manager') {
      const benchArray = benchTest(data);
      let bench = '';
      if (benchArray === undefined || benchArray.length === 0) {
        bench = '';
      } else {
        benchArray.forEach((item) => {
          bench += `<li>${item.name}</li>`;
        });
      }

      newMarkup = `
          <article id=${data.managerName.replace(/\s+/g, '')} data-manager=${data.managerNum}>
            <table data-manager=${data.managerNum}>
              <th>${data.managerName}</th>
              <tr>
                <td>QB</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'QB', 0, 1)}</td>
              </tr>
              <tr>
                <td>RB</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'RB', 0, 2)}</td>
              </tr>
              <tr>
                <td>RB</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'RB', 1, 2)}</td>
              </tr>
              <tr>
                <td>WR</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'WR', 0, 2)}</td>
              </tr>
              <tr>
                <td>WR</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'WR', 1, 2)}</td>
              </tr>
              <tr>
                <td>TE</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'TE', 0, 1)}</td>
              </tr>
              <tr>
                <td>K</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'K', 0, 1)}</td>
              </tr>
              <tr>
                <td>D/ST</td>
                <td data-manager=${data.managerNum}${positionTest(data, 'DST', 0, 1)}></td>
              </tr>
              <tr>
                <td>BENCH</td>
                <td data-manager=${data.managerNum}>
                  <ul>
                    ${bench}
                  </ul>
                </td>
              </tr>
            </table>
          </article>
        `;
    }
    if (markup === 'players') {
      newMarkup = `
        <tr>
          <td data-name='${data.name}'>${data.name}</td>
          <td>${data.pos}</td>
          <td>${data.adp}</td>
          <td>${data.team}</td>
          <td> 
            <button data-js='draftBtn' data-key='${data.primaryKey}' data-manager='${data.managerNum}' data-adp='${data.adp}' data-name='${data.name}' data-team='${data.team}' data-pos='${data.pos}'>DRAFT</button> 
          </td>
        </tr>`;
    }
    if (markup === 'settings') {
      newMarkup = `
        <article data-js='settingsList'>
          <h2>Round ${data.currRound}</h2>
          <h3>Now Drafting: Manager ${data.currManager}</h3>
        </article>
        `;
    }
    if (init) { cont.innerHTML += newMarkup; }
    return newMarkup;
  }
}

export { View };
