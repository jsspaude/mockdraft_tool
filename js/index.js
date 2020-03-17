const   playerTable             = document.querySelector('[data-js="playerTable"]'),
        managerContainer        = document.querySelector('[data-js="managerContainer"]'),
        managerInputContainer   = document.querySelector('[data-js="managerInputContainer"]'),
        settings                = document.querySelector('[data-js="settings"]'),
        namesButton             = settings.querySelector('[data-js="manNameBtn"]'),
        resetButton             = settings.querySelector('[data-js="resetBtn"]'),
        positions               =['QB','RB','RB','WR','WR','TE','FLEX','DST','K'],
        numRounds               = settings.querySelector('[data-js="numRounds"]');
        formStart               = document.querySelector('[data-js="startDraft"]');
var     teamCount               = 0,
        managerInput,
        button                  = document.querySelectorAll('[data-js="teamCount"');
let     db,
        db2,
        players;
        requestURL          = 'js/draft_data.json';
        request             = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    players     = request.response;
    playersKeys = Object.keys(players[0]);
};

window.onload = function() {
    let request = window.indexedDB.open('mockDraft', 1);

    request.onerror = function() {
        console.log('MockDraft Failed to Open');
    };
    request.onsuccess = function() {
        console.log('MockDraft Data Inputted');
        db = request.result;

        displayManagers();
        displayPlayers();
    };
    request.onupgradeneeded = function(e) {
        let db              = e.target.result,
            playerStore     = db.createObjectStore('playerStore', { keyPath: 'id', autoIncrement:true }),
            managerStore    = db.createObjectStore('managerStore', { keyPath: 'id', autoIncrement:true }),
            settingsStore   = db.createObjectStore('settingsStore', { keyPath: 'id', autoIncrement:true });
        console.log('MockDraft Stores Added');
    };

    namesButton.addEventListener("click", initSettings);
    resetButton.addEventListener("click", () => {
        clearData();
        displayManagers();
        displayPlayers();
    });
    formStart.onsubmit = addData;

    function addData(e) {
        e.preventDefault();
        let transaction     = db.transaction(['playerStore'], 'readwrite'),
            transaction2    = db.transaction(['managerStore'], 'readwrite'),
            transaction3    = db.transaction(['settingsStore'], 'readwrite'),
            playerStore     = transaction.objectStore('playerStore'),
            managerStore    = transaction2.objectStore('managerStore'),
            settingsStore   = transaction3.objectStore('settingsStore'),
            newItem = {numRounds: numRounds.value, currRound: 0, currTeam: 0};
            request = settingsStore.add(newItem);

        players.forEach(function(player){
            let request = playerStore.add(player);
        });
        managerInput.forEach((manager, index) => {
            let newItem = { managerName: manager.value, managerNum: index };
            let request = managerStore.add(newItem);
        });
        request.onsuccess = function() {
            console.log('Draft Has Loaded');
        };
        transaction.oncomplete = function() {
            console.log('Data Stores Updated');
            displayPlayers();
            displayManagers();
        };
        transaction.onerror = function() {
        console.log('Data Store Error');
        };
    };

    function displayPlayers() {
        const   transaction = db.transaction(['playerStore'], 'readwrite');
        let     playerStore = transaction.objectStore('playerStore');
        
        playerStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                const   tableRow                = document.createElement('tr'),
                        adpData                 = document.createElement('td'),
                        nameData                = document.createElement('td'),
                        teamData                = document.createElement('td'),
                        updateManager           = cursor.value,
                        draftBtn                = document.createElement('button');
                        updateManager.manager   = 99;

                const   request                 = cursor.update(updateManager);

                request.onsuccess = function() {
                    console.log('Player Data Loaded');
                }
                tableRow.appendChild(adpData);
                tableRow.appendChild(nameData);
                tableRow.appendChild(teamData);
                playerTable.appendChild(tableRow);
                adpData.textContent     = cursor.value.adp;
                nameData.textContent    = cursor.value.name;
                teamData.textContent    = cursor.value.team;
                tableRow.setAttribute('data-playerKey', cursor.value.id);
                tableRow.setAttribute('data-manager', 0);
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

    function displayManagers() {
        let managerStore    = db.transaction('managerStore').objectStore('managerStore'),
            settingsStore   = db.transaction('settingsStore').objectStore('settingsStore'),
            rounds          = "";
        
        settingsStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                rounds = cursor.value.numRounds;
                console.log(rounds);
            }
        };

        managerStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                const   article     = document.createElement('article'),
                        table       = document.createElement('table'),
                        managerData = document.createElement('th');

                article.appendChild(table);
                table.appendChild(managerData);

                for(let i=0; i < rounds; i++) {
                    const draftRow      = document.createElement('tr');
                    table.appendChild(draftRow);

                    for(let i=0; i < 2; i++) {
                        const draftData = document.createElement('td');
                        draftRow.appendChild(draftData);
                        draftData.setAttribute('data-td', i);
                    }

                    if(i>8) {
                        draftRow.firstChild.innerText = 'BENCH';
                    }
                    else{
                        draftRow.firstChild.innerText = positions[i];
                    }
                }

                managerContainer.appendChild(article);

                if(cursor.value.managerName == "") {
                    managerData.innerText = `Manager ${cursor.value.managerNum}`;
                }
                else{
                    managerData.innerText = cursor.value.managerName;
                }
                table.setAttribute('data-manager', cursor.value.managerNum);
                cursor.continue();
            } 
            else {
                console.log('Managers Displayed');
            }
        };
    }

    function displayInfo() {
        
    }

    function initSettings() {
        
        const   teamCount   = settings.querySelector('select').value;

        for(let i=0; i < teamCount; i++) {
            var managerName = document.createElement('input');
            managerInputContainer.appendChild(managerName);
            managerName.setAttribute('placeholder', `Manager ${i}`);
            managerName.setAttribute('data-manager', i);
            managerName.setAttribute('data-js', 'managerName');
        }

        managerInput = document.querySelectorAll('[data-js="managerName"]');
    }

    function clearData(store) {
        var transaction1     = db.transaction(["managerStore"], "readwrite");
        var transaction2    = db.transaction(["playerStore"], "readwrite");
        var transaction3    = db.transaction(["settingsStore"], "readwrite");
        
        var objectStore1         = transaction1.objectStore("managerStore");
        var objectStore2         = transaction2.objectStore("playerStore");
        var objectStore3         = transaction3.objectStore("settingsStore");
        var objectStoreRequest1  = objectStore1.clear();
        var objectStoreRequest2  = objectStore2.clear();
        var objectStoreRequest3  = objectStore3.clear();
      
        playerTable.innerHTML="";
        managerContainer.innerHTML="";
        managerInputContainer.innerHTML="";
    };

    function draftPlayer(draftBtn) {
        var playerStore     = db.transaction(["playerStore"], "readwrite").objectStore("playerStore"),
            settingsStore   = db.transaction(["playerStore"], "readwrite").objectStore('settingsStore'),
            manger          = parseInt(draftBtn.target.parentElement.getAttribute('data-playerkey')),
            manger          = parseInt(draftBtn.target.parentElement.getAttribute('data-playerkey')),
            request1        = playerStore.get(manager);
            request2        = settingsStore.get(item);

        request1.onerror = function(event) {
            console.log('Error in Manager Edit')
        };
        request2.onsuccess = function(event) {
            var data            = event.target.result;
            data.manager        = managerCounter;
            var requestUpdate   = objectStore.put(data);
        };  
    }
};
