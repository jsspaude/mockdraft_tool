import regeneratorRuntime from 'regenerator-runtime';
import { objectStores, counter } from './src/config';
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
    this.view.bindAuto(this.handleAuto);
  }

  async init() {
    await this.model.openDB();
    await this.model.getAllData('playerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'players');
        });
        document.querySelectorAll('[data-js="true"').forEach((item) => {
          const a = item;
          console.log(a);
          a.style.display = 'none';
        });
      });
    await this.model.getAllData('managerStore')
      .then((request) => {
        request.forEach(async (item) => {
          await this.view.displayMarkup(item, 'manager');
          await this.view.createTables(item);
          if (item.players) {
            await this.view.populateTables(item.players, item.managerNum);
            await this.view.populateBench(item.players, item.managerNum);
          }
        });
      });
    await this.model.getAllData('settingsStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'settings');
        });
      });
  }

  handleInputs = (data) => {
    const newObj = {
      numManagers: data[1], rounds: data[0], currManager: 0, currRound: 1,
    };
    this.model.addData('settingsStore', undefined, newObj);
  }

  handleStart = async (data) => {
    await this.model.players.then((request) => {
      this.model.addData('playerStore', request, undefined);
    });
    this.model.getAllData('playerStore').then((request) => {
      request.forEach((item) => {
        this.view.displayMarkup(item, 'players');
      });
    });
    await this.model.addData('managerStore', data);
    await this.model.getAllData('managerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'manager');
        });
        request.forEach((item) => {
          this.view.createTables(item);
        });
      });
    await this.model.getAllData('settingsStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'settings');
        });
      });
  }

  handleReset = () => {
    this.model.storeClear(['playerStore', 'managerStore', 'settingsStore']);
  }

  handleDraft = async (target) => {
    this.target = target;
    const data = { ...target.dataset };
    const primary = parseInt(data.key, 10);
    await this.model.getAllData('settingsStore').then(async (request) => {
      const prime = await request[0].primaryKey;
      const { currManager } = await request[0];
      const primes = await this.model.getCursorData('managerStore', undefined, true);
      await counter(currManager, request[0].numManagers, request[0].currRound)
        .then((response) => {
          this.model.putData('settingsStore', parseInt(prime, 10), 'currManager', response.curr);
          this.model.putData('settingsStore', parseInt(prime, 10), 'currRound', response.round);
          this.model.putData('playerStore', parseInt(primary, 10), 'drafted', true);
        });
      await this.model.getByPrimary('playerStore', primary)
        .then((item) => this.model.putData('managerStore', primes[currManager].primaryKey, 'players', item));
      await this.model.getAllData('settingsStore')
        .then((response) => response.forEach((item) => this.view.displayMarkup(item, 'settings')));
      await this.model.getAllData('managerStore')
        .then((result) => result.find(({ managerNum }) => managerNum === currManager))
        .then((result) => {
          if (result.players) {
            this.view.populateTables(result.players, result.managerNum);
            this.view.populateBench(result.players, result.managerNum);
          }
        });
    });
    this.target.parentElement.parentElement.style.display = 'none';
  }

  handleAuto = async (data) => {
    const buttons = document.querySelectorAll('button[data-key]');
    const autoArray = [...Array(data)].map((_, i) => buttons[i]);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of autoArray) {
      // eslint-disable-next-line no-await-in-loop
      await this.handleDraft(item);
    }
  }
}

window.onload = () => {
  const app = new Controller(new IndexedDB('mock', 1, objectStores), new View()).init();
};
