const prepareHTMLOfSearchResults = (items, func) => {

  let keys_str = '';

  items.forEach((arr) => {
    let key = arr[0].replace(/%5C|%2F/g, '/');
    keys_str += `<br /><form style="font-weight:bold">${key}</form>`;

    let useCases = '';

    let newArr = arr[1].map(arrOfUseCaseAndItsSteps => {

      let uc = arrOfUseCaseAndItsSteps[0];
      let steps = arrOfUseCaseAndItsSteps[1];
      uc = uc.replace(/;/g, '.').replace(/\|/, '/');
      uc = uc.match(/ucs_id:.+/gmi)[0];
      uc = uc.replace(/ucs_id/, 'uc search id');

      return {
        [uc]: steps
      };
    });

    newArr.forEach(obj_uc_steps => {
      const entry = Object.entries(obj_uc_steps)[0];
      useCases += `<p style="color:black;width:100%;${func ? 'font-weight:bold;' : ''}">${entry[0]}</p>`;

      if (Array.isArray(entry[1]) && func === 'WITH DESCRIPTIONS') {
        entry[1].forEach(steps => {
          useCases += `<p style="color:black;width:100%;font-style:italic;margin-left:40px">${steps}</p>`
        })
      }

    });

    keys_str += useCases;

  });

  let myWindow = window.open("", "_blank");
  myWindow.document.write(`<section style="color:#b42012;display:flex;flex-direction:column;align-items:center;"><div>${keys_str}</div></section>`);

};

const preventActionHandler = (event) => {
  let charCode = event.charCode;
  if (charCode === 13) {
    event.preventDefault();
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

const returnKeyWords_arr = (rawUC) => {
  // Return array with all raw keywords from full use case: !keyWord1., !!!keyWord2.
  const rawKeyWords_arr = rawUC.match(/![a-zA-Z0-9-_]+\./gmi); // !keyWord1, !keyWord2.

  // Return array with all keywords without exclamation marks and change dots into comma at the end: !keyWord1., !!!keyWord2.
  if (rawKeyWords_arr && rawKeyWords_arr[0]) {
    return rawKeyWords_arr.map(keyWord => {
      return keyWord.replace(/!/, '').replace(/\./, ',');
    });
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

const getImageID = (uc) => {
  const image_id = uc.match(/ID_.{2}/)[0];
  return image_id ? image_id.replace('ID_', '') : 'NO_ID';
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
  returnKeyWords_arr,
  returnHashTags_arr,
  returnUseCaseID_str,
  returnRunCommand,
  firstLetterToUpperCase,
  changeAllSemicolonsToDots,
  changeAllVerticalLinesToSlash,
  getImageID
}