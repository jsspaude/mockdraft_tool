import { collectCursorData } from './db';
import { catObjects } from './config';

const currSettingsArray = [];


function displayData(data, markup, container) {
  const cont = container;
  cont.innerHTML += markup(data);
}

function managerMarkup(data) {
  const markup = `
  <article data-manager=${data.managerNum}>
    <table data-manager=${data.managerNum}>
      <th>${data.managerName}</th>
      <tr data-manager=${data.managerNum}>
        <td value='qb'>QB</td>
        <td value='qb' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='rb'>RB</td>
        <td value='rb' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='rb''>RB</td>
        <td value='rb' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='wr'>WR</td>
        <td value='wr' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='wr'>WR</td>
        <td value='wr' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='te'>TE</td>
        <td value='te' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='k'>K</td>
        <td value='k' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='dst'>D/ST</td>
        <td value='dst' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-drafted='false'></td>
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

async function viewData() {
  await collectCursorData('playerStore', ['manager', 'adp', 'name', 'pos', 'team'], 'true').then((result) => {
    result.forEach((object) => {
      const data = catObjects(object);
      displayData(data, playersMarkup, document.querySelector('[data-js="playerTable"]'));
    });
  });
  await collectCursorData('managerStore', ['managerNum', 'managerName']).then((result) => {
    result.forEach((object) => {
      const data = catObjects(object);
      console.log(data);
      displayData(data, managerMarkup, document.querySelector('[data-js="managerContainer"]'));
    });
  });
  await collectCursorData('settingsStore', ['currManager', 'currRound']).then((result) => {
    let data;
    result.forEach((object) => {
      data = catObjects(object);
      displayData(data, settingsMarkup, document.querySelector('[data-js="settingsContainer"]'));
    });
    currSettingsArray.push(data);
    return data;
  });
}

export default { viewData };
export { viewData, currSettingsArray };
