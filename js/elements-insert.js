const insertElements = (dataList, getElement, placeToInsert) => {
  if (!Array.isArray(dataList)) {
    dataList = [dataList];
  }

  const documentFragment = document.createDocumentFragment();

  dataList.forEach((dataItem) => {
    const element = getElement(dataItem);
    documentFragment.append(element);
  });

  placeToInsert.append(documentFragment);
};

export {
  insertElements,
};
