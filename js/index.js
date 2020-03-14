// Create needed constants
const   table           = document.querySelector('[data-js="playerTable"]'),
        settings        = document.querySelector('[data-js="settings"]'),
        managers        = document.querySelector('[data-js="managerContainer"]'),
        namesButton     = settings.querySelector('button'),
        formStart       = document.querySelector('[data-js="startDraft"]'),
        formSetup       = document.querySelector('[data-js="setupDraft"]'),
        managerInput    = document.querySelectorAll('[data-js="managerName"]');
var     teamCount       = 0;
var     button          = document.querySelectorAll('[data-js="teamCount"');
let     db;
let     db2;
let     players;
let     requestURL      = 'js/draft_data.json';
let     request         = new XMLHttpRequest();

console.log(namesButton);

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    players = request.response;
    playersKeys = Object.keys(players[0]);
};

window.onload = function() {
    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    
    namesButton.addEventListener("click", managerNames);
    let request = window.indexedDB.open('playerStore', 1);
    let request2 = window.indexedDB.open('managerStore', 1);
    // onerror handler signifies that the database didn't open successfully
    request.onerror = function() {
        console.log('Database failed to open');
    };
    request2.onerror = function() {
        console.log('Database failed to open');
    };
    
    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function() {
        console.log('Draft data inputted');
    
        // Store the opened database object in the db variable. This is used a lot below
        db = request.result;
        // Run the displayData() function to display the notes already in the IDB
    //     displayData();
    };
    request2.onsuccess = function() {
        console.log('Draft data inputted');
    
        // Store the opened database object in the db variable. This is used a lot below
        db2 = request2.result;
        // Run the displayData() function to display the notes already in the IDB
    //     displayData();
    };
    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        let db = e.target.result;
    
        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        let playerStore = db.createObjectStore('playerStore', { keyPath: 'id', autoIncrement:true });
    
        console.log('Database setup complete');
    };
    request2.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        let db2 = e.target.result;
    
        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        let managerStore = db2.createObjectStore('managerStore', { keyPath: 'id', autoIncrement:true });
    
        console.log('Database setup complete');
    };

    // Create an onsubmit handler so that when the form is submitted the addData() function is run
    formStart.onsubmit = addData;
    formSetup.onsubmit = addData2;
    // Define the addData() function
    function addData(e) {
        // prevent default - we don't want the form to submit in the conventional way
        e.preventDefault();
    
        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(['playerStore'], 'readwrite');
    
        // call an object store that's already been added to the database
        let playerStore = transaction.objectStore('playerStore');
    
        // Make a request to add our newItem object to the object store
        players.forEach(function(player){
            let request = playerStore.add(player); // IDBRequest
        });

        request.onsuccess = function() {
            console.log('Draft Has Started');
        };
    
        // Report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');
    
        // update the display of data to show the newly added item, by running displayData() again.
            displayData();
        };
    
        transaction.onerror = function() {
        console.log('Transaction not opened due to error');
        };
    }
    function addData2(e) {
        // prevent default - we don't want the form to submit in the conventional way
        e.preventDefault();

        // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
        let newItem = { teamName: teamNameInput.value };
    
        // open a read/write db transaction, ready for adding the data
        let transaction2 = db2.transaction(['managerStore'], 'readwrite');
    
        // call an object store that's already been added to the database
        let managerStore = transaction2.objectStore('managerStore');
    
        // Make a request to add our newItem object to the object store
        let request = objectStore.add(newItem);
        request.onsuccess = function() {
        // Clear the form, ready for adding the next entry
        teamNameInput.value = '';
        };
    
        // Report on the success of the transaction completing, when everything is done
        transaction2.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');
    
        // update the display of data to show the newly added item, by running displayData() again.
            // displayData();
        };
    
        transaction2.onerror = function() {
        console.log('Transaction not opened due to error');
        };
    }
    // Define the displayData() function
    function displayData() {
        // Open our object store and then get a cursor - which iterates through all the
        // different data items in the store

        let playerStore = db.transaction('playerStore').objectStore('playerStore');
        playerStore.openCursor().onsuccess = function(e) {

        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if(cursor) {

            // Create a list item, h3, and p to put each data item inside when displaying it
            // structure the HTML fragment, and append it inside the list
            const tableRow  = document.createElement('tr');
            const adpData   = document.createElement('td');
            const nameData  = document.createElement('td');
            const teamData  = document.createElement('td');
    
            tableRow.appendChild(adpData);
            tableRow.appendChild(nameData);
            tableRow.appendChild(teamData);
            table.appendChild(tableRow);
    
            // Put the data from the cursor inside the h3 and para
            
            adpData.textContent     = cursor.value.adp;
            nameData.textContent    = cursor.value.name;
            teamData.textContent    = cursor.value.team;

            // Store the ID of the data item inside an attribute on the tableRow, so we know
            // which item it corresponds to. This will be useful later when we want to delete items
            tableRow.setAttribute('data-playerKey', cursor.value.id);
            tableRow.setAttribute('data-manager', 0);
    
            // Create a button and place it inside each tableRow
            const draftBtn = document.createElement('button');
            tableRow.appendChild(draftBtn);
            draftBtn.textContent = 'DRAFT';
    
            draftBtn.onclick = draftPlayer;
    
            // Iterate to the next item in the cursor
            cursor.continue();
        } 
        else {
            // if there are no more cursor items to iterate through, say so
            console.log('Notes all displayed');
        }
        };
    }

    function draftPlayer() {
        console.log('test');
    }

    function managerNames() {
        
        const   teamCount = settings.querySelector('select').value;

        for(let i=0; i < teamCount; i++) {
            var managerInput = document.createElement('input');
            formSetup.appendChild(managerInput);
            managerInput.setAttribute('placeholder', `Manager ${i}`);
            managerInput.setAttribute('data-manager', i);
            managerInput.setAttribute('data-js', 'managerName');
            console.log('test');
        }
    }
};
