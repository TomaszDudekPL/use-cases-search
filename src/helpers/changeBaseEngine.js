export default function (val) {
  let number = 0, numberConsumer = 0, numberPro = 0;
  let entries = Object.entries(val);
  let consumerList = [];
  let proList = [];

  entries.forEach(function (arr) {
    arr[1] = Object.keys(arr[1]);
    number += arr[1].length;
    if(/CONSUMER|LIVE/mi.test(arr[0])){
      consumerList.push(arr);
      numberConsumer += arr[1].length;
    } else if (/PRO/mi.test(arr[0])){
      proList.push(arr);
      numberPro += arr[1].length;
    }
  });

  return {
    base: entries,
    consumerList: consumerList,
    proList: proList,
    numberOfAllUCforConsumer: numberConsumer,
    numberOfAllUCforPro: numberPro,
    numberOfAllUseCases: number
  };
}