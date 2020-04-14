function displayData(data, markup, container) {
  const cont = container;
  cont.innerHTML += markup(data);
}

function displayDrafted(data) {
  // const obj = data.player[0];
  // const newObj = { ...obj };
  // console.log(obj);
  // const cont = document.querySelector(`[data-manager="${data.managerNum}"] [data-pos="${data.player[2]}"]`);
  // console.log(cont);
}

function draftedMarkup() {

}

function managersMarkup(data) {

  const markup = `
  <article data-manager=${data.managerNum}>
    <table data-manager=${data.managerNum}>
      <th>${data.managerName}</th>
      <tr>
        <td data-pos='qb'>QB</td>
        <td data-manager=${data.managerNum} data-pos='qb' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='rb'>RB</td>
        <td data-manager=${data.managerNum} data-pos='rb' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='rb''>RB</td>
        <td data-manager=${data.managerNum} data-pos='rb' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='wr'>WR</td>
        <td data-manager=${data.managerNum} data-pos='wr' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='wr'>WR</td>
        <td data-manager=${data.managerNum} data-pos='wr' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='te'>TE</td>
        <td data-manager=${data.managerNum} data-pos='te' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='k'>K</td>
        <td data-manager=${data.managerNum} data-pos='k' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='dst'>D/ST</td>
        <td data-manager=${data.managerNum} data-pos='dst' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='bench'>BENCH</td>
        <td data-manager=${data.managerNum} data-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='bench'>BENCH</td>
        <td data-manager=${data.managerNum} data-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='bench'>BENCH</td>
        <td data-manager=${data.managerNum} data-pos='bench' data-drafted='false'></td>
      </tr>
      <tr>
        <td data-pos='bench'>BENCH</td>
        <td data-manager=${data.managerNum} data-pos='bench' data-drafted='false'></td>
      </tr>
      <tr data-manager=${data.managerNum}>
        <td data-pos='bench'>BENCH</td>
        <td data-pos='bench' data-drafted='false'></td>
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
  displayData, managersMarkup, playersMarkup, settingsMarkup, displayDrafted,
};
