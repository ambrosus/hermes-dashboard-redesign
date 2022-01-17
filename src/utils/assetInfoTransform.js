import { isEmptyObj } from './isEmptyObj';
import getPropertiesAndGroups from './getPropertiesAndGroups';
/* eslint-disable */
const assetInfoTransform = (assetInfo, isEvent) => {
  const info =
    assetInfo.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    assetInfo.content.data[0];

  const identifiers = assetInfo.content.data.find(
    (el) => el.type === 'ambrosus.asset.identifiers',
  );

  const { name, assetType: customType, images, description, type } = info;

  const transformedImages = [];
  let coverImgUrl = '';

  if (images && !isEmptyObj(images)) {
    Object.keys(images).forEach((el) => {
      transformedImages.push(images[el].url);
      if (el === 'default') {
        coverImgUrl = images[el].url;
      }
    });
  }

  const transformedIdentifiers = {};

  let additionalFields = {
    identifiersItems: [0],
    propertiesItems: [0],
  };

  if (identifiers) {
    const idens = identifiers.identifiers;
    let idx = 0;

    Object.keys(idens).forEach((el) => {
      transformedIdentifiers[idx] = {
        name: el,
        description: idens[el][0],
      };
      if (idx !== 0) {
        additionalFields.identifiersItems.push(
          additionalFields.identifiersItems.length,
        );
      }
      idx += 1;
    });
  }

  const transformedGroups = {};
  const { properties, groups } = getPropertiesAndGroups(info);

  Object.keys(properties).forEach((el) => {
    if (+el !== 0) {
      additionalFields.propertiesItems.push(
        additionalFields.propertiesItems.length,
      );
    }
  });

  const groupFields = [];

  if (groups) {
    let idx = 0;
    Object.keys(groups).forEach((el) => {
      const groupIdx = `groupPropertyItems${idx}`;

      transformedGroups[groupIdx] = {
        ...groups[el],
        groupName: el,
      };

      additionalFields = {
        ...additionalFields,
        [groupIdx]: [],
      };

      additionalFields[groupIdx] = Object.keys(groups[el]);
      groupFields.push(groupFields.length);

      idx += 1;
    });
  }

  const transformedData = {
    formData: {
      name,
      customType: isEvent ? type : customType,
      images: transformedImages,
      coverImgUrl,
      identifiersItems: transformedIdentifiers,
      description,
      accessLevel: assetInfo.content.idData.accessLevel,
      propertiesItems: properties,
      ...transformedGroups,
      rows: [],
    },
    groupFields,
    additionalFields,
  };

  const location = assetInfo.content.data.find(
    (el) => el.type === 'ambrosus.event.location',
  );

  if (location) {
    transformedData.formData.latitude = location.location.geometry.coordinates[0];
    transformedData.formData.longitude = location.location.geometry.coordinates[1];
    transformedData.formData.city = location.city;
    transformedData.formData.country = location.country;
  }
  return transformedData;
};

export default assetInfoTransform;
