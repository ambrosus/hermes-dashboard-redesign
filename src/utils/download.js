// Function to download data to a file
/*eslint-disable*/
export const download = (
  filename,
  data = { testData: 'test-data', testObject: [] },
  type = '.json',
) => {
  const file = new Blob([JSON.stringify(data)], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    const a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};
