import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {robotoWeights, iOSColors} from 'react-native-typography';

import {dark, lightGrey} from '../colorPallete';
import {validateImageUrl} from '../helpers/validation';
import convertDate from '../helpers/date';

export const SmallHorizontalCard = ({
  data,
  navigation,
  text,
  route,
  button,
  toonId,
  eventTrigger,
}) => {
  console.log(data, '====> CARD COMPONENT')
  const {title, name, id, genre} = data;
  const image = validateImageUrl(data.image);

  const navigate = () => navigation.navigate(route, {title, image, name, id, genre, toonId});
  let subTitle;

  const renderDeleteButton = (
    <TouchableOpacity
      style={styles.deleteBtn}
      onPress={() => eventTrigger(data.id)}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  if (text == 'Favorite(s)') {
    subTitle = data.favoriteCount;
  } else if (text == 'Episode(s)') {
    subTitle = data.episodes;
  } else {
    subTitle = convertDate(new Date(data.createdAt))
  }

  // if (data.favoriteCount) {
  //   subTitle = data.favoriteCount;
  // } else if (data.episodes) {
  //   subTitle = data.episodes;
  // } else if (data.createdAt) {
  //   subTitle = data.createdAt;
  // }

  return (
    <TouchableWithoutFeedback onPress={route ? navigate : null}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={{width: 80, height: 80}} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.mainTitleText}>{title ? title : data.name}</Text>
          {button ? (
            renderDeleteButton
          ) : (
            <Text style={styles.subTitleText}>
              {subTitle} {text ? text : null}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 80,
    borderWidth: 0.5,
    borderColor: lightGrey,
    overflow: 'hidden',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  mainTitleText: {
    ...robotoWeights.light,
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
    color: dark,
  },
  subTitleText: {
    ...robotoWeights.light,
    color: iOSColors.gray,
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: 'white',
    width: 100,
    padding: 5,
    borderWidth: 2,
    borderColor: '#ff5e57',
    borderRadius: 5,
  },
  deleteText: {
    textAlign: 'center',
    color: '#ff5e57',
  },
});
