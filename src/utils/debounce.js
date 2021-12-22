const debounce = (func, timeout = 300) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, timeout);
  };
};

export default debounce;
