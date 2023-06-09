/*
localStorage variables
progress        Number of routes visited for progress bar
routesVisited   Array of all passages and visited states
userTitle       String of user's story title
userStory       String of user's story content
*/

var literature;     // The parsed JSON of the story
var hist;           // An array of 
var routesVisited;  // 0 = Never visited, 1 = Partially visited, 2 = All routes after have been visited
const initId = 9;   // The first passage the user should start at the first time they read the story
const restartId = 1;// The true start of the story the user routes to when reaching the end of routes
var passageEvents = {
    'passage': [
        { 'id': 1, 'vars': [{ 'action': 'hideRoute', 'id': '1.4', 'val': 'eOpen'}] },
        { 'id': 8, 'vars': [{ 'action': 'set', 'target': 'eOpen', 'val': 'true' }] },
        { 'id': 51, 'vars': [{ 'action': 'hideRoute', 'id': '51.0', 'val': 'always'}] },
        {
            'id': 59, 'vars': [{ 'action': 'loadLS', 'target': 'userTitle', 'val': 'userTitle' },
                               { 'action': 'eventListener', 'target': 'userTitle' }]
        },
        {
            'id': 60, 'vars': [{ 'action': 'loadLS', 'target': 'userStory', 'val': 'userStory' },
                               { 'action': 'loadLS', 'target': 'userTitle', 'val': 'userTitle' },
                               { 'action': 'eventListener', 'target': 'userStory' }]
        },
        {
            'id': 76, 'vars': [{ 'action': 'hide', 'id': '76a', 'val': 'userStory', 'cond': 'made' },
                               { 'action': 'show', 'id': '76b', 'val': 'userStory', 'cond': 'made' }]
        }
    ]
};

/**
 * Check if the passage has events to handle.
 * @param {Number} toId 
 */
function checkEvents(toId) {
    const passage = passageEvents['passage'];
    for (let i = 0, len = passage.length; i < len; i++) {
        if (passage[i]['id'] === toId) {
            const pVars = Object.values(passage[i]['vars']);
            checkActions(pVars);
            return;
        }
    }
}

/**
 * Runs each action event the passage contains.
 * @param {Array} pVars 
 */
function checkActions(pVars) {
    for (let i = 0, len = pVars.length; i < len; i++) {
        const query = pVars[i];
        switch (query['action']) {
            case 'set':
                setVar(query['target'], query['val']);
                break;
            case 'show':
                if (checkVar(query['id'], query['val'], query['cond'])) {
                    showParagraph(query['id']);
                    if (query['id'] === '76b') { printUserStory('true'); }
                }
                break;
            case 'hide':
                if (checkVar(query['id'], query['val'], query['cond'])) { hideParagraph(query['id']); }
                break;
            case 'hideRoute':
                if (query['val'] === 'always') {
                    hideParagraph(query['id']);
                } else if (!checkVar(query['id'], query['val'], query['cond'])) {
                    hideParagraph(query['id']);
                }
                break;
            case 'loadLS':
                loadVar(query['target'], query['val']);
                break;
            case 'eventListener':
                eventListenerOpts(query['target']);
                break;
            default:
                break;
        }
    }
}

/**
 * Sets the value of a variable in local storage.
 * @param {String} varName 
 * @param {String} value 
 */
function setVar(varName, value) {
    window.localStorage.setItem(varName, value);
}

/**
 * Gets a variable from localStorage and 
 * Sets the value of an input DOM element 
 * @param {String} varName 
 * @param {String} value 
 */
function loadVar(varName, value) {
    const target = document.getElementById(varName);
    target.value = window.localStorage.getItem(value);
}

/**
 * Checks if the event action variable's condition is satisfied to show a paragraph in a passage.
 * By default, the condition is true.
 * @param {Number} targetId 
 * @param {String} varName 
 * @param {Boolean} cond 
 */
function checkVar(targetId, varName, cond = 'true') {
    let val = window.localStorage.getItem(varName);
    if (varName === 'userStory' && (val !== null && val !== '')) {
        val = 'made';
    }

    return val === cond;
}

/**
 * Adds specific event listeners to DOM elements in React
 * @param {String} target 
 */
const eventListenerOpts = (target) => {
    switch (target) {
        case 'userTitle':
            document.getElementById('userTitle').addEventListener('input', () => {
                saveUserTitle();
            });
            break;
        case 'userStory':
            resizeTextarea(target);
            break;
        default:
            break;
    }
};

/**
 * Fallback function to get the passage's data specified by its id. 
 * Runtime O(n) where n is the number of passages in the story JSON.
 * This is optimized to O(1) lookup if the id's are aligned in the story configuration.
 * @param {Number} id The id of the passage to find.
 * @returns {Object} The text and options array from the JSON file. 
 */
function getPassageById(id) {
    // Use the for loop if the ids are not officially aligned in the story configuration
    // for (let i = Math.max(0, id - 10), len = id + 5; i < len; i++) {
    //     console.log(i, literature[i]['id'], id)
    //     if (literature[i]['id'] === id.toString()) {
    //         return {
    //             passageText: literature[i]['text'],
    //             options: literature[i]['options']
    //         };
    //     }
    // }
    return {
        passageText: literature[id-1]['text'],
        options: literature[id-1]['options']
    };
}

/**
 * Writes the passage that was selected by the option.
 * @param {String} fromId   Not implemented, informational for debugging or attaching info
 * @param {String} toId     The id of the passage to write
 * @returns {String} The text of the passage
 */
function writePassage(fromId, toId) {
    const { passageText, options } = getPassageById(toId);
    const content = document.getElementById('output-text');

    // For each paragraph in the passage
    for (let parIdx = 0, len = passageText.length; parIdx < len; parIdx++) {
        // You gave an unformatted passage, will automatically parse all the data

        if (passageText[parIdx][0] != '<' && passageText[parIdx][-1] != '>') {
            const p = document.createElement('p');
            const node = document.createTextNode(passageText[parIdx]);
            p.appendChild(node);
            content.appendChild(p);
        } else {
            // The passage is in HTML format! Form this paragraph!
            // Intended for paragraphs that have buttons for the user to press
            const template = document.createElement('template');
            template.innerHTML = passageText[parIdx].trim();
            const parHTML = template.content.firstChild;

            content.appendChild(parHTML);
            addButtonEvents();
        }
    }

    if (options) {
        createOptions(options, toId);
    }

    checkEvents(toId);

    if (hist.length > 0) {
        const backBtn = document.createElement('button');
        backBtn.addEventListener('click', () => {
            goBack();
        });
        backBtn.innerText = 'Back';
        backBtn.classList.add('backBtn');
        backBtn.setAttribute('aria-description', 'Press enter or space to go to the previous route.');
        content.appendChild(backBtn);
    }

    return passageText;
}

/**
 * Called when writing an HTML paragraph to the story.
 * Will attempt to add event listeners to buttons only if the button's event has not been set already. 
 */
function addButtonEvents() {
    const btns = document.querySelectorAll("#output-text button");
    for (let i = 0, len = btns.length; i < len; i++) {
        try {
            const clickEvent = btns[i].getAttribute('onclick');
            let info = clickEvent.replace(/\'|\"/g, '').split(/\(|\)|, /g,);
            // console.log(info)
            btns[i].removeAttribute('onclick')
            switch (info[0]) {
                case 'nextPara':
                    info[3] = info[3] === '' ? 'true' : 'false';
                    btns[i].addEventListener('click', () => { nextPara(info[1], info[2], info[3]) });
                    btns[i].setAttribute('aria-description', 'Press enter or space to reveal text from this paragraph.');
                    break;
                case 'printUserStory':
                    btns[i].addEventListener('click', () => { printUserStory() });
                    btns[i].setAttribute('aria-description', 'Press enter or space to display your story below this button.');
                    break;
                case 'saveUserStory':
                    btns[i].addEventListener('click', () => { saveUserStory() });
                    btns[i].setAttribute('aria-description', 'Press enter or space to save your story as a text file to your device.');
                    break;
                default:
                    break;
            }
            // Styling these buttons so they are distinct from routes and regular text
            btns[i].parentElement.classList.add('revealText');
        } catch (error) {
            // Do not add event if button events have been added to button already
        }
    }
}
/**
 * Attaches the next route choices to the bottom of the passage.
 * @param {Array} options 
 * @param {Number} fromId 
 */
function createOptions(options, fromId) {
    const content = document.getElementById('output-text');
    const optionList = document.createElement('ol');
    optionList.id = 'option-list';
    optionList.setAttribute('aria-description', 'The list of story routes you can choose from.');
    let count = options.length;

    for (let i = 0, len = options.length; i < len; i++) {
        const optionItem = document.createElement('li');
        optionItem.id = fromId + '.' + i
        const optionBtn = document.createElement('button');

        let toOpId = parseInt(options[i]['to']);
        // console.log('f:', fromId, 't:', toOpId);
        optionBtn.addEventListener('click', () => {
            showChoiceClicked(optionBtn);
            updateVisitedState(toOpId);
            goto(fromId, toOpId);
        });

        const text = parseString(options[i]['text']);
        optionBtn.innerText = parseString(text);

        // If the "back to start" route is an option, it is a route
        if (toOpId === restartId) {
            count--;
        }
        if (routesVisited[toOpId - 1] === 2) {
            optionBtn.classList.add('route-fully-visited');
            count--;
        } else if (routesVisited[toOpId - 1] === 1) {
            optionBtn.classList.add('route-partial');
        } else {
            optionBtn.classList.add('route-not-visited');
        }

        optionItem.appendChild(optionBtn);
        optionList.appendChild(optionItem);
    }

    // End of route or all the routes have been completely visited
    if (count === 0) {
        routesVisited[fromId - 1] = 2;
        bubbleVisited();
        window.localStorage.setItem('routesVisited', JSON.stringify(routesVisited));
    }

    content.appendChild(optionList);
}

/**
 * Changes the visited state of the option taken
 * @param {Number} id 
 */
function updateVisitedState(id) {
    let state = routesVisited[id - 1];
    if (state === 0) {
        routesVisited[id - 1] = 1;
        window.localStorage.setItem('routesVisited', JSON.stringify(routesVisited));

        let progressNum = parseInt(window.localStorage.getItem('progress'));
        progressNum++;

        document.getElementById('progress-bar').style.width = (progressNum / literature.length * 100) + '%';

        document.getElementById('progress-text').innerText = progressNum + '/' + literature.length;
        window.localStorage.setItem('progress', JSON.stringify(progressNum));
    }
    let progressNum = parseInt(window.localStorage.getItem('progress'));
    // Sometimes the progress goes +-1 routesVisited? Set the progress text to the max.
    if (progressNum >= routesVisited.length || routesVisited.length === routesVisited.reduce((acc, val) => acc + (val > 0 ? 1 : 0), 0)) {
        progressNum = routesVisited.length;
        window.localStorage.setItem('progress', JSON.stringify(progressNum));
        // Color everything as complete
        for (let i = 0, len = routesVisited.length; i < len; i++) {
            routesVisited[i] = 2;
        }
    }
}

/**
 * Updates the visited state of previously visited routes to completed 
 * such that the route branch parents are also completed 
 * unless a child is not fully visited.
 */
function bubbleVisited() {
    let idx = hist.length - 1;
    let count = 0;
    while (idx > 0 && count === 0) {
        let id = hist[idx--];
        // Stop if the rest of the parental routes have been cleared already
        // if (routesVisited[id-1] === 2) {
        //     break;
        // }
        // console.log('bubbling', id);

        const { _, options } = getPassageById(id);

        count = options.length;
        for (let i = 0, len = options.length; i < len; i++) {
            let toOpId = parseInt(options[i]['to']);

            // If the "back to start" route is an option, it is a route
            if (toOpId === restartId) {
                count--;
            }
            if (routesVisited[toOpId - 1] === 2) {
                count--;
            }
        }
        if (count === 0) {
            routesVisited[id - 1] = 2;
            window.localStorage.setItem('routesVisited', JSON.stringify(routesVisited));
        }
    }
}

/**
 * Shows the next passage based on the id of the route
 * @event onclick from buttons the user can interact with
 * @param {Number} passage The id of the passage to show
 */
export function goto(fromId, toId, wentBack = false) {
    if (!wentBack) {
        hist.push(toId);
    }
    removePrevChoices();
    if (toId === restartId) {
        removeEverything();
        hist = []
    }
    // console.log('history: ', hist, wentBack);
    return writePassage(fromId, parseInt(toId));
};

/**
 * Returns to the previous passage(s) and its routes.
 */
function goBack() {
    let fromHere = hist.pop();
    let peekNext;
    if (hist.length === 0) {
        peekNext = restartId;
    } else {
        peekNext = hist.at(-1);
    }
    document.getElementById('output-text').appendChild(document.createElement('hr'))
    // console.log('goBack', hist, fromHere, peekNext);
    goto(fromHere, peekNext, true);
}


/**
 * Removes the hidden class on the target paragraph.
 * @param {String} id The id of the target paragraph to show within the same passage. 
 */
function showParagraph(id) {
    const target = document.getElementById(id);
    target.classList.remove('hidden');
    if (target.classList.length === 0) {
        target.removeAttribute('class')
    }
}

/**
 * Adds the hidden class on the target paragraph.
 * @param {String} id The id of the paragraph to hide within the same passage.
 */
function hideParagraph(id) {
    const target = document.getElementById(id);
    target.classList.add('hidden');
}

/**
 * Removes the button of text that would show the next paragraph
 * @param {String} btnId 
 * @param {String} targetId 
 * @param {Boolean} remove 
 */
export function nextPara(btnId, targetId, remove = 'true') {
    const btn = document.getElementById(btnId);
    showParagraph(targetId);

    if (remove === 'true') {
        btn.parentElement.remove();
    } else {
        const btnText = btn.innerHTML;
        btn.parentElement.classList.remove('revealText')
        btn.parentElement.innerHTML = btnText;
    }
}

/**
 * Buttons could be meaningful in some passages.
 * If keeping the text after selecting a route, removes the buttons in the story.
 * This is necessary to ensure that there is only one copy of an id on the webpage 
 * in the event the passage is encountered again.
 * 
 * The only button that should be kept
 */
function removePrevChoices() {
    const content = document.getElementById('output-text');
    const ol = content.querySelectorAll('ol');
    for (let i = 0, len = ol.length; i < len; i++) {
        ol[i].remove();
    }

    const btns = content.querySelectorAll('button');
    for (let i = 0, len = btns.length; i < len; i++) {
        if (btns[i].parentElement.childElementCount === 1) {
            btns[i].parentElement.remove();
        } else {
            btns[i].remove();
        }
    }
}

/**
 * Removes all content from the webpage.
 */
function removeEverything() {
    document.getElementById('output-text').innerText = '';
}

/**
 * Reset the user's progress over the story, including local storage
 */
export const resetCYOAProgress = () => {
    removeEverything();

    const progress = document.getElementById('progress-text');
    let progressNum = parseInt(window.localStorage.getItem('progress'));
    document.getElementById('progress-bar').style.width = (progressNum / literature.length * 100) + '%';
    progress.innerText = 1 + '/' + literature.length;

    hist = []
    routesVisited = []
    for (let i = 0, len = literature.length; i < len; i++) {
        routesVisited.push(0);
    }
    routesVisited[initId-1] = 1

    window.localStorage.setItem('progress', JSON.stringify(1));
    window.localStorage.setItem('routesVisited', JSON.stringify(routesVisited))
    window.localStorage.setItem('userTitle', '');
    window.localStorage.setItem('userStory', '');
    window.localStorage.setItem('eOpen', 'false');

    writePassage(null, initId);
}

/**
 * Saves the user's story title 
 * For use in the next passage when they write their own story.
 */
function saveUserTitle() {
    const title = document.getElementById('userTitle').value;
    window.localStorage.setItem('userTitle', title);
}

/**
 * Display's the user's story in the browser below the button.
 */
function printUserStory(readonly = 'false') {
    let userStory;
    if (readonly === 'false') {
        userStory = document.getElementById('userStory').value;
        if (userStory === 'null' || userStory === null) {
            alert('Please write your story in the text box.');
            return;
        }
        window.localStorage.setItem('userStory', userStory);
    } else {
        // Only run this on the passage where the user can edit their story
        // Do not run if the story is displayed
        userStory = window.localStorage.getItem('userStory');
    }

    let userTitle = window.localStorage.getItem('userTitle');
    if (userTitle === 'null' || userTitle === null || userTitle.length === 0) {
        userTitle = 'You have created an imaginary story';
    }

    let printArea;
    if (readonly === 'false') {
        printArea = document.getElementById('userPrint').parentElement;

        for (let i = printArea.childElementCount - 1; i > 0; i--) {
            printArea.removeChild(printArea.childNodes[i]);
        }
    } else {
        printArea = document.getElementById('userPrint');
    }

    const title = document.createElement('h3');
    title.style.fontWeight = 'bold'
    title.innerText = userTitle;
    const text = document.createElement('div');
    text.innerText = userStory;

    printArea.appendChild(title);
    printArea.appendChild(text);
}

/**
 * Exports the reader's own story as a plaintext file.
 * The name of the file is the name of the story they entered in the previous passage.
 * Otherwise, a default name is given for the title.
 * @returns {File} A downloaded txt file.
 */
function saveUserStory() {
    const userStory = document.getElementById('userStory').value;
    if (userStory === 'null' || userStory === null) {
        alert('Please write your story in the text box.');
        return;
    }
    window.localStorage.setItem('userStory', userStory);

    let userTitle = window.localStorage.getItem('userTitle');
    if (userTitle === 'null' || userTitle === null || userTitle === '') {
        userTitle = 'You have created an imaginary story';
    }

    const temp = document.createElement('a');
    temp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(userStory));
    temp.setAttribute('download', userTitle);
    temp.style.display = 'none';

    const output = document.getElementById('output-text');
    output.appendChild(temp);
    temp.click();
    output.removeChild(temp);
}

/**
 * Automatically resizes the height of the textarea input as the user types in it.
 * @param {String} target textarea element, 'userStory'
 */
const resizeTextarea = (target) => {
    const userStory = document.getElementById(target);
    userStory.setAttribute('style', 'height: ' + userStory.scrollHeight + 'px; overflow-y: hidden');
    userStory.addEventListener('input', () => {
        userStory.style.height = 0;
        userStory.style.height = userStory.scrollHeight + 'px';
    });
};


/**
 * When the webpage is loaded, show the first passage of the story.
 * Initialize global variables and store the JSON data.
 * 
 * @param {String} url The url of the JSON file
 * @param {Number} targetId The id of the passage
 */
export function beginCYOAStory(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            try {
                literature = data['story'];
                hist = [];
                // Modify progress bar
                const progress = document.getElementById('progress-text');
                let progressCleared = window.localStorage.getItem('progress');
                if (progressCleared === 'null' || progressCleared === null) {
                    progressCleared = 1;
                    window.localStorage.setItem('progress', JSON.stringify(progressCleared));
                }
                let progressNum = parseInt(window.localStorage.getItem('progress'));
                document.getElementById('progress-bar').style.width = (progressNum / literature.length * 100) + '%';
                progress.innerText = progressCleared + '/' + literature.length;

                // Convert to local storage array using localstorage = JSON.stringify(routesVisited) and JSON.parse(localStorage)
                // If this is the user's first time, create the routesVisited array and initialize init passage as visited
                routesVisited = JSON.parse(window.localStorage.getItem('routesVisited'));
                if (routesVisited === 'null' || routesVisited === null) {
                    routesVisited = [];
                    for (let i = 0, len = literature.length; i < len; i++) {
                        routesVisited.push(0);
                    }
                    if (progressCleared === 1) {
                        routesVisited[initId-1] = 1;
                    }
                }

                writePassage(null, initId);
            } catch (error) {
                // Prevent code execution if page is changed
                // console.log(error)
            }
        });

}

/**
 * Debugging function to display the text of the route clicked on. 
 * Can be altered in development to show information such as passage id.
 * @param {Element} optionBtn 
 */
function showChoiceClicked(optionBtn) {
    const routeClicked = document.createElement('p');
    routeClicked.classList.add('prevRouteText');
    const textChoice = document.createElement('strong');
    textChoice.innerHTML = optionBtn.innerText;
    routeClicked.appendChild(textChoice);
    document.getElementById('output-text').appendChild(routeClicked);
    routeClicked.scrollIntoView();
}

/**
 * SECURITY: IN REPLACE OF EVAL() FOR ANY REFERENCED STRINGS
 * @param {Object} obj 
 * @returns {String} A safely-parsed string 
 */
export function parseString(obj) {
    return Function('"use strict";return ("' + obj + '")')();
}
