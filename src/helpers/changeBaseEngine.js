export default function (val) {
  let number = 0, numberConsumer = 0, numberPro = 0;
  let entries = Object.entries(val);
  let consumerList = [];
  let proList = [];
  let uniqHashTagsForConsumer = new Set();
  let uniqHashTagsForPro = new Set();

  const returnAllHashTags = (useCase) => {

    const allHashTags = [];
    const arrOfHashTags = useCase.match(/HSH_[a-zA-Z0-9-_]+;/gmi);

    if (arrOfHashTags && arrOfHashTags.length) {
      arrOfHashTags.forEach((hashTag) => {
        hashTag = hashTag.replace(/HSH_/, '#').replace(/;/, '');
        allHashTags.push(hashTag);
      });
    }
    return allHashTags
  };

  entries.forEach(function (arr) {

    arr[1] = Object.keys(arr[1]);
    number += arr[1].length;

    if (/CONSUMER|LIVE/mi.test(arr[0])) {

      consumerList.push(arr);
      numberConsumer += arr[1].length;
      let allHashTags = returnAllHashTags(arr[1][0]);
      allHashTags.forEach(hashTag => {
        uniqHashTagsForConsumer.add(hashTag);
      });

    } else if (/PRO/mi.test(arr[0])) {

      proList.push(arr);
      numberPro += arr[1].length;
      let allHashTags = returnAllHashTags(arr[1][0]);
      allHashTags.forEach(hashTag => {
        uniqHashTagsForPro.add(hashTag);
      });

    }
  });

  return {
    base: entries,
    consumerList: consumerList,
    proList: proList,
    numberOfAllUCforConsumer: numberConsumer,
    numberOfAllUCforPro: numberPro,
    numberOfAllUseCases: number,
    uniqHashTagsForConsumer: [...uniqHashTagsForConsumer],
    uniqHashTagsForPro: [...uniqHashTagsForPro]
  };
}