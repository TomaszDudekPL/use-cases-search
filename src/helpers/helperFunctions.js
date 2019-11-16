const prepareMapOfSearchResults = (items) => {

  let myMap = new Map();
  items.forEach((arr) => {
    let key = arr[0].replace(/%5C|%2F/g, '/');
    let value = arr[1][0].replace(/;/g, '.');
    myMap.set(key, value);
  });

  console.log('typeof map: ', typeof myMap, ' value: ', myMap);
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

const returnRunCommand = (ucInfoObj) => {
  let env;
  if (ucInfoObj) {

    switch(ucInfoObj.arr[0]){
      case 'CONSUMER':
        env = 'master';
        break;
      case 'PRO':
        env = 'master-pro';
        break;
      case 'LIVE':
        env = 'live';
        break;
      default:  env = 'master';
    }

    let urlToFile = ucInfoObj.arr.join('/').concat('.js');
    return `node launcher.js --env ${env} -d ${urlToFile}`;
  }
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

const calculateNumberOfUCForConsumer = (items) => {
  let numberOfUCForConsumer = 0;
  items.forEach(arr => {
    numberOfUCForConsumer += /CONSUMER|LIVE/.test(arr[0]) ? arr[1].length : 0;
  });
  return numberOfUCForConsumer;
};

const calculateNumberOfUCForPro = (items) => {
  let numberOfUCForPro = 0;
  items.forEach(arr => {
    numberOfUCForPro += /PRO/.test(arr[0]) ? arr[1].length : 0;
  });
  return numberOfUCForPro;
};

export {
  preventActionHandler,
  saveToClipboard,
  returnRunCommand,
  returnLinkToJenkinsJob,
  calculateNumberOfUCForConsumer,
  calculateNumberOfUCForPro,
  prepareMapOfSearchResults
}