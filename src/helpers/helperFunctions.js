const prepareHTMLOfSearchResults = (items) => {

  let keys_str = '';

  items.forEach((arr) => {
    let key = arr[0].replace(/%5C|%2F/g, '/');
    keys_str += '<br /><form>' + key + '</form>';

    let useCases = '';

    let newArr = arr[1].map(arrOfUseCaseAndItsSteps => {
      let uc = arrOfUseCaseAndItsSteps[0];
      uc = uc.replace(/;/g, '.').replace(/\|/, '/');
      uc = uc.match(/It:.+|Step.+/gmi);
      return uc[0];
    });

    // sorting arr for steps. Steps with numeration higher then 9 can not be first in arr but last.
    const reg2 = new RegExp(/ [0-9]of/);
    const newArr1 = [];
    const newArr2 = [];

    newArr.forEach((step) => {
      if (reg2.test(step)) {
        newArr1.push(step);
      } else {
        newArr2.push(step);
      }
    });

    newArr1.sort();
    newArr2.sort();
    newArr = [...newArr1, ...newArr2];
    // ----------------------------------------------------------------------------------------------

    newArr.forEach(uc => {
      useCases += '<p style="color:black;width:100%;"> ' + uc + '</p>'
    });

    keys_str += useCases

  });

  let myWindow = window.open("", "_blank");
  myWindow.document.write('<section style="color:#b42012;display:flex;flex-direction:column;align-items:center;"><div>' + keys_str + '</div></section>');

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

const getUrlToImageInFirebase = (arrWithData, name) => {

  const useCaseName = name.match(/It:.+|Step.+/gmi)[0].replace(':','').replace('.', '');
  const directoryPath = arrWithData.join('/');

  return `gs://use-cases-search.appspot.com/${directoryPath}/${useCaseName}.jpg`

};

export {
  preventActionHandler,
  saveToClipboard,
  returnLinkToJenkinsJob,
  prepareHTMLOfSearchResults,
  getUrlToImageInFirebase
}