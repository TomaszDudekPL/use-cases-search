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

const saveToClipboard = (id) => {
  return () => {
    let copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  }
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
    return `node launcher.js -p 1 -r 1 -e ${env} -d ${urlToFile}`;
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
  calculateNumberOfUCForConsumer,
  calculateNumberOfUCForPro,
  prepareMapOfSearchResults
}