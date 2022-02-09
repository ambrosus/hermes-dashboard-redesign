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
    customType,
    latitude,
    longitude,
    city,
    country,
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

  info = {};

  if (description) {
    info.description = description;
  }

  if (isAssetCreating) {
    info.type = 'ambrosus.asset.info';
    info.name = name;
    info.assetType = customType.toLowerCase();
  } else {
    info.type = customType.toLowerCase();

    if (customType.toLowerCase() === 'package') {
      info.type = 'ambrosus.event.pack';
    } else if (customType.toLowerCase() === 'unpack') {
      info.type = 'ambrosus.event.unpack';
    }

    info.name = name;
  }
  if (rows && rows.length) {
    info.raws = rows;
  }

  Object.keys(formData).forEach((el) => {
    if (el.includes('groupPropertyItems')) {
      const currentGroup = formData[el];

      Object.keys(currentGroup).forEach((groupEl) => {
        if (
          groupEl !== 'groupName' &&
          currentGroup[groupEl].name &&
          currentGroup[groupEl].description &&
          currentGroup.groupName
        ) {
          if (!info[currentGroup.groupName]) {
            info[currentGroup.groupName] = {};
          }

          info[currentGroup.groupName][currentGroup[groupEl].name] =
            currentGroup[groupEl].description;
        }
      });
    }
  });

  if (images && images.length) {
    info.images = {};
    images.forEach((el, i) => {
      if (el === coverImgUrl) {
        info.images.default = { url: el };
      } else {
        info.images[
          el.substring(el.length - 10, el.length - 1).replace(/\./g, '') + i
        ] = { url: el };
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
    const coordsInfo = {
      type: 'ambrosus.event.location',
      location: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [+latitude, +longitude],
        },
      },
    };

    if (city) coordsInfo.city = city;
    if (country) coordsInfo.country = country;

    result.push(coordsInfo);
  }
  return result;
};

export default createAssetNormalizer;
