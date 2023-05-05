import moment from "moment/moment";

const ParseDate = (date) => {
  return moment(date).format("MMM Do YY");
};

export default ParseDate;
