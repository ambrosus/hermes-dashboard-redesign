import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FileSvg } from '../../assets/svg/file.svg';

const notPropertyOrGroupKey = [
  'assetType',
  'description',
  'encryption',
  'name',
  'raws',
  'type',
  'images',
];

const PageMainContent = ({ data }) => {
  const [properties, setProperties] = useState([]);
  const [groups, setGroups] = useState([]);

  const info =
    data.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    data.content.data[0];

  useEffect(() => {
    if (info) {
      const propers = [];
      const groupsArr = [];

      Object.keys(info).forEach((el) => {
        if (
          !notPropertyOrGroupKey.includes(el) &&
          typeof info[el] === 'object'
        ) {
          groupsArr.push(info[el]);
        }
        if (
          !notPropertyOrGroupKey.includes(el) &&
          typeof info[el] !== 'object'
        ) {
          propers.push({ name: el, descr: info[el] });
        }
      });

      setProperties(propers);
      setGroups(groupsArr);
    }
  }, []);

  const identifiersInfo = data.content.data.find(
    (el) => el.type === 'ambrosus.asset.identifiers',
  );

  const { description, images, raws } = info;
  return (
    <>
      <div className="asset-page-main">
        <div className="asset-page-main">
          {!!description && (
            <>
              <h4 className="page-main-title">Description</h4>
              <p>{description}</p>
              <hr />
            </>
          )}
          {!!identifiersInfo && (
            <>
              <h4 className="page-main-title">Identifiers</h4>
              {Object.keys(identifiersInfo.identifiers).map((el) => (
                <div key={el}>
                  <p className="page-main-subtitle">{el}</p>
                  <p>{identifiersInfo.identifiers[el][0]}</p>
                </div>
              ))}
              <hr />
            </>
          )}
          {!!properties.length && (
            <>
              <h4 className="page-main-title">Properties</h4>
              {properties.map((el) => (
                <div key={el.name}>
                  <p className="page-main-subtitle">{el.name}</p>
                  <p>{el.descr}</p>
                </div>
              ))}
              <hr />
            </>
          )}
          {!!groups && (
            <>
              <h4 style={{ marginTop: 55 }}>Properties groups</h4>
              {groups.map((el) =>
                Object.keys(el).map((name) => (
                  <div key={name}>
                    <p className="page-main-subtitle">{name}</p>
                    <p>{el[name]}</p>
                  </div>
                )),
              )}
              <hr />
            </>
          )}
        </div>
        {!!images && (
          <>
            <h4 className="page-main-title">Photo</h4>
            <div className="page-images-wrapper">
              {Object.keys(images).map((el) => (
                <img
                  key={el}
                  className="page-images-wrapper__image"
                  alt="asset"
                  src={images[el].url}
                />
              ))}
            </div>
            <hr />
          </>
        )}
        {!!raws && (
          <>
            <h4 className="page-main-title">Files</h4>
            <div className="page-files-wrapper">
              {raws.map((el) => (
                <a className="page-file" href={el.data} download={el.name}>
                  <FileSvg />
                  <p className="page-file-name">{el.name}</p>
                </a>
              ))}
            </div>
            <hr />
          </>
        )}
      </div>
    </>
  );
};

PageMainContent.propTypes = {
  data: PropTypes.object,
};

export default PageMainContent;
