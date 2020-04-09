import { dbGetCursorData, collectCursorData } from './db';


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
        <td value='qb' data-js='drafted'>QB</td>
        <td value='qb' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='rb' data-js='drafted'>RB</td>
        <td value='rb' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='rb' data-js='drafted'>RB</td>
        <td value='rb' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='wr' data-js='drafted'>WR</td>
        <td value='wr' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='wr' data-js='drafted'>WR</td>
        <td value='wr' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='te' data-js='drafted'>TE</td>
        <td value='te' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='k' data-js='drafted'>K</td>
        <td value='k' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='dst'>D/ST</td>
        <td value='dst' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
    </table>
  </article>`;
  return markup;
}

function playersMarkup(data) {
  const markup = `
  <article data-manager=${data.managerNum}>
    <table data-manager=${data.managerNum}>
      <th>${data.managerName}</th>
      <tr data-manager=${data.managerNum}>
        <td value='qb' data-js='drafted'>QB</td>
        <td value='qb' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='rb' data-js='drafted'>RB</td>
        <td value='rb' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='rb' data-js='drafted'>RB</td>
        <td value='rb' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='wr' data-js='drafted'>WR</td>
        <td value='wr' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='wr' data-js='drafted'>WR</td>
        <td value='wr' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='te' data-js='drafted'>TE</td>
        <td value='te' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='k' data-js='drafted'>K</td>
        <td value='k' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='dst'>D/ST</td>
        <td value='dst' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td value='bench'>BENCH</td>
        <td value='bench' data-js='drafted'></td>
      </tr>
    </table>
  </article>`;
  return markup;
}

async function viewData() {
  await collectCursorData('managerStore', ['managerNum', 'managerName']).then((result) => {
    result.forEach((item, i) => {
      displayData(result[i], managerMarkup, document.querySelector('[data-js="managerContainer"]'));
    });
  });
  await collectCursorData('playerStore', ['manager', 'adp', 'name', 'pos', 'team']);
// .then((result) => {result.forEach((item, i) => {displayData(result[i], managerMarkup, document.querySelector('[data-js="managerContainer"]'));});});
}

export default { viewData };
export { viewData };
