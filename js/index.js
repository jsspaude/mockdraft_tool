// SETUP
const   playerTable         = document.querySelector('[data-js="playerTable"]'),
        managerContainer    = document.querySelector('[data-js="managerContainer"]'),
        settings            = document.querySelector('[data-js="settings"]'),
        rounds              = 15,
        namesButton         = settings.querySelector('button'),
        playerStoreString   = 'playerStore',
        managerStoreString  = 'managerStore',
        positions           =['QB','RB','RB','WR','WR','TE','FLEX','DST','K'],
        formStart           = document.querySelector('[data-js="startDraft"]'),
        formSetup           = document.querySelector('[data-js="setupDraft"]');
var     teamCount           = 0,
        managerInput,
        button              = document.querySelectorAll('[data-js="teamCount"');
let     db,
        db2,
        players;
        requestURL          = 'js/draft_data.json';
        request             = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    players = request.response;
    playersKeys = Object.keys(players[0]);
};

window.onload = function() {
    let request = window.indexedDB.open('mockDraft', 1);

    request.onerror = function() {
        console.log('Database failed to open');
    };
    request.onsuccess = function() {
        console.log('Draft data inputted');
        db = request.result;

        displayManagers();
        displayPlayers();
    };
    request.onupgradeneeded = function(e) {
        let db              = e.target.result;
        let playerStore     = db.createObjectStore('playerStore', { keyPath: 'id', autoIncrement:true });
        let managerStore    = db.createObjectStore('managerStore', { keyPath: 'id', autoIncrement:true });
        console.log('Database setup complete');
    };
    namesButton.addEventListener("click", managerNames);
    formStart.onsubmit = addPlayerData;
    formSetup.onsubmit = addManagerData;

    function addPlayerData(e) {
        e.preventDefault();
        // clearData(playerStoreString);
        let transaction = db.transaction(['playerStore'], 'readwrite');
        let playerStore = transaction.objectStore('playerStore');

        players.forEach(function(player){
            let request = playerStore.add(player);
        });
        request.onsuccess = function() {
            console.log('Draft Has Started');
        };
        transaction.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');
            displayPlayers();
        };
        transaction.onerror = function() {
        console.log('Transaction not opened due to error');
        };
    };

    function addManagerData(e) {
        e.preventDefault();
        
        let transaction     = db.transaction(['managerStore'], 'readwrite');
        let managerStore    = transaction.objectStore('managerStore');

        managerInput.forEach((manager, index) => {
            let newItem         = { managerName: manager.value, managerNum: index };
            let request         = managerStore.add(newItem);
        });
        request.onsuccess = function() {
            console.log('Managers Inputted');
        };
        transaction.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');
            displayManagers();
        };
        transaction.onerror = function() {
            console.log('Transaction not opened due to error');
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
                    console.log('manager updated');
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
                console.log('Players all displayed');
            }
        };
    }

    function displayManagers() {
        let managerStore = db.transaction('managerStore').objectStore('managerStore');

        managerStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                const article       = document.createElement('article');
                const table         = document.createElement('table');
                const managerData   = document.createElement('th');

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
                    
                    draftRow.firstChild.innerText = positions[i];

                    if(i>8) {
                        draftRow.firstChild.innerText = 'BENCH';
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
                console.log('Managers all displayed');
            }
        };
    }

    function managerNames() {
        
        const teamCount = settings.querySelector('select').value;

        for(let i=0; i < teamCount; i++) {
            var managerName = document.createElement('input');
            formSetup.appendChild(managerName);
            managerName.setAttribute('placeholder', `Manager ${i}`);
            managerName.setAttribute('data-manager', i);
            managerName.setAttribute('data-js', 'managerName');
        }

        managerInput = document.querySelectorAll('[data-js="managerName"]');
    }

    function clearData(store) {
        var transaction = db.transaction(["managerStore"], "readwrite");

        transaction.oncomplete = function(e) {
          console.log('Transaction completed');
        };
        transaction.onerror = function(et) {
          console.log('Transaction not opened due to error');
        };
        var objectStore         = transaction.objectStore("managerStore");
        var objectStoreRequest  = objectStore.clear();
      
        objectStoreRequest.onsuccess = function(e) {
          console.log('Request successful');
        };
    };

    function draftPlayer(draftBtn) {
        var objectStore = db.transaction(["playerStore"], "readwrite").objectStore("playerStore");
        var item    = parseInt(draftBtn.target.parentElement.getAttribute('data-playerkey'));
        var request = objectStore.get(item);

        console.log(request);
        request.onerror = function(event) {
            console.log('Error in manager change')
        };
        request.onsuccess = function(event) {
            // Get the old value that we want to update
            var data = event.target.result;
            console.log(data);
            // update the value(s) in the object that you want to change
            data.manager = 1;

            // Put this updated object back into the database.
            var requestUpdate = objectStore.put(data);
            requestUpdate.onerror = function(event) {
                // Do something with the error
            };
            requestUpdate.onsuccess = function(event) {
                // Success - the data is updated!
            };
        };  
    }
};
