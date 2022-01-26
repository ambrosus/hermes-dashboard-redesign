import moment from 'moment';

const dateFormatter = (timecode) => {
  const passedMinutes = moment().diff(timecode, 'minutes');
  let passedTime = `${passedMinutes} minutes`;

  if (passedMinutes >= 60) {
    passedTime = `${moment().diff(timecode, 'hours')} hours`;
  }
  if (passedMinutes >= 60 * 24) {
    passedTime = `${moment().add(1, 'day').diff(timecode, 'days')} days`;
  }
  return passedTime;
};

export default dateFormatter;
