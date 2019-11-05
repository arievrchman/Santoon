import {URI} from 'react-native-dotenv';

export const emailValidation = email =>
  new RegExp(/^(?![_])[a-zA-Z0-9_\.]+@[a-z]*(\.[a-z]{2,3})+$/).test(email);

export const validateImageUrl = image => {
  const isPrefix = new RegExp(/^(http|https)[://]/).test(image);
  let imageUrl = image;
  if (!isPrefix) {
    imageUrl = URI + image;
  }
  return imageUrl;
};
