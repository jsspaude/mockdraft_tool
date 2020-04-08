import { dbGetCursorData } from './db';


function displayData(data) {
  // const cont = container;
  // cont.innerHTML = markup(data);

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

// USE CURSOR TO EXTRACT - maybe change to collectCursorData and store in db file, 
// break this and view into separate functions
async function viewData() {
  const managerCursorKeys = ['managerNum', 'managerName'];
  const managerDisplayData = [];
  await dbGetCursorData('managerStore', managerCursorKeys)
    .then((values) => {
      values.forEach((value, i) => {
        if ((i - 1) % (managerCursorKeys.length)) {
          const obj1 = { ...value };
          const obj2 = { ...values[i + 1] };
          const obj3 = { ...obj1, ...obj2 };
          return managerDisplayData.push(obj3);
        }
        return managerDisplayData;
      });
    });
}

export default { viewData };
export { viewData };
