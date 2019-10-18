export default (items) => {

  let myMap = new Map();
  items.forEach((arr) => {
    let key = arr[0].replace(/%5C|%2F/g, '/');
    let value = arr[1][0].replace(/;/g, '.');
    myMap.set(key, value);
  });

  console.log('typeof map: ', typeof myMap, ' value: ', myMap);
};