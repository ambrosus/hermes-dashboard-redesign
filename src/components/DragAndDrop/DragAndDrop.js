import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as UploadIcon } from '../../assets/svg/upload.svg';

const DragAndDrop = ({ dropped }) => {
  const handleChange = ({ target }) => {
    dropped(target.files);
  };

  const handleDrop = (e) => {
    dropped([e.dataTransfer.files[0]]);

    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <input
        multiple="multiple"
        value=""
        type="file"
        id="file-upload"
        onChange={handleChange}
      />
      <label
        onDrop={(event) => handleDrop(event)}
        onDragOver={(event) => handleDragOver(event)}
        onDragEnter={(event) => handleDragEnter(event)}
        className="drag-and-drop"
        htmlFor="file-upload"
      >
        <UploadIcon /> Choose file or Drag it here
      </label>
    </div>
  );
};

DragAndDrop.propTypes = {
  dropped: PropTypes.func,
};

export default DragAndDrop;
