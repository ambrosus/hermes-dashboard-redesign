import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FileSvg } from '../../assets/svg/file.svg';
import Maps from '../GoogleMap';
import { isEmptyObj } from '../../utils/isEmptyObj';
import getPropertiesAndGroups from '../../utils/getPropertiesAndGroups';

const PageMainContent = ({ data, location = {} }) => {
  const [properties, setProperties] = useState({});
  const [groups, setGroups] = useState({});

  const info =
    data.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    data.content.data[0];

  useEffect(() => {
    if (info) {
      const { properties: propers, groups: groupsArr } =
        getPropertiesAndGroups(info);

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
          {!isEmptyObj(properties) && (
            <>
              <h4 className="page-main-title">Properties</h4>
              {Object.keys(properties).map((el) => (
                <div key={properties[el].name}>
                  <p className="page-main-subtitle">{properties[el].name}</p>
                  <p>{properties[el].description}</p>
                </div>
              ))}
              <hr />
            </>
          )}
          {!isEmptyObj(groups) &&
            Object.keys(groups).map((el) => (
              <>
                <h4 style={{ marginTop: 55 }}>{el}</h4>
                {Object.keys(groups[el]).map((idx) => (
                  <div key={idx}>
                    <p className="page-main-subtitle">{groups[el][idx].name}</p>
                    <p>{groups[el][idx].description}</p>
                  </div>
                ))}
                <hr />
              </>
            ))}
        </div>
        {!isEmptyObj(location) && (
          <>
            <h4 className="page-main-title">Location</h4>
            <Maps
              coordinates={{
                lat: location.location.geometry.coordinates[0],
                lng: location.location.geometry.coordinates[1],
              }}
            />
            <hr />
          </>
        )}
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
  location: PropTypes.object,
};

export default PageMainContent;
