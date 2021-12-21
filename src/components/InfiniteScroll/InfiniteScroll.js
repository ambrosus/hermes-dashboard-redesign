import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({ children, handleObserver, isLoading }) => {
  const observerRef = useRef(null);

  const handler = useRef(handleObserver);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handler.current();
      }
    }, options);
    observer.observe(observerRef.current);
  }, []);

  useEffect(() => {
    handler.current = handleObserver;
  }, [handleObserver]);

  return (
    <div className="infinite-scroll">
      {children}
      <div className="observer" ref={observerRef} />
      {isLoading && <div className="infinite-scroll__loader">loading...</div>}
    </div>
  );
};

InfiniteScroll.propTypes = {
  children: PropTypes.array,
  handleObserver: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default InfiniteScroll;
