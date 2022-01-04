const notPropertyOrGroupKey = [
  'assetType',
  'description',
  'encryption',
  'name',
  'raws',
  'type',
  'images',
];

const getPropertiesAndGroups = (info) => {
  const properties = {};
  const groups = {};
  let propIdx = 0;

  Object.keys(info).forEach((el) => {
    if (!notPropertyOrGroupKey.includes(el) && typeof info[el] === 'object') {
      groups[el] = {};

      let itemIdx = 0;

      Object.keys(info[el]).forEach((groupItemName) => {
        groups[el] = {
          ...groups[el],
          [itemIdx]: {
            name: groupItemName,
            description: info[el][groupItemName],
          },
        };

        itemIdx += 1;
      });
    }
    if (!notPropertyOrGroupKey.includes(el) && typeof info[el] !== 'object') {
      properties[propIdx] = {
        ...properties[propIdx],
        name: el,
        description: info[el],
      };
      propIdx += 1;
    }
  });
  return { properties, groups };
};

export default getPropertiesAndGroups;
