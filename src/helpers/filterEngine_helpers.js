import {
  changeAllSemicolonsToDots,
  changeAllVerticalLinesToSlash,
  firstLetterToUpperCase,
  getRidOfTagName,
  returnHashTags_arr,
  returnKeyWords_obj,
  returnUseCaseID_str,
  returnUseCaseNameBody_arr,
  returnUseCaseTagName_arr,
  returnRunCommand,
  returnLinkToJenkinsJob,
  getUrlToImageInFirebase
} from "./helperFunctions";

const returnBaseDividedOnCategories = (state) => {

  let base;

  if (state.consumer_chkbox && state.pro_chkbox === false) base = state.consumerList;
  if (state.consumer_chkbox === false && state.pro_chkbox) base = state.proList;
  if (state.consumer_chkbox === false && state.pro_chkbox === false) base = [];
  if (state.consumer_chkbox && state.pro_chkbox) base = state.base;

  return base;
};


const removeSpacesFunc = (word) => word ? word.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ") : null;

const getLowerCaseFunc = (character) => character.toLowerCase();

const createArrayOfKeyWords = (string) => {
  return string.split(' ');
};

const returnNotEmptyValues = (searchValue) => {
  if (searchValue) {
    let arr = createArrayOfKeyWords(searchValue);
    arr = arr.filter(function (el) {
      return el !== null && el !== "";
    });
    return arr;
  }
  return [];
};

const returnAllUseCasesWithWantedTag = (base, tag) => {

  if (tag) {
    console.log('returnAllUseCasesWithWantedTag');
    tag = tag.replace(/#/, '');

    let ucArr = new Set();
    let updatedBase = [];
    const reg = new RegExp(`HSH_${tag}`);

    base.forEach(arrOfUC => {

      arrOfUC[1].forEach(uc => {

        if (reg.test(uc)) ucArr.add(uc);

      });

      if (ucArr.size) updatedBase.push([arrOfUC[0], [...ucArr]]);
      ucArr = new Set();
    });

    return updatedBase;
  }

  return base;
};

const returnAllUseCasesWithWantedKeyWords = (base, chosenKeyWords, connector) => {

  let ucArr = new Set();
  let updatedBase = [];

  if (connector === 'OR') {

    const returnRegExp = (chosenKeyWords) => {
      let regExp = '';
      chosenKeyWords.forEach((keyWord, index, arr) => {
        regExp += (`!${keyWord}; ${index !== arr.length - 1 ? '|' : ''}`)
      });
      return regExp;
    };

    const reg = new RegExp(returnRegExp(chosenKeyWords));

    base.forEach(arrOfUC => {

      arrOfUC[1].forEach(uc => {

        if (reg.test(uc)) ucArr.add(uc);

      });

      if (ucArr.size) updatedBase.push([arrOfUC[0], [...ucArr]]);
      ucArr = new Set();
    });

  } else if (connector === 'WITHOUT') {

    const returnRegExp = (chosenKeyWords) => {
      let regExp = '';
      chosenKeyWords.forEach((keyWord, index, arr) => {
        regExp += (`!${keyWord}; ${index !== arr.length - 1 ? '|' : ''}`)
      });
      return regExp;
    };

    const reg = new RegExp(returnRegExp(chosenKeyWords));

    base.forEach(arrOfUC => {

      arrOfUC[1].forEach(uc => {

        if (!reg.test(uc)) ucArr.add(uc);

      });

      if (ucArr.size) updatedBase.push([arrOfUC[0], [...ucArr]]);
      ucArr = new Set();
    });

  } else if (connector === 'WITH') {

    let ucSet = new Set();

    base.forEach(arrOfUC => {

      arrOfUC[1].forEach(uc => {

        let passed = chosenKeyWords.every(keyWord => {
          const regExp = `!${keyWord};`;
          const reg = new RegExp(regExp);
          return reg.test(uc);
        });

        if (passed) ucSet.add(uc);

      });

      if (ucSet.size) updatedBase.push([arrOfUC[0], [...ucSet]]);
      ucSet = new Set();

    });

  }
  return updatedBase;
};

const returnAllKeyWords = (base) => {

  // base - array of nested arrays. Each of them has arr of UCs on second position

  const keyWords1 = new Set();
  const keyWords2 = new Set();
  const keyWords3 = new Set();


  // const countWords = inputWords => inputWords.reduce((obj, word) => {
  //   obj[word] = (obj[word] || 0) + 1;
  //   return obj;
  // }, {});
  //
  // const countPercent = (value, total) => ((value / total) * 100).toPrecision(2);
  //
  // function returnPercentageOfEachKeyWord(obj, callback, total) {
  //   const newObj = {};
  //   for (let item in obj) {
  //     if (obj.hasOwnProperty(item)) {
  //       newObj[item] = Number.parseFloat(callback(obj[item], total));
  //     }
  //   }
  //   return newObj;
  // }

  // 1. Create array of all key words in use cases - now they are not uniq.

  if (base.length) {
    base.forEach((nestedArr) => {
      nestedArr[1].forEach((useCase) => {

        if(/1_/.test(useCase[0])){

          let words = useCase[0].match(/1_[a-zA-Z0-9_-]+;/gmi);

          if(words){
            words = words.map(word=> word.replace('1_', '').replace(';', ''));
            keyWords1.add(...words);
          }
        }

        if(/2_/.test(useCase[0])){

          let words = useCase[0].match(/2_[a-zA-Z0-9_-]+;/gmi);

          if(words){
            words = words.map(word=> word.replace('2_', '').replace(';', ''));
            keyWords2.add(...words);
          }
        }

        if(/3_/.test(useCase[0])){

          let words = useCase[0].match(/3_[a-zA-Z0-9_-]+;/gmi);

          if(words){
            words = words.map(word=> word.replace('3_', '').replace(';', ''));
            keyWords3.add(...words);
          }
        }

      })
    });



    // 2. Calculate how many not uniq words are in array -this will be our 100% (total)
    // const oneHundredPercent = arrOfAllKeyWords.length;

    // 3. Count: how many times each keyWord appears for a given HashTag
    // const objWithCountedWords = countWords(arrOfAllKeyWords);

    // 4. Calculate percentage for each keyWord in relation to total -return object with these values
    // return returnPercentageOfEachKeyWord(objWithCountedWords, countPercent, oneHundredPercent);

    return {
      keyWords1: [...keyWords1],
      keyWords2: [...keyWords2],
      keyWords3: [...keyWords3]
    }

  }
};

const returnUpdatedListOfUseCases_ifOneWord = (base, searchValue) => {

  let updatedList = [];
  let ucArr = new Set();
  let wantedValue = '';

  base.forEach(arrOfUC => {

    arrOfUC[1].forEach(arrWithUC => {

      const uc = arrWithUC[0];

      wantedValue = getLowerCaseFunc(searchValue);
      wantedValue = removeSpacesFunc(wantedValue);

      if (getLowerCaseFunc(uc).search(wantedValue) !== -1) ucArr.add(arrWithUC);

    });

    if (ucArr.size) updatedList.push([arrOfUC[0], [...ucArr]]);
    ucArr = new Set();
  });

  return {updatedList, wantedValue};
};

const returnUpdatedListOfUseCases_ifMoreThenOneWord = (base, arrOfKeyWords, firstKeyWord, secondKeyWord, thirdKeyWord) => {

  let updatedList = [];
  let ucArr = new Set();

  base.forEach(arrOfUC => {

    arrOfUC[1].forEach(
      function (arrWithUC) {

        const uc = arrWithUC[0];

        if (getLowerCaseFunc(uc).search(firstKeyWord) !== -1) {
          if (!arrOfKeyWords[1]) {
            ucArr.add(arrWithUC);
          }

          if (arrOfKeyWords[1]) {
            if (getLowerCaseFunc(uc).search(secondKeyWord) !== -1) {

              if (!arrOfKeyWords[2]) {
                ucArr.add(arrWithUC);
              } else if (arrOfKeyWords[1] && arrOfKeyWords[2]) {

                if (getLowerCaseFunc(uc).search(thirdKeyWord) !== -1) {
                  ucArr.add(arrWithUC);
                }
              }
            }
          }
        }
      });

    if (ucArr.size) {
      updatedList.push([arrOfUC[0], [...ucArr]]);
      ucArr = new Set();
      // TARGET
    }
  });

  return updatedList;
};

const createObjectWithSearchResult = (base) => {

  const result = [];
  let number = 0;

  base.forEach(arr => {

    const path = arr[0];
    const arrWithData = path.split(/%5C|%2F/);
    const fileName = `${arrWithData[arrWithData.length - 1]}.js`;
    const runCommand = returnRunCommand(arrWithData);
    const environment = arrWithData[0];
    const mainDirectory = arrWithData[1];
    const githubLinkToFile = `https://github.com/sgrouples/Frontend-E2E-Tests/blob/master/test/specs/${arrWithData.join('/')}.js`;
    const jenkinsLinkToJob = returnLinkToJenkinsJob(mainDirectory, [environment]);

    arr[1].forEach(fullUC => {

      if (fullUC[0]) {

        let uc = changeAllSemicolonsToDots(fullUC[0]);
        uc = changeAllVerticalLinesToSlash(uc);

        const useCaseID_str = returnUseCaseID_str(uc);
        const imageURL = getUrlToImageInFirebase(arrWithData, useCaseID_str);
        const allHashTags_arr = returnHashTags_arr(uc);
        const allKeyWords_obj = returnKeyWords_obj(uc);
        const describeTag_str = returnUseCaseTagName_arr(uc)[0];
        const useCaseBody_arr = returnUseCaseNameBody_arr(uc);
        const useCaseNameWithoutTag_str = firstLetterToUpperCase(getRidOfTagName(useCaseBody_arr)) + '.';
        if(useCaseID_str) number++;

        result.push([useCaseID_str, {
          ordinalNumber: number,
          env: environment,
          describeTag: describeTag_str,
          useCaseBody: useCaseNameWithoutTag_str,
          hashTags: allHashTags_arr,
          keyWords: allKeyWords_obj,
          steps: Array.isArray(fullUC[1]) ? fullUC[1] : [],
          mainDirectory: [mainDirectory, jenkinsLinkToJob],
          fileName: [fileName, githubLinkToFile],
          runCommand: runCommand,
          useCaseID: useCaseID_str,
          directoryPath: path,
          image_url: imageURL,
          checked: false,
          focused: false
        }]);
      }
    });
  });
  return result
}

export {
  removeSpacesFunc,
  getLowerCaseFunc,
  returnNotEmptyValues,
  returnAllUseCasesWithWantedTag,
  returnAllUseCasesWithWantedKeyWords,
  returnAllKeyWords,
  returnUpdatedListOfUseCases_ifOneWord,
  returnUpdatedListOfUseCases_ifMoreThenOneWord,
  returnBaseDividedOnCategories,
  createObjectWithSearchResult
}
