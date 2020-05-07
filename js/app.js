import regeneratorRuntime from 'regenerator-runtime';
import { objectStores, groupBy } from './src/config';
import { View } from './src/view2';
import { IndexedDB } from './src/model';

// SETUP DB:
// on load setupDB, if settingsStore has data then display draft data

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindInputs(this.handleInputs);
    this.view.bindReset(this.handleReset);
    this.view.bindStart(this.handleStart);
    this.view.bindDraft(this.handleDraft);
  }

  async init() {
    await this.model.openDB();
    await this.model.getAllData('playerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'players', document.querySelector('[data-js="playerTable"]'), true);
        });
      });
    await this.model.getAllData('managerStore')
      .then((request) => {
        request.forEach((item) => {
          console.log(item);
          this.view.displayMarkup(item, 'manager', document.querySelector('[data-js="managerContainer"]'), true);
        });
      });
    await this.model.getAllData('settingsStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'settings', document.querySelector('[data-js="settingsContainer"]'), true);
        });
      });
  }

  handleInputs = (data) => {
    const newObj = {
      numManagers: data[0], rounds: data[1], currManager: 0, currRound: 0,
    };
    this.model.addData('settingsStore', undefined, newObj);
  }

  handleStart = async (data) => {
    await this.model.players.then((request) => {
      this.model.addData('playerStore', request, undefined);
    });
    this.model.getAllData('playerStore').then((request) => {
      request.forEach((item) => {
        this.view.displayMarkup(item, 'players', document.querySelector('[data-js="playerTable"]'), true);
      });
    });
    await this.model.addData('managerStore', data);
    await this.model.getAllData('managerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'manager', document.querySelector('[data-js="managerContainer"]'), true);
        });
      });
    await this.model.getAllData('settingsStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'settings', document.querySelector('[data-js="settingsContainer"]'), true);
        });
      });
  }

  handleReset = () => {
    this.model.storeClear(['playerStore', 'managerStore', 'settingsStore']);
  }

  handleDraft = async (data) => {
    const primary = parseInt(data.key, 10);
    await this.model.getAllData('settingsStore').then(async (request) => {
      const prime = await request[0].primaryKey;
      const { currManager } = await request[0];
      const container = await document.querySelector(`article[data-manager="${currManager}"]`);
      console.log(document.querySelector(`article[data-manager="${currManager}"]`));
      const primes = await this.model.getCursorData('managerStore', undefined, true);
      // await this.model.putData('settingsStore', parseInt(prime, 10), 'currManager', (currManager + 1));
      await this.model.getByPrimary('playerStore', primary)
        .then((item) => {
          this.model.putData('managerStore', primes[currManager].primaryKey, 'players', item)
            .then(async (result) => {
              const resultUpdate = await result;
              resultUpdate.players = groupBy(result.players, 'pos');
              return resultUpdate;
            })
            .then((result) => {
              console.log(result);
              console.log(container);
              container.innerHTML = this.view.displayMarkup(result, 'manager', document.querySelector('[data-js="managerContainer"]'));
            });
        });
    });
  }
}

window.onload = () => {
  const app = new Controller(new IndexedDB('mock', 1, objectStores), new View()).init();
};
