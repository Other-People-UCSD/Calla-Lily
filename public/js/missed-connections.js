
/**
 * Executes the story when the button is clicked.
 */
export function beginMissedConnections() {
  document.getElementById('missed-connections').classList.toggle('hidden');
  document.getElementById('mc-username').classList.toggle('hidden');
  document.getElementById('mc-begin').remove();
  setTimeout(missedConnections, 750);
}

/**
 * Builds the story in sequential function calls.
 * To sequentially run the animation, each function must wait on Promises to be resolved.
 * Then the next function is able to execute to modify that part of the story.
 * @returns 0 on success
 */
async function missedConnections() {
  const shortPause = 1000 * 1;
  const longPause = 1000 * 3;
  const normalType = 40;
  const slowType = normalType * 3;
  const slowerType = normalType * 4.5;

  try {
  const w1 = await writeTextChar(1, normalType, shortPause);
  const w2 = await writeTextChar(2, normalType, longPause);
  const w3 = await writeTextChar(3, normalType, shortPause);

  const w21 = await writeTextChar(21, slowType, shortPause);
  const d3 = await delTextChar(3, 50);
  const d2 = await delTextChar(2, 50);
  const d1 = await delTextChar(1, 50);
  const d21 = await delTextChar(21, 50, shortPause);

  const w31 = await writeTextChar(31, normalType, shortPause);
  const d31 = await delTextChar(31, 50, longPause);

  const w41 = await writeTextChar(41, slowType, shortPause);
  const w42 = await writeTextChar(42, normalType, shortPause);
  const w43 = await writeTextChar(43, normalType, shortPause);
  const w44 = await writeTextChar(44, normalType, shortPause);
  const w45 = await writeTextChar(45, normalType, shortPause);
  const w46 = await writeTextChar(46, slowType, shortPause);

  const w51 = await writeTextChar(51, normalType, shortPause);
  const w52 = await writeTextChar(52, normalType, shortPause);
  const w53 = await writeTextChar(53, normalType);
  const w54 = await writeTextChar(54, slowType, shortPause / 2);
  const w55 = await writeTextChar(55, slowType, shortPause / 2);
  const w56 = await writeTextChar(56, slowType, shortPause / 2);
  const w57 = await writeTextChar(57, slowType, shortPause / 2);
  const w58 = await writeTextChar(58, slowType, shortPause);
  const w59 = await writeTextChar(59, normalType);

  const w61 = await writeTextChar(61, normalType, shortPause);
  const w62 = await writeTextChar(62, normalType);

  const w71 = await writeTextChar(71, slowType, longPause);

  const w81 = await writeTextChar(81, slowType, shortPause);
  const w82 = await writeTextChar(82, normalType, longPause);
  const w83 = await writeTextChar(83, normalType, shortPause);
  const w84 = await writeTextChar(84, normalType, shortPause);
  const w85 = await writeTextChar(85, normalType, shortPause);

  const w86 = await writeTextChar(86, normalType);
  const w87 = await writeTextChar(87, slowerType);
  const w88 = await writeTextChar(88, normalType);
  const w89 = await writeTextChar(89, slowType, longPause);
  const w90 = await writeTextChar(90, slowerType);

  const w91 = await writeTextChar(91, normalType, shortPause);
  const w92 = await writeTextChar(92, normalType, shortPause);
  const w93 = await writeTextChar(93, normalType, shortPause);
  const w94 = await writeTextChar(94, normalType, shortPause);
  const w95 = await writeTextChar(95, slowType, longPause);
  const w96 = await writeTextChar(96, normalType, shortPause);
  const w97 = await writeTextChar(97, slowerType);

  const w101 = await writeTextChar(101, normalType);
  const w102 = await writeTextChar(102, slowType, shortPause / 2);
  const w103 = await writeTextChar(103, normalType, shortPause);
  const w104 = await writeTextChar(104, normalType, shortPause);
  const w105 = await writeTextChar(105, normalType, shortPause);
  const w106 = await writeTextChar(106, normalType);
  const w107 = await writeTextChar(107, slowType, longPause);
  const w108 = await writeTextChar(108, slowType, shortPause);
  const w109 = await writeTextChar(109, slowType, shortPause);

  const w111 = await writeTextChar(111, normalType, longPause);

  const delOut = await delPassage('mc-output-text', 1000);

  const w121 = await writeTextChar(121, 120, 500);
  const w122 = await writeTextChar(122, 120, 500);
  const w123 = await writeTextChar(123, 120, 500);
  const w124 = await writeTextChar(124, 120, 500);
  const w125 = await writeTextChar(125, 120, 500);
  const w126 = await writeTextChar(126, 120);
  const w127 = await writeTextChar(127, 120, 4000);

  const d122 = await delTextPhrase(122, 1000);
  const d121 = delTextPhrase(121);
  const d123 = delTextPhrase(123);
  const d124 = delTextPhrase(124);
  const d125 = await delTextPhrase(125, longPause);
  const d127 = await delTextPhrase(127, longPause);

  document.getElementById('mc-output-text').remove();
  document.getElementById('missed-connections').classList.toggle('hidden');
  document.getElementById('mc-final-username').classList.toggle('hidden');
  const final = document.getElementById('mc-final').classList.remove('hidden');
  } catch (error) {
    // Stop script from executing when user leaves the missed connections page
  }
}

/**
 * Writes the target text character by character.
 * @param {int} id    The id of the text area to write
 * @param {int} rate  The speed in milliseconds that characters are written
 * @param {int} delay The delay, in milliseconds, before the function finally ends
 * @returns {Promise} Announces the function has finished writing the targeted text 
 */
function writeTextChar(id, rate, delay) {
  return new Promise((resolve) => {
    // Get the parent block to append the target HTML element to
    let outBlock;
    const ref = document.getElementById(id);

    // If this is a paragraph, the parent block is the output container
    if (ref.parentElement.id.includes('ref-text')) {
      outBlock = document.getElementById('mc-output-text');
      const elem = document.createElement(ref.nodeName);
      elem.id = id + ref.nodeName;
      outBlock.append(elem);
      outBlock = elem;
    }
    else // If this is a line inside a paragraph, the parent is defined in the original story
    {
      let refId = ref.parentElement.id;
      refId = parseInt(refId.match(/\d+/g));
      outBlock = document.getElementById(refId + ref.parentElement.nodeName);
      // Paragraph does not exist, create the block
      if (outBlock == null) {
        const elem = document.createElement(ref.parentElement.nodeName);
        elem.id = refId + ref.parentElement.nodeName;
        document.getElementById('mc-output-text').append(elem);
        outBlock = elem;
      }
    }

    // The target text is wrapped in its own reference if it must be modified later
    let outWrap = document.createElement(ref.nodeName);
    outWrap.id = id + 'o';
    outBlock.append(outWrap);
    let refText = ref.innerHTML;

    let i = 0;
    let outStream = window.setInterval(function () {
      const input = { text: refText, i: i }
      const update = checkTag.call(input);

      outWrap.innerHTML += update.nextText;
      i += update.inc;

      if (i >= refText.length) {
        clearInterval(outStream);
        setTimeout(() => { return resolve(id); }, delay);
      }
    }, rate);
  });
};

/**
 * Check the target's innerHTML for any HTML tags to generate.
 * @param {Object} input The target text and current index
 * @returns {Object} The next text and new index to change
 */
function checkTag(input) {
  let tag = this.text.substring(this.i, this.i + 3);
  let appendText = this.text[this.i];
  let inc = 1;
  switch (tag) {
    case '<p>':
      appendText = "<p>";
      inc = 3;
      break;
    case '</p':
      appendText = "</p>";
      inc = 4;
      break;

    case '<br':
      appendText = "<br/>";
      inc = 5;
      break;
    default:
      break;
  }
  const update = { nextText: appendText, inc: inc };
  return update;
};

/**
 * Starting from the end, deletes the written output text character by character.
 * @param {int} id    The id of the target text area to delete
 * @param {int} rate  The speed in milliseconds that characters are deleted
 * @returns {Promise} Announces the function has finished deleting the targeted text 
 */
function delTextChar(id, rate, delay) {
  return new Promise((resolve) => {
    const outText = document.getElementById(id + 'o');
    const text = document.getElementById(id).innerText;

    let i = text.length;
    const outStream = window.setInterval(function () {
      const l = text.substring(0, i - 1);
      // Keeping the text afterwards is required to keep any HTML elements (<br> tags) 
      // at the end before the element is fully removed when iteration terminates
      const r = outText.innerHTML.substring(i);
      outText.innerHTML = l + r;

      i -= 1;
      if (i < 0) {
        clearInterval(outStream);
        const outParent = outText.parentElement;
        outText.remove();

        if (outParent.children.length == 0) {
          outParent.remove();
        }
        setTimeout(() => { return resolve(id); }, delay);
      }
    }, rate);
  });
}

/**
 * 
 * @param {int} id 
 * @param {int} delay 
 * @returns 
 */
function delPassage(id, delay) {
  return new Promise((resolve) => {
    const passage = document.getElementById(id);
    passage.style.backgroundColor = '#ffb7b7';
    setTimeout(() => {
      if (id == 'mc-output-text') {
        passage.innerHTML = '';
        passage.style.backgroundColor = null;

      } else {
        passage.remove();
      }
      return resolve(id);
    }, delay);
  });
}


function delTextPhrase(id, delay) {
  return new Promise((resolve) => {
    const outText = document.getElementById(id + 'o');
    const outParent = outText.parentElement;

    outText.remove();

    if (outParent.children.length == 0) {
      outParent.remove();
    }

    setTimeout(() => { return resolve(id); }, delay);
  });
}