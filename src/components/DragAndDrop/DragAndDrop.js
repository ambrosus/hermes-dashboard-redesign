import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ReactComponent as UploadIcon } from '../../assets/svg/upload.svg';

const DragAndDrop = ({ dropped }) => {
  const [isDragged, setIsDragged] = useState(false);

  const handleChange = ({ target }) => dropped(target.files);

  const handleDrop = (e) => {
    dropped([e.dataTransfer.files[0]]);

    e.preventDefault();
    e.stopPropagation();

    if (isDragged) {
      setIsDragged(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDragged) {
      setIsDragged(true);
    }
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
        onDragLeave={() => setIsDragged(false)}
        className={cx('drag-and-drop', isDragged && 'drag-and-drop--dragged')}
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
