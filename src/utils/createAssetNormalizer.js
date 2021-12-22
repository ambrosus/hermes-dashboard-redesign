import { isEmptyObj } from './isEmptyObj';

const createAssetNormalizer = (formData, isAssetCreating) => {
  const identifiers = {};
  let info = {};
  const {
    identifiersItems,
    name,
    description,
    coverImgUrl,
    images,
    rows,
    propertiesItems,
    latitude,
    longitude,
    customType,
  } = formData;

  if (identifiersItems && !isEmptyObj(identifiersItems)) {
    Object.keys(identifiersItems).forEach((el) => {
      if (identifiersItems[el].name && identifiersItems[el].description) {
        identifiers[[identifiersItems[el].name]] = [
          identifiersItems[el].description,
        ];
      }
    });
  }

  info = { name };

  if (description) {
    info.description = description;
  }

  if (isAssetCreating) {
    info.type = 'ambrosus.asset.info';
    info.assetType = customType;
  } else {
    info.type = customType;
  }

  if (rows && rows.length) {
    info.raws = rows;
  }

  Object.keys(formData).forEach((el) => {
    if (el.includes('groupPropertyItems')) {
      const currentGroup = formData[el];

      info[currentGroup.groupName] = {};

      Object.keys(currentGroup).forEach((groupEl) => {
        if (
          groupEl !== 'groupName' &&
          currentGroup[groupEl].name &&
          currentGroup[groupEl].description
        ) {
          info[currentGroup.groupName][currentGroup[groupEl].name] =
            currentGroup[groupEl].description;
        }
      });
    }
  });

  if (images && images.length) {
    info.images = {};

    images.forEach((el) => {
      if (el === coverImgUrl) {
        info.images.default = { url: el };
      } else {
        info.images[el.substring(el.length - 10, el.length - 1)] = { url: el };
      }
    });
  }

  if (propertiesItems && !isEmptyObj(propertiesItems)) {
    Object.keys(propertiesItems).forEach((el) => {
      const currentProp = propertiesItems[el];
      if (currentProp.name && currentProp.description) {
        info[currentProp.name] = currentProp.description;
      }
    });
  }

  const result = [{ ...info }];

  if (!isEmptyObj(identifiers)) {
    result.push({
      identifiers,
      type: 'ambrosus.asset.identifiers',
    });
  }

  if (latitude && longitude) {
    result.push({
      type: 'ambrosus.event.location',
      location: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [+latitude, +longitude],
        },
      },
    });
  }
  return result;
};

export default createAssetNormalizer;
