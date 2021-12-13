import { isEmptyObj } from './isEmptyObj';

const createAssetNormalizer = (formData) => {
  const identifiers = {};
  let info = {};
  const {
    identifiersItems,
    name,
    description,
    type,
    coverImgUrl,
    images,
    propertiesItems,
  } = formData;

  if (!isEmptyObj(identifiersItems)) {
    Object.keys(identifiersItems).forEach((el) => {
      identifiers[[identifiersItems[el].name]] = [
        identifiersItems[el].description,
      ];
    });
  }

  info = {
    name,
    description,
    assetType: type,
  };

  Object.keys(formData).forEach((el) => {
    if (el.includes('groupPropertyItems')) {
      const currentGroup = formData[el];

      info[currentGroup.groupName] = {};

      Object.keys(currentGroup).forEach((groupEl) => {
        if (groupEl !== 'groupName') {
          info[currentGroup.groupName][currentGroup[groupEl].name] =
            currentGroup[groupEl].description;
        }
      });
    }
  });

  if (images.length) {
    info.images = {};

    images.forEach((el) => {
      if (el === coverImgUrl) {
        info.images.default = { url: el };
      } else {
        info.images[el.substring(el.length - 10, el.length - 1)] = { url: el };
      }
    });
  }

  if (!isEmptyObj(propertiesItems)) {
    Object.keys(propertiesItems).forEach((el) => {
      const currentProp = propertiesItems[el];

      info[currentProp.name] = currentProp.description;
    });
  }

  const result = [];

  result.push({
    ...info,
    type: 'ambrosus.asset.info',
  });

  if (!isEmptyObj(identifiers)) {
    result.push({
      identifiers,
      type: 'ambrosus.asset.identifiers',
    });
  }

  return result;
};

export default createAssetNormalizer;
