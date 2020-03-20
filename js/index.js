const   playerTable             = document.querySelector('[data-js="playerTable"]'),
        managerContainer        = document.querySelector('[data-js="managerContainer"]'),
        managerInputContainer   = document.querySelector('[data-js="managerInputContainer"]'),
        settings                = document.querySelector('[data-js="settings"]'),
        namesButton             = settings.querySelector('[data-js="manNameBtn"]'),
        resetButton             = settings.querySelector('[data-js="resetBtn"]'),
        positions               =['qb','rb','rb','wr','wr','te','flex','dst','k'],
        roundTracker            = document.querySelector('[data-js="roundTracker"]'),
        managerTracker          = document.querySelector('[data-js="managerTracker"]'), 
        numRounds               = settings.querySelector('[data-js="numRounds"]'),
        formStart               = document.querySelector('[data-js="startDraft"]');
let     managerCount,
        managerInput,
        currManager,
        currRound,
        currManagerName,
        db,
        players;
        requestURL          = 'js/draft_data.json';
        request             = new XMLHttpRequest();

//IMPORT JSON
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    players     = request.response;
    playersKeys = Object.keys(players[0]);
};
//START DB
window.onload = function() {
    let request = window.indexedDB.open('mockDraft', 1);
    request.onerror = function() {
        console.log('MockDraft Failed to Open');
    };
    request.onsuccess = function() {
        console.log('MockDraft Data Inputted');
        db = request.result;
        asyncDisplay();
    };
    request.onupgradeneeded = function(e) {
        let db              = e.target.result,
            playerStore     = db.createObjectStore('playerStore', { keyPath: 'id', autoIncrement:true }),
            managerStore    = db.createObjectStore('managerStore', { keyPath: 'id', autoIncrement:true }),
            settingsStore   = db.createObjectStore('settingsStore', { keyPath: 'id', autoIncrement:true });
            playerStore.createIndex('name', 'name', { unique: false });
            playerStore.createIndex('drafted', 'drafted', { unique: false });
            playerStore.createIndex('roundDrafted', 'roundDrafted', { unique: false });
            playerStore.createIndex('manager', 'manager', { unique: false });
            settingsStore.createIndex('numRounds', 'numRounds', { unique: false });
            settingsStore.createIndex('currRound', 'currRound', { unique: false });
            settingsStore.createIndex('currManager', 'currManager', { unique: false });
            settingsStore.createIndex('numManagers', 'numManagers', { unique: false });
            settingsStore.createIndex('tracker', 'tracker', { unique: false });
            managerStore.createIndex('managerNum', 'managerNum', {unique: true});
        console.log('MockDraft Stores Added');
    };
    //STORE USER SETTINGS CALL
    namesButton.addEventListener("click", initSettings);
    //CLEAR ALL DATA ON RESET CALL
    resetButton.addEventListener("click", () => {
        clearDisplay();
    });
    //ADD PLAYER DATA + CREATE INDEXES CALL
    formStart.onsubmit = addData;

    function initSettings() {//STORE USER SETTINGS
        managerCount   = settings.querySelector('select').value;

        for(let i=0; i < managerCount; i++) {
            let managerName = document.createElement('input');
            managerInputContainer.appendChild(managerName);
            managerName.setAttribute('placeholder', `Manager ${i}`);
            managerName.setAttribute('data-manager', i);
            managerName.setAttribute('data-js', 'managerName');
        }

        managerInput = document.querySelectorAll('[data-js="managerName"]');
    }

    function addData(e) {//ADD PLAYER DATA + CREATE INDEXES
        e.preventDefault();
        let transaction     = db.transaction(['playerStore'], 'readwrite'),
            transaction2    = db.transaction(['managerStore'], 'readwrite'),
            transaction3    = db.transaction(['settingsStore'], 'readwrite'),
            playerStore     = transaction.objectStore('playerStore'),
            managerStore    = transaction2.objectStore('managerStore'),
            settingsStore   = transaction3.objectStore('settingsStore'),
            newItem = {numRounds: numRounds.value, currRound: 1, currManager: 0, numManagers: managerCount, tracker: 0};
            request = settingsStore.add(newItem);

        for(const value of players){
            let request = playerStore.add(value);
        };

        for(const [i,value] of managerInput.entries()){
            let newItem = { managerName: value.value, managerNum: i };
            let request = managerStore.add(newItem);
        };
        request.onsuccess = function() {
            console.log('Draft Has Loaded');
        };
        transaction.oncomplete = function() {
            console.log('Data Stores Updated');

            asyncDisplay();
        };
        transaction.onerror = function() {
        console.log('Data Store Error');
        };
    };

    function displayPlayers() {//DISPLAY PLAYER DATA
        const   transaction = db.transaction(['playerStore'], 'readwrite');
        let     playerStore = transaction.objectStore('playerStore');
        
        playerStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                const   tableRow                    = document.createElement('tr'),
                        adpData                     = document.createElement('td'),
                        nameData                    = document.createElement('td'),
                        posData                    = document.createElement('td'),
                        teamData                    = document.createElement('td'),
                        updatePlayer                = cursor.value,
                        draftBtn                    = document.createElement('button');
                        updatePlayer.manager        = 99,
                        updatePlayer.drafted        = 0,
                        updatePlayer.roundDrafted   = 0;

                const   request                 = cursor.update(updatePlayer);

                request.onsuccess = function() {
                    console.log('Player Data Loaded');
                }
                tableRow.appendChild(adpData);
                tableRow.appendChild(nameData);
                tableRow.appendChild(posData);
                tableRow.appendChild(teamData);
                playerTable.appendChild(tableRow);
                adpData.textContent     = cursor.value.adp;
                nameData.textContent    = cursor.value.name;
                posData.textContent     = cursor.value.pos;
                teamData.textContent    = cursor.value.team;
                tableRow.setAttribute('data-playerKey', cursor.value.id);
                tableRow.setAttribute('data-manager', 99);
                tableRow.appendChild(draftBtn);
                draftBtn.textContent = 'DRAFT';
                draftBtn.onclick = draftPlayer;
                cursor.continue();
            } 
            else {
                console.log('Player Data Displayed');
            }
        };
    }

    function displayManagers() {//DISPLAY MANAGER DATA
        let managerStore    = db.transaction('managerStore').objectStore('managerStore');

        managerStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                const   article     = document.createElement('article'),
                        table       = document.createElement('table'),
                        managerData = document.createElement('th');
                let     draftData;

                article.appendChild(table);
                table.appendChild(managerData);
                addRows();
                managerContainer.appendChild(article);
                displayNames();
                table.setAttribute('data-manager', cursor.value.managerNum);
                cursor.continue();

                function addRows() {
                    for(let i= 0; i < rounds; i++) {
                        const draftRow      = document.createElement('tr');
                        table.appendChild(draftRow);

                        for(let i= 0; i < 2; i++) {
                            draftData = document.createElement('td');
                            draftRow.appendChild(draftData);
                            draftData.setAttribute('data-td', i);
                        }

                        if(i>8) {
                            draftRow.firstChild.innerText = 'BENCH';
                            draftData.parentElement.children[1].setAttribute('data-pos', 'bench');
                        }
                        else{
                            draftRow.firstElementChild.innerText = positions[i].toUpperCase();
                            draftData.parentElement.children[1].setAttribute('data-pos', positions[i]);
                        }
                    }
                };

                function displayNames() {
                    if(cursor.value.managerName == "") {
                        managerData.innerText = `Manager ${cursor.value.managerNum}`;
                    }
                    else{
                        managerData.innerText = cursor.value.managerName;
                    }
                };

                function displayPlayers() {
                    
                }
            } 
            else {
                console.log('Managers Displayed');
            }
        };
    }

    function displayInfo() {//DISPLAY GLOBAL DATA
        let settingsTransaction     = db.transaction(["settingsStore"], "readwrite"),
            settingsStore           = settingsTransaction.objectStore("settingsStore"),
            settingsTrackerIndex    = settingsStore.index('tracker'),
            settingsRequest         = settingsTrackerIndex.get(0);

        settingsRequest.onsuccess = function(event) {
            let data                    = event.target.result;
                currRound               = data.currRound;
                currManager             = data.currManager;
                roundTracker.innerText  = currRound;

            let managerTransaction      = db.transaction(["managerStore"], "readwrite"),
                managerStore            = managerTransaction.objectStore("managerStore"),
                managerNumIndex         = managerStore.index('managerNum'),
                managerRequest          = managerNumIndex.get(currManager),
                currName;

            rounds = parseInt(data.numRounds);
            managerRequest.onerror = function(event) {
                console.log('Manager Tracker Update Error');
            };
    
            managerRequest.onsuccess = function(event) {
                let data = event.target.result;
                currName = data.managerName;
                if(currName === "") {
                    managerTracker.innerText = `Manager ${currManager}`;
                }
                else{
                    managerTracker.innerText = currName;
                }
            };  
        };
    }

    function clearData() {//CLEAR ALL STORES
        let managerTransaction      = db.transaction(["managerStore"], "readwrite"),
            playerTransaction       = db.transaction(["playerStore"], "readwrite");
            settingsTransaction     = db.transaction(["settingsStore"], "readwrite");
            managerStore            = managerTransaction.objectStore("managerStore");
            playerStore             = playerTransaction.objectStore("playerStore");
            settingsStore           = settingsTransaction.objectStore("settingsStore");
            managerRequest          = managerStore.clear();
            playerRequest           = playerStore.clear();
            settingsRequest         = settingsStore.clear();
      
        playerTable.innerHTML="";
        managerContainer.innerHTML="";
        managerInputContainer.innerHTML="";
        managerTracker.innerHTML="";
        roundTracker.innerHTML="";
    };

    function draftPlayer(draftBtn) {//UPDATE DATA ON DRAFT BUTTON CLICK
        let playerTransaction       = db.transaction(["playerStore"], "readwrite"),
            playerStore             = playerTransaction.objectStore("playerStore"),
            playerKey               = parseInt(draftBtn.target.parentElement.getAttribute('data-playerkey')),
            playerRequest           = playerStore.get(playerKey),
            playerTracker           = document.querySelector('[data-js="playerTracker"]'),
            settingsTransaction     = db.transaction(["settingsStore"], "readwrite"),
            settingsStore           = settingsTransaction.objectStore("settingsStore"),
            settingsTrackerIndex    = settingsStore.index('tracker');
            settingsRequest         = settingsTrackerIndex.get(0);
        
        playerRequest.onerror = function(event) {
            console.log('Draft Button Error')
        };
        playerRequest.onsuccess = function(event) {
            let data = event.target.result;
            data.manager = currManager;
            data.drafted = 1;
            data.roundDrafted = currRound;

            let requestUpdate = playerStore.put(data);
            requestUpdate.onerror = function(event) {
                console.log('Manager Change Error')
            };
            requestUpdate.onsuccess = function(event) {
                playerTracker.innerText = `${currManager.innerText} drafted ${data.name}`;
            };
        }; 
        settingsRequest.onerror = function(event) {
            console.log('Manager Tracker Error');
        };
        settingsRequest.onsuccess = function(event) {
            let data = event.target.result;
            let numManagers = parseInt(data.numManagers) -1,
                requestUpdate;

            if((data.currManager === numManagers) || (data.currManager === 0) && (data.currRound!== 1)){
                data.currRound = data.currRound += 1;
            }
            if(isEven(data.currRound)){
                data.currManager = data.currManager -= 1;
                requestUpdate = settingsStore.put(data);
            }else{
                data.currManager = data.currManager += 1;
                requestUpdate = settingsStore.put(data);
            }
            requestUpdate.onerror = function(event) {
                console.log('Manager Tracker Error')
            };
            requestUpdate.onsuccess = function(event) {
                asyncDisplay();
            };
        } 
    };

    function displayDraftedPlayer() {
        
    }

    async function asyncDisplay() {//DISPLAY PLAYERS AND MANAGER AFTER GLOBALS RUN
        const info = displayInfo();
        const players = await displayPlayers();
        const managers = await displayManagers();
    
    }

    async function clearDisplay() {//CLEAR STORES THEN RESET DISPLAY
        const clear = clearData();
        const display = await asyncDisplay();
    }

    function isEven(value) {//HELPER FOR ROUND TRACKING
        if (value%2 == 0)
            return true;
        else
            return false;
    }
};


