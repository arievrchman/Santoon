import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {robotoWeights, iOSColors} from 'react-native-typography';
import {dark} from '../colorPallete';
import {validateImageUrl} from '../helpers/validation';

function HorizontalCard({santoon, navigation, handleFavorite}) {
  const favouritedBtn = {
    backgroundColor: 'white',
    borderColor: iOSColors.green,
  };
  const favouritedText = {
    color: iOSColors.green,
  };

  const image = validateImageUrl(santoon.image);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('DetailToon', {
          id: santoon.id,
          title: santoon.title,
          image: image,
          genre: santoon.genre,
        })
      }>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageSize} source={{uri: image}} />
        </View>
        <View style={{flex: 1, marginLeft: 25, flexDirection: 'row'}}>
          <View style={{flex: 2, flexDirection: 'column'}}>
            <Text style={styles.titleCardText}>{santoon.title}</Text>
            <TouchableOpacity
              style={[
                styles.favButton,
                santoon.isFavorite ? favouritedBtn : null,
              ]}
              onPress={() => handleFavorite(santoon.isFavorite, santoon.id)}>
              <Text
                style={[
                  styles.textFavourite,
                  santoon.isFavorite ? favouritedText : null,
                ]}>
                {santoon.isFavorite ? '✓   Favorite' : '+   Favorite'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

class AllToons extends Component {
  render() {
    const {santoons} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>All</Text>
        {santoons.map(santoon => {
          return (
            <HorizontalCard
              key={santoon.id}
              handleFavorite={this.props.handleFavorite}
              navigation={this.props.navigation}
              santoon={santoon}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  textTitle: {
    ...robotoWeights.bold,
    fontSize: 18,
    marginVertical: 10,
    color: dark,
  },
  imageSize: {
    width: 100,
    height: 100,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: iOSColors.lightGray,
    overflow: 'hidden',
  },
  favButton: {
    backgroundColor: iOSColors.green,
    marginVertical: 10,
    alignItems: 'center',
    width: 100,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: iOSColors.green,
  },
  titleCardText: {
    ...robotoWeights.bold,
    color: dark,
  },
  textFavourite: {
    ...robotoWeights.thin,
    padding: 6,
    color: iOSColors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default AllToons;
