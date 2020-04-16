import { dbGetData } from "./db";

function displayData(data, markup, container) {
  const cont = container;
  cont.innerHTML += markup(data);
}

function displayDrafted(data) {
  // const obj = data.player[0];
  // const newObj = { ...obj };
  // console.log(obj);
  // const cont = document.querySelector(`[data-manager="${data.managerNum}"] [data-drafted-pos="${data.player[2]}"]`);
  // console.log(cont);
}

// PULLS ALL PLAYER DATA FROM CURRENT MANAGER INTO AN ARRAY FOR DISPLAY
async function draftedMarkup(data, currManager) {
  const assignData = () => Promise.resolve(data);
  await assignData().then((result) => {
    const players = result.map((item) => item.players)
      .filter((el) => el != null)
      .reduce((array) => array);
    return players;
  }).then((players) => players.forEach((player) => {
    // const position = player.pos.toLowerCase();
    // const td = document.querySelectorAll(`[data-drafted-pos="${position}"][data-manager="${currManager}"]`);
    // // eslint-disable-next-line no-param-reassign
    // td.forEach((d) => { d.innerHTML = player.name; });
  }));
}

function managersMarkup(data) {
  const markup = `
  <article data-manager=${data.managerNum}>
    <table data-manager=${data.managerNum}>
      <th>${data.managerName}</th>
      <tr>
        <td>QB</td>
        <td data-manager=${data.managerNum} data-drafted-pos='qb' data-drafted='false'></td>
      </tr>
      <tr>
        <td>RB</td>
        <td data-manager=${data.managerNum} data-drafted-pos='rb' data-drafted='false'></td>
      </tr>
      <tr>
        <td>RB</td>
        <td data-manager=${data.managerNum} data-drafted-pos='rb' data-drafted='false'></td>
      </tr>
      <tr>
        <td>WR</td>
        <td data-manager=${data.managerNum} data-drafted-pos='wr' data-drafted='false'></td>
      </tr>
      <tr>
        <td>WR</td>
        <td data-manager=${data.managerNum} data-drafted-pos='wr' data-drafted='false'></td>
      </tr>
      <tr>
        <td>TE</td>
        <td data-manager=${data.managerNum} data-drafted-pos='te' data-drafted='false'></td>
      </tr>
      <tr>
        <td>K</td>
        <td data-manager=${data.managerNum} data-drafted-pos='k' data-drafted='false'></td>
      </tr>
      <tr>
        <td>D/ST</td>
        <td data-manager=${data.managerNum} data-drafted-pos='dst' data-drafted='false'></td>
      </tr>
      <tr>
        <td>BENCH</td>
        <td data-manager=${data.managerNum} data-drafted-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td>BENCH</td>
        <td data-manager=${data.managerNum} data-drafted-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td>BENCH</td>
        <td data-manager=${data.managerNum} data-drafted-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td>BENCH</td>
        <td data-manager=${data.managerNum} data-drafted-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td>BENCH</td>
        <td data-manager=${data.managerNum} data-drafted-pos='bench' data-drafted='false'></td>
      </tr>
    </table>
  </article>`;
  return markup;
}

function playersMarkup(data) {
  const markup = `
      <tr>
        <td data-name='${data.name}'>${data.name}</td>
        <td>${data.pos}</td>
        <td>${data.adp}</td>
        <td>${data.team}</td>
        <td> 
          <button data-js='draftBtn' data-key='${data.primaryKey}' data-manager='${data.manager}' data-adp='${data.adp}' data-name='${data.name}' data-team='${data.team}' data-pos='${data.pos}'>DRAFT</button> 
        </td>
      </tr>`;
  return markup;
}

function settingsMarkup(data) {
  const markup = `
      <article data-js='settingsList'>
        <h2>Round ${data.currRound}</h2>
        <h3>Now Drafting: Manager ${data.currManager}</h3>
      </article>
      `;
  return markup;
}

export default { displayData };
export {
  displayData, managersMarkup, playersMarkup, settingsMarkup, displayDrafted, draftedMarkup,
};
