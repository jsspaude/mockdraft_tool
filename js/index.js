const   namesButton         = document.querySelector('[data-js="manNameBtn"]'),
        objectStores        = ['playerStore','managerStore','settingsStore'],
        buttons             = [document.querySelector('[data-js="startDraft"]'), document.querySelector('[data-js="manNameBtn"]')],
        objectStoreArray    = [],
        transactionArray    = [];

let requestURL              = 'js/draft_data.json',
    db,
    request                 = new XMLHttpRequest();

//IMPORT JSON
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    players     = request.response;
    playersKeys = Object.keys(players[0]);
};



//START DB
window.onload = async function(e) {
    let request = window.indexedDB.open('mockDraft', 1);

    request.onerror = function() {
        console.log('MockDraft Failed to Open');
    };
    request.onsuccess = function() {
        // console.log('MockDraft Data Inputted');
        db = request.result;
        let objectStore = objectStoreTransaction('playerStore');
    };
    
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        createStore(objectStores, db);
        const   [playerStore, managerStore, settingsStore] = objectStoreArray,
                playerIndexes = ['name', 'drafted', 'roundDrafted', 'manager'],
                settingsIndexes = ['currRound', 'currManager', 'numManagers', 'tracker'],
                managerIndexes = ['managerNum'];

        createIndexes(playerStore, playerIndexes, true);
        createIndexes(settingsStore, settingsIndexes, true);
        createIndexes(managerStore, managerIndexes, true);
        console.log('MockDraft Stores Added');
    };

    //GET USER SETTINGS

    function initSettings() {
        let inputContainer  = document.querySelector('[data-js="managerInputContainer"]'),
        managerCount    = document.querySelector('select').value;

        for(let i=0; i < managerCount; i++) {
        let managerName = document.createElement('input');
        inputContainer.appendChild(managerName);
        managerName.setAttribute('placeholder', `Manager ${i}`);
        managerName.setAttribute('data-manager', i);
        managerName.setAttribute('data-js', 'managerName');
        }
    }

    //ADD EVENT LISTENERS

    buttons[0].onsubmit = addData;

    async function addData(e) {
        e.preventDefault();
        console.log('addData');
        let managerInput = document.querySelectorAll('[data-js="managerName"]'),
            transaction = db.transaction(['playerStore'],'readwrite'),
            objectStore = transaction.objectStore('playerStore');
        
        objectStore.openCursor().onsuccess = function(e) {
            console.log('cursor');
            addPlayers = () => {
                for(const value of players){
                    console.log('addPlayers')
                    objectStore.add(value);
                };
            }
            runCursor = () => {
                let cursor = e.target.result;
                if(cursor) {
                    const   updatePlayer                = cursor.value;
                            updatePlayer.manager        = 99,
                            updatePlayer.drafted        = 0,
                            updatePlayer.roundDrafted   = 0;
                    cursor.update(updatePlayer);
                    cursor.continue();
                }
                else {
                    // console.log('Init Player Data Displayed');
                }
            }
            

            addPlayers();
            runCursor();
            
            
        };
    
        objectStore.transaction.oncomplete = function() {
            console.log('complete');
        }
    };
};


//ADD DATA



    
    

    // let playerTransaction   = db.transaction(['playerStore'], 'readwrite').objectStore('playerStore'),
    //     managerTransaction  = db.transaction(['managerStore'], 'readwrite'),
    //     settingsTransaction = db.transaction(['settingsStore'], 'readwrite'),
    //     playerStore         = playerTransaction,
    //     managerStore        = managerTransaction.objectStore('managerStore'),
    //     settingsStore       = settingsTransaction.objectStore('settingsStore'),
    //     newItem             = {numRounds: numRounds.value, currRound: 1, currManager: 0, numManagers: managerCount, tracker: 0};
    //     settingsRequest     = settingsStore.add(newItem);

    // for(const value of players){
    //     playerStore.add(value);
    // };

    // for(const [i,value] of managerInput.entries()){
    //     let newItem = { managerName: value.value, managerNum: i, playerName:[], playerPos: [], playerTeam:[] };
    //     managerStore.add(newItem);
    // };

    // playerStore.openCursor().onsuccess = function(e) {
    //     let cursor = e.target.result;
    //     if(cursor) {
    //         const   updatePlayer                = cursor.value;
    //                 updatePlayer.manager        = 99,
    //                 updatePlayer.drafted        = 0,
    //                 updatePlayer.roundDrafted   = 0;
            
    //         cursor.update(updatePlayer);
    //         cursor.continue();
    //     }
    //     else {
    //         // console.log('Init Player Data Displayed');
    //     }
    // };

    // playerTransaction.oncomplete = function() {
    //     // console.log('Data Stores Updated');
    //     asyncDisplay();
    // };


//HELPERS



function createStore(objects, database) {
    for(const object of objects) {
        objectStoreArray.push(database.createObjectStore(`${object}`, {keyPath: 'id', autoIncrement:true}));
    } 
}

function objectStoreTransaction(object) {
    let transaction = db.transaction([`${object}`], 'readwrite');
        objectStore = transaction.objectStore(`${object}`);
        return objectStore;
        console.log(objectStore);
}

function createIndexes(objectStore, indexes, boolean) {
    for(const index of indexes) {
        objectStore.createIndex(`${index}`, `${index}`, { unique: boolean })
    }
}

function addClickListeners(elements, e, callbacks) {
    for(const [i,element] of elements.entries()) {
        element.addEventListener(e[i], callbacks[i]);
    }
}







// const   playerTable             = document.querySelector('[data-js="playerTable"]'),
//         managerContainer        = document.querySelector('[data-js="managerContainer"]'),
//         managerInputContainer   = document.querySelector('[data-js="managerInputContainer"]'),
//         settings                = document.querySelector('[data-js="settings"]'),
//         namesButton             = settings.querySelector('[data-js="manNameBtn"]'),
//         resetButton             = settings.querySelector('[data-js="resetBtn"]'),
//         positions               =['qb','rb','rb','wr','wr','te','flex','dst','k'],
//         roundTracker            = document.querySelector('[data-js="roundTracker"]'),
//         managerTracker          = document.querySelector('[data-js="managerTracker"]'), 
//         numRounds               = settings.querySelector('[data-js="numRounds"]'),
//         formStart               = document.querySelector('[data-js="startDraft"]');
// let     managerCount,
//         managerInput,
//         currManager,
//         currRound,
//         currManagerName,
//         db,
//         players,
//         rounds;

//         requestURL              = 'js/draft_data.json';
//         request                 = new XMLHttpRequest();


//     // const objectStoreVars = (storeName, storeIndex, value) => {
//     //     let transaction = db.transaction([`${storeName}`]),
//     //         objectStore = transaction.objectStore(`${storeName}`);
//     //         console.log(transaction,objectStore);
//     //         return transaction, objectStore;
//     // }

//     // objectStoreVars('playerStore');

//     function addData(e) {//ADD PLAYER DATA + CREATE INDEXES
//         e.preventDefault();

//         let playerTransaction   = db.transaction(['playerStore'], 'readwrite'),
//             managerTransaction  = db.transaction(['managerStore'], 'readwrite'),
//             settingsTransaction = db.transaction(['settingsStore'], 'readwrite'),
//             playerStore         = playerTransaction.objectStore('playerStore'),
//             managerStore        = managerTransaction.objectStore('managerStore'),
//             settingsStore       = settingsTransaction.objectStore('settingsStore'),
//             newItem             = {numRounds: numRounds.value, currRound: 1, currManager: 0, numManagers: managerCount, tracker: 0};
//             settingsRequest     = settingsStore.add(newItem);

//         for(const value of players){
//             playerStore.add(value);
//         };

//         for(const [i,value] of managerInput.entries()){
//             let newItem = { managerName: value.value, managerNum: i, playerName:[], playerPos: [], playerTeam:[] };
//             managerStore.add(newItem);
//         };

//         playerStore.openCursor().onsuccess = function(e) {
//             let cursor = e.target.result;
//             if(cursor) {
//                 const   updatePlayer                = cursor.value;
//                         updatePlayer.manager        = 99,
//                         updatePlayer.drafted        = 0,
//                         updatePlayer.roundDrafted   = 0;
                
//                 cursor.update(updatePlayer);
//                 cursor.continue();
//             }
//             else {
//                 // console.log('Init Player Data Displayed');
//             }
//         };

//         playerTransaction.oncomplete = function() {
//             // console.log('Data Stores Updated');
//             asyncDisplay();
//         };
//     };



//     const displayPlayers = async () => {//DISPLAY PLAYER DATA
//         const   transaction = db.transaction(['playerStore'], 'readwrite');
//         let     playerStore = transaction.objectStore('playerStore'),
//                 draftBtn,
//                 draft       = await draftBtn.forEach((item) => item.addEventListener('click', throttle(draftPlayer,1000)));
        
       
//        playerStore.openCursor().onsuccess = await function(e){
//             let cursor = e.target.result;
//             if(cursor) {
//                 const   tableRow        = document.createElement('tr'),
//                         updatePlayer    = cursor.value;
//                         markup          = 
//                         `<tr data-playerKey=${cursor.value.id} data-manager=${cursor.value.manager}>
//                             <td>${cursor.value.adp}</td>
//                             <td>${cursor.value.name}</td>
//                             <td>${cursor.value.pos}</td>
//                             <td>${cursor.value.team}</td>
//                             <button data-js='draftBtn'>DRAFT</button>
//                         </tr>`;
//                 draftBtn                = [...document.querySelectorAll('[data-js="draftBtn"]')],

//                 cursor.update(updatePlayer);
//                 tableRow.innerHTML = markup;
//                 playerTable.appendChild(tableRow);
//                 cursor.continue();
//             } 
//             else {
//                 // console.log('Player Data Displayed');
//             }
//         };

//         console.log(draftBtn);

        
//     }

//     const displayManagers = () => {//DISPLAY MANAGER DATA
//         let managerStore    = db.transaction('managerStore').objectStore('managerStore');

//         managerStore.openCursor().onsuccess = async (e) => {
//             let cursor = e.target.result;
//             if(cursor) {
//                 const   article     = document.createElement('article'),
//                         table       = document.createElement('table'),
//                         managerData = document.createElement('th'),
//                         appendTable = async () => {
//                                         article.appendChild(table);
//                                         table.appendChild(managerData);
//                                         managerContainer.appendChild(article);
//                                         table.setAttribute('data-manager', cursor.value.managerNum);
//                                     };     
                                    
//                 appendTable();
//                 await addRows(table,cursor.value);
//                 await displayNames(cursor.value, managerData);
//                 cursor.continue();
//             } 
//             else {
//                 // console.log('Managers Displayed');
//             }
//         };
//     }

//     const displayInfo = () => {//DISPLAY GLOBAL DATA
//         let settingsTransaction     = db.transaction(["settingsStore"], "readwrite"),
//             settingsStore           = settingsTransaction.objectStore("settingsStore"),
//             settingsTrackerIndex    = settingsStore.index('tracker'),
//             settingsRequest         = settingsTrackerIndex.get(0);

//         settingsRequest.onsuccess = (e) => {
//             let data                    = e.target.result;
//                 currRound               = data.currRound;
//                 currManager             = data.currManager;
//                 roundTracker.innerText  = currRound;

//             let managerTransaction      = db.transaction(["managerStore"], "readwrite"),
//                 managerStore            = managerTransaction.objectStore("managerStore"),
//                 managerNumIndex         = managerStore.index('managerNum'),
//                 managerRequest          = managerNumIndex.get(currManager),
//                 currName;

//             rounds = parseInt(data.numRounds);
//             managerRequest.onerror = (e) => {
//                 // console.log('Manager Tracker Update Error');
//             };
    
//             managerRequest.onsuccess = (e) => {
//                 let data = e.target.result;
//                 currName = data.managerName;
//                 if(currName === "") {
//                     managerTracker.innerText = `Manager ${currManager}`;
//                 }
//                 else{
//                     managerTracker.innerText = currName;
//                 }
//             };  
//         };
//     }

//     const clearData = () => {//CLEAR ALL STORES
//         let managerTransaction                  = db.transaction(["managerStore"], "readwrite"),
//             playerTransaction                   = db.transaction(["playerStore"], "readwrite"),
//             settingsTransaction                 = db.transaction(["settingsStore"], "readwrite"),
//             managerStore                        = managerTransaction.objectStore("managerStore"),
//             playerStore                         = playerTransaction.objectStore("playerStore"),
//             settingsStore                       = settingsTransaction.objectStore("settingsStore");

//             managerRequest                      = managerStore.clear();
//             playerRequest                       = playerStore.clear();
//             settingsRequest                     = settingsStore.clear();
//             playerTable.innerHTML               ="";
//             managerContainer.innerHTML          ="";
//             managerInputContainer.innerHTML     ="";
//             managerTracker.innerHTML            ="";
//             roundTracker.innerHTML              ="";
//     };

//     const draftPlayer = (draftBtn) => {//UPDATE DATA ON DRAFT BUTTON CLICK
//         let playerTransaction       = db.transaction(['playerStore'], 'readwrite'),
//             playerStore             = playerTransaction.objectStore('playerStore'),
//             playerKey               = parseInt(draftBtn.target.parentElement.getAttribute('data-playerkey'));
//             console.log(playerKey);
//             playerRequest           = playerStore.get(playerKey),
//             playerName,
//             playerPos;

//         playerRequest.onerror = (e) => {
//             // console.log('Draft Button Error')
//         };
//         playerRequest.onsuccess = async (e) => {
//             let data                    = e.target.result;
//                 managerTransaction      = db.transaction(['managerStore'], 'readwrite'),
//                 managerStore            = managerTransaction.objectStore('managerStore'),
//                 managerIndex            = managerStore.index('managerNum'),
//                 managerRequest          = managerIndex.get(currManager),
//                 settingsTransaction     = db.transaction(['settingsStore'], 'readwrite'),
//                 settingsStore           = settingsTransaction.objectStore('settingsStore'),
//                 settingsTrackerIndex    = settingsStore.index('tracker'),
//                 settingsRequest         = settingsTrackerIndex.get(0);

//                 await getPlayerVariables(data,playerStore);
//                 await updateManagerArrays(managerRequest, managerStore);
//                 await updateSettings(settingsRequest, settingsStore);
//                 await displayDrafted();
//         }; 
//     };

//     function displayDrafted() {
//         let managerTransaction      = db.transaction(['managerStore'], 'readwrite'),
//             managerStore            = managerTransaction.objectStore('managerStore');

//         managerStore.openCursor().onsuccess = async (e) => {
//             let cursor = e.target.result;
           
//             if(cursor) {

//                 let td = document.querySelectorAll('[data-pos][data-manager]');
//                 let position = cursor.value.playerPos;

//                 console.log(position);

//                 cursor.continue();
//             }
//             else {
//                 // console.log('Managers Displayed');
//             }
//         };
            
//         // for(const [i,value] of td.entries()){
//         //     console.log(value);
//         //     if(value[i].innerText === ""){
//         //         td.innerHTML = playerName;
//         //         break;
//         //     }
//         // }
//     };

//     const updateSettings = (request, objectStore) => {
//         request.onerror = (e) => {
//             // console.log('Manager Tracker Error');
//         };
//         request.onsuccess = (e) => {
//             let data = e.target.result;
//             let numManagers = parseInt(data.numManagers) -1,
//                 requestUpdate;

//             if((data.currManager === numManagers) || (data.currManager === 0) && (data.currRound!== 1)){
//                 data.currRound = data.currRound += 1;
//             }
//             if(isEven(data.currRound)){
//                 data.currManager = data.currManager -= 1;
//                 requestUpdate = objectStore.put(data);
//             }
//             else{
//                 data.currManager = data.currManager += 1;
//                 requestUpdate = objectStore.put(data);
//             }
//             requestUpdate.onerror = (e) => {
//                 // console.log('Manager Tracker Error')
//             };
//             requestUpdate.onsuccess = (e) => {   
//                 asyncDraft();
//             };
//         } 
//     }

//     const updateManagerArrays = (request, objectStore) => {
//         request.onerror = (e) => {
//             // console.log('Draft Player managerRequest Error');
//         };

//         request.onsuccess = (e) => {
//             let data = e.target.result;
//                 data.playerName.push(playerName);
//                 data.playerPos.push(playerPos.toLowerCase());

//             let requestUpdate = objectStore.put(data);
            
//             requestUpdate.onerror = (e) => {
//                 console.log('Draft Player Manager Request Update Success');
                
//             };
//             requestUpdate.onsuccess = (e) => {
//                 console.log('Draft Player Manager Request Update Success');
//             };
//         };
//     };

//     const asyncDisplay = async () => {//DISPLAY PLAYERS AND MANAGER AFTER GLOBALS RUN
//         const info = displayInfo();
//         const players = await displayPlayers();
//         const managers = await displayManagers();
//         const drafted = await displayDrafted();
//     };

//     const asyncDraft = async () => {//DISPLAY PLAYERS AND MANAGER AFTER GLOBALS RUN
//         const info = displayInfo();
//         const players = await displayPlayers();
//     };

//     const clearDisplay = async () => {//CLEAR STORES THEN RESET DISPLAY
//         const clear = clearData();
//         const display = await asyncDisplay();
//     };

//     const getPlayerVariables = (data, store) => {
//         playerName          = data.name;
//         playerPos           = data.pos;
//         data.manager        = currManager;
//         data.drafted        = 1;
//         data.roundDrafted   = currRound;

//         let requestUpdate = store.put(data);
//         requestUpdate.onerror = (e) => {
//             // console.log('Manager Change Error')
//         };
//         requestUpdate.onsuccess = (e) => {
//             // console.log('Draft Player Success');
//             document.querySelector('[data-js="playerTracker"]').innerText = `${currManager.innerText} drafted ${data.name}`;
//         };
//     };

//     const isEven = (value) => {//HELPER FOR ROUND TRACKING
//         if (value%2 == 0)
//             return true;
//         else
//             return false;
//     };

//     const displayNames = (value, element) => {//TO DO - MOVE FUNCTION TO HELPER FUNCTIONS PASS cursor.value as (value)
//         if(value.managerName == "") {
//             element.innerText = `Manager ${value.managerNum}`;
//         }
//         else{
//             element.innerText = value.managerName;
//         }
//     };

//     const addRows = (parent, value) => {
//         for(let i= 0; i < rounds; i++) {
//             const draftRow      = document.createElement('tr');
//             parent.appendChild(draftRow);

//             for(let i= 0; i < 2; i++) {
//                 draftData = document.createElement('td');
//                 draftRow.appendChild(draftData);
//                 draftData.setAttribute('data-td', i);
//             }

//             if(i>8) {
//                 draftRow.firstChild.innerText = 'BENCH';
//                 draftData.parentElement.children[1].setAttribute('data-pos', 'bench');
//                 draftData.parentElement.children[1].setAttribute('data-manager', value.managerNum);
//             }
//             else{
//                 draftRow.firstElementChild.innerText = positions[i].toUpperCase();
//                 draftData.parentElement.children[1].setAttribute('data-pos', positions[i]);
//                 draftData.parentElement.children[1].setAttribute('data-manager', value.managerNum);
//             }
//         };
//     };

//     const throttle = (func, limit) => {
//         let inThrottle
//         return function() {
//           const args = arguments
//           const context = this
//           if (!inThrottle) {
//             func.apply(context, args)
//             inThrottle = true
//             setTimeout(() => inThrottle = false, limit)
//           }
//         };
//     };
// };


//TO DO - NOTES: If new round start manager back at 0 or end depending on round (snake)