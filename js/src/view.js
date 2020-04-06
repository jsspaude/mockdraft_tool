import { dbGetCursorData } from './db';
import { chunkArray as configChunkArray } from './config';

// USE CURSOR TO EXTRACT - (cursor.value.values, desired objectStore, keys
async function viewData() {
  const managerCursorKeys = ['managerNum', 'managerName'];
  let managerDisplayData;
  await dbGetCursorData('managerStore', managerCursorKeys)
    .then((values) => configChunkArray(values, managerCursorKeys.length))
    .then((result) => { managerDisplayData = result; });
    console.log(managerDisplayData);
  // await displayData(db, 'managerStore', document.querySelector('[data-js="managerContainer"]'));
}

function displayData(data, markup) {

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


export default { viewData };
export { viewData };
