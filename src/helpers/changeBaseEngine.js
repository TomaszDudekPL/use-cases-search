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

    const filePath = arr[0]; // string: path to file: "CONSUMER%2FGROUPS%2FGENERAL_GROUPS%2Fgroup_uc05"
    const arrOfUseCasesKeys = Object.keys(arr[1]); // array: files paths: ["HSH_Settings; !guest; !members; Step 2of7: Members settings; Temporary deactivation of Guest account", (...)]

    // eslint-disable-next-line no-unused-vars
    const arrOfUseCasesValues = Object.values(arr[1]); // array: values: [ "BEFORE: (...)", "STEP 1: (...)", "STEP 2: (...)", "ASSERT: (...)", "END: (...)" ]

    arr[1] = Object.entries(arr[1]);

    number += arrOfUseCasesKeys.length;

    if (/CONSUMER|LIVE/mi.test(filePath)) {

      consumerList.push(arr);

      numberConsumer += arrOfUseCasesKeys.length;
      let allHashTags = returnAllHashTags(arrOfUseCasesKeys[0]);
      allHashTags.forEach(hashTag => {
        uniqHashTagsForConsumer.add(hashTag);
      });

    } else if (/PRO/mi.test(filePath)) {

      proList.push(arr);

      numberPro += arrOfUseCasesKeys.length;
      let allHashTags = returnAllHashTags(arrOfUseCasesKeys[0]);
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