import moment from "moment";
import axios from "axios";

export const formatDate = (timestamp) => {
  return moment(timestamp).format("DD/MM/YYYY");
};

export const answer1 = async (pronunciation) => {
  let arrItem = await axios.get(
    `http://localhost:3001/api/question/${pronunciation}`
  );

  return arrItem.data.data[0].word;
};
export const answer2 = async (pronunciation) => {
  let arrItem = await axios.get(
    `http://localhost:3001/api/question/${pronunciation}`
  );

  return arrItem.data.data[1].word;
};
export const answer3 = async (pronunciation) => {
  let arrItem = await axios.get(
    `http://localhost:3001/api/question/${pronunciation}`
  );

  return arrItem.data.data[2].word;
};
