import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Item = props => {
  const {item, index, handleDeleteImage} = props;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.url}}
          style={{width: 100, height: 100}}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>
          {index + 1}. {item.name}
        </Text>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDeleteImage(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  detailContainer: {
    flex: 2,
    marginLeft: 20,
    justifyContent: 'space-around',
  },
  detailText: {
    fontWeight: 'bold',
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
  }
});

export default Item;
