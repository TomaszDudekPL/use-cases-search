const prepareHTMLOfSearchResults = (items, func) => {

  let keys_str = '';

  items.forEach((arr) => {

    const obj = arr[1];

    const directoryPath = obj.directoryPath.replace(/%5C|%2F/g, ' / ');
    const useCaseName = obj.useCaseBody;
    const steps_arr = obj.steps;
    const describeTag = obj.describeTag;
    const useCaseID = obj.useCaseID;

    keys_str += `<br /><form style="font-weight:bold">${directoryPath}.js</form>`;
    keys_str += `<p style="color:black;width:100%;font-weight:bold;">Use Case Search ID: ${useCaseID}</p>`;
    keys_str += `<p style="color:black;width:100%;${func ? 'font-weight:bold;' : ''}">${describeTag} ${useCaseName}</p>`;

      if (Array.isArray(steps_arr) && func === 'WITH DESCRIPTIONS') {
        steps_arr.forEach(steps => {
          keys_str += `<p style="color:black;width:100%;font-style:italic;margin-left:40px">${steps}</p>`
        })
      }

    });

  let myWindow = window.open("", "_blank");
  myWindow.document.write(`<section style="color:#b42012;display:flex;flex-direction:column;align-items:center;"><div>${keys_str}</div></section>`);

};

const preventActionHandler = (event) => {
  let charCode = event.charCode;
  if (charCode === 13) {
    event.preventDefault();
    document.getElementById("search_btn").click();
  }
};

const saveToClipboard = () => {
  return (e) => {
    e.stopPropagation();
    const id = e.target.value;
    let copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  };
};

const returnLinkToJenkinsJob = (data, arr) => {

  const jenkinsLink = 'https://10.32.9.218:7070/view/Selenium%20All/';

  if (arr[0] === 'CONSUMER') {

    switch (data) {
      case 'CHAT':
        return `${jenkinsLink}job/Selenium%20CON%20CHAT/`;
      case 'GROUP_ALERTS':
        return `${jenkinsLink}job/Selenium%20CON%20GROUPALERTS/`;
      case 'GROUPS':
        return `${jenkinsLink}job/Selenium%20CON%20GROUPS/`;
      case 'OTHERS':
        return `${jenkinsLink}job/Selenium%20CON%20OTHERS/`;
      case 'PAGES':
        return `${jenkinsLink}job/Selenium%20CON%20PAGES/`;
      case 'POLLS':
        return `${jenkinsLink}job/Selenium%20CON%20POLLS/`;
      case 'REGISTRATION_CASES':
        return `${jenkinsLink}job/Selenium%20CON%20REGISTRATIONCASES/`;
      case 'REPORT':
        return `${jenkinsLink}job/Selenium%20CON%20REPORT/`;
      case 'REPOST_RESHARING':
        return `${jenkinsLink}job/Selenium%20CON%20REPOST/`;
      case 'SETTINGS':
        return `${jenkinsLink}job/Selenium%20CON%20SETTINGS/`;
      case 'SMART_SEARCH':
        return `${jenkinsLink}job/Selenium%20CON%20SMARTSEARCH/`;
      case 'SMOKE_TESTS':
        return `${jenkinsLink}job/Selenium%20CON%20SMOKE%20TESTS/`;
      case 'STORAGE':
        return `${jenkinsLink}`;
      default:
        return `${jenkinsLink}`;
    }

  } else {
    return `${jenkinsLink}`;
  }

};

const getUrlToImageInFirebase = (arrWithData, image_id) => {
  const directoryPath = arrWithData.join('/');
  return `gs://use-cases-search.appspot.com/${directoryPath}.js/${image_id}.jpg`;

};

const randomNum = () => Math.floor(Math.random() * 100000);

const returnUseCaseNameBody_arr = (rawUC) => {
  // Get rid of everything before It or Step tag: It: something. OR Step 1of5: something OR Step: something
  return /It|Step/.test(rawUC) ? rawUC.match(/It:.+|Step.+/gmi) : [rawUC];
}

const returnUseCaseTagName_arr = (rawUC) => {
  // Get rid of everything before and after It or Step tag and return clean tag name.
  return /It: |Step /.test(rawUC) ? rawUC.match(/It:|Step [0-9]+of[0-9]+:/) : ['It:'];
}

const getRidOfTagName = (useCaseBody_arr) => {
  // Get rid of tag name from uc body: It:, Step 1of5 etc.
  if (/It|Step/.test(useCaseBody_arr[0])) {
    return useCaseBody_arr[0]
      .replace(/Step [0-9]+of[0-9]+:/, '')
      .replace(/It:/, '')
      .replace(/Step:/, '')
      .trim();
  } else {
    return useCaseBody_arr[0].trim();
  }
}

const returnKeyWords_obj = (rawUC) => {

  // Return array with all raw keywords from full use case: !keyWord1., !!!keyWord2.
  const rawKeyWords1_arr = rawUC.match(/1_[a-zA-Z0-9-_]+\./gmi); // 1_keyWord1, 1_keyWord2.
  const rawKeyWords2_arr = rawUC.match(/2_[a-zA-Z0-9-_]+\./gmi); // 2_keyWord1, 2_keyWord2.
  const rawKeyWords3_arr = rawUC.match(/3_[a-zA-Z0-9-_]+\./gmi); // 3_keyWord1, 3_keyWord2.

  const getCleanKeyWords = (arr, str) => arr? arr.map(rawKeyWord => rawKeyWord.replace(str, '').replace(/\./, ',')): [];

  return {
    keyWords1: getCleanKeyWords(rawKeyWords1_arr, '1_'),
    keyWords2: getCleanKeyWords(rawKeyWords2_arr, '2_'),
    keyWords3: getCleanKeyWords(rawKeyWords3_arr, '3_')
  }
}

const returnHashTags_arr = (rawUC) => {
  // Return array with all raw hashtags from full use case: HSH_hashtag1. HSH_hashtag2.
  const rawHashTags_arr = rawUC.match(/HSH_[a-zA-Z]+.[a-zA-Z]+/gm);

  // Return array with all hashtags and change HSH part into hash:# then remove dots at the end: #hashtag1 #hashtag2
  if (rawHashTags_arr && rawHashTags_arr[0]) {
    return rawHashTags_arr.map(hashTag => {
      return hashTag.replace(/HSH_/, '#').replace(/\./, '');
    });
  }
}

const returnUseCaseID_str = (rawUC) => {
  // Return raw use case ID from full use case: ucs_id: 34ka2wm78p82.
  const rawUseCaseID_str = rawUC.match(/ucs_id: [a-z0-9]+./gm)[0];

  // Return use case ID without tag and dot at the end: 34ka2wm78p82
  if (rawUseCaseID_str) {
      return rawUseCaseID_str.replace(/ucs_id: /, '').replace(/\./, '');
  }
}

const firstLetterToUpperCase = (str) => str.charAt(0).toUpperCase() + str.substring(1);

const changeAllSemicolonsToDots = (str) => str.replace(/;/gmi, '.');

const changeAllVerticalLinesToSlash = (str) => str.replace(/\|/gmi, '/');

const returnRunCommand = (arrWithData) => {

  let env;

  switch (arrWithData[0]) {
    case 'CONSUMER':
      env = 'master';
      break;
    case 'PRO':
      env = 'master-pro';
      break;
    case 'LIVE':
      env = 'live';
      break;
    default:
      env = 'master';
  }

  let urlToFile = arrWithData.join('/').concat('.js');
  return `node launcher.js --env ${env} -d ${urlToFile}`;

};

const getAllStepsFromFullBase = (consumerBase, proBase, pathToFile) => {

  let arrWithSteps = [];

  if (pathToFile.includes('CONSUMER')) {
    for (let i = 0; i < consumerBase.length; i++) {
      if (consumerBase[i][0] === pathToFile) {
        // eslint-disable-next-line no-loop-func
        consumerBase[i][1].forEach(arrWithUCWithStepInDescriptor => {
          arrWithSteps.push(arrWithUCWithStepInDescriptor[0]);
        });
        break;
      }
    }
  } else if (pathToFile.includes('PRO')) {
    for (let i = 0; i < proBase.length; i++) {
      if (proBase[i][0] === pathToFile) {
        // eslint-disable-next-line no-loop-func
        proBase[i][1].forEach(arrWithUCWithStepInDescriptor => {
          arrWithSteps.push(arrWithUCWithStepInDescriptor[0]);
        });
        break;
      }
    }
  }

  return arrWithSteps;
};

const returnUC_StepsFromFile = (describeTag_arr, consumerBase, proBase, directoryPath) => {

  let arrWithSteps = [];
  let arrWithCleanSteps = [];

  if (describeTag_arr.includes('Step')) {
    arrWithSteps = getAllStepsFromFullBase(consumerBase, proBase, directoryPath);
  }

  // prepare steps to show in collapse dialog
  if (0 in arrWithSteps) {
    arrWithSteps.forEach(step => {

      // mark step which must be highlighted
      const reg = new RegExp(describeTag_arr);
      if (reg.test(step)) {
        step = step.concat('_XOXO');
      }
      arrWithCleanSteps.push(step.match(/Step.+/gmi, '')[0]);
    });

    // sorting arr for steps. Steps with numeration higher then 9 can not be first in arr but last.
    const reg2 = new RegExp(/ [0-9]of/);
    const newArr1 = [];
    const newArr2 = [];

    arrWithCleanSteps.forEach((step) => {
      if (reg2.test(step)) {
        newArr1.push(step);
      } else {
        newArr2.push(step);
      }
    });

    newArr1.sort();
    newArr2.sort();
    return arrWithCleanSteps = [...newArr1, ...newArr2];
  }

}

const getItemFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const setItemInLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const checkThisUseCase = (id, checkOrFocus) => () => {

  if(!(getItemFromLocalStorage('itemsState'))) {
    const itemsState_obj = {};
    itemsState_obj[id] = {};
    itemsState_obj[id][checkOrFocus] = true;
    setItemInLocalStorage('itemsState',itemsState_obj);
  } else {
    const itemsState_obj = getItemFromLocalStorage('itemsState');
    if(itemsState_obj[id]) {
      itemsState_obj[id][checkOrFocus] = !itemsState_obj[id][checkOrFocus];
    } else {
      itemsState_obj[id] = {};
      itemsState_obj[id][checkOrFocus] = true;
    }
    setItemInLocalStorage('itemsState',itemsState_obj);
  }
}

export {
  preventActionHandler,
  saveToClipboard,
  returnLinkToJenkinsJob,
  prepareHTMLOfSearchResults,
  getUrlToImageInFirebase,
  randomNum,
  returnUseCaseNameBody_arr,
  returnUseCaseTagName_arr,
  getRidOfTagName,
  returnKeyWords_obj,
  returnHashTags_arr,
  returnUseCaseID_str,
  returnRunCommand,
  firstLetterToUpperCase,
  changeAllSemicolonsToDots,
  changeAllVerticalLinesToSlash,
  returnUC_StepsFromFile,
  checkThisUseCase,
  getItemFromLocalStorage
  // checked
}