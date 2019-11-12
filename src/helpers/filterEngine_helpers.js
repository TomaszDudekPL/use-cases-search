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
  if(searchValue) {
    let arr = createArrayOfKeyWords(searchValue);
    arr = arr.filter(function (el) {
      return el !== null && el !== "";
    });
    return arr;
  }
  return [];
};

const returnAllUseCasesWithWantedTag = (base, tag) => {

  console.log('returnAllUseCasesWithWantedTag');

  let ucArr = new Set();
  let updatedBase = [];
  const reg = new RegExp(`HSH_${tag}`);

  // console.log(tag);

  base.forEach(arrOfUC => {

    arrOfUC[1].forEach(uc => {

      if (reg.test(uc)) ucArr.add(uc);

    });

    if (ucArr.size) updatedBase.push([arrOfUC[0], [...ucArr]]);
    ucArr = new Set();
  });

  // console.log('updatedBase: ',updatedBase);
  return updatedBase;
};

const returnUpdatedListOfUseCases_ifOneWord = (base, searchValue) => {

  let updatedList = [];
  let ucArr = new Set();
  let wantedValue;

  base.forEach(arrOfUC => {

    arrOfUC[1].forEach(uc => {

      wantedValue = getLowerCaseFunc(searchValue);
      wantedValue = removeSpacesFunc(wantedValue);

      if (getLowerCaseFunc(uc).search(wantedValue) !== -1) ucArr.add(uc);

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
      function (uc) {
        if (getLowerCaseFunc(uc).search(firstKeyWord) !== -1) {
          if (!arrOfKeyWords[1]) {
            ucArr.add(uc);
          }
          if (arrOfKeyWords[1]) {
            if (getLowerCaseFunc(uc).search(secondKeyWord) !== -1) {
              if (!arrOfKeyWords[2]) {
                ucArr.add(uc);
              } else if (arrOfKeyWords[1] && arrOfKeyWords[2]) {
                if (getLowerCaseFunc(uc).search(thirdKeyWord) !== -1) {
                  ucArr.add(uc);
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

export {
  removeSpacesFunc,
  getLowerCaseFunc,
  returnNotEmptyValues,
  returnAllUseCasesWithWantedTag,
  returnUpdatedListOfUseCases_ifOneWord,
  returnUpdatedListOfUseCases_ifMoreThenOneWord,
  returnBaseDividedOnCategories
}
