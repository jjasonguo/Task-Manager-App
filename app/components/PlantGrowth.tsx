import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface PlantGrowthProps {
  points: number;
}

export const PlantGrowth: React.FC<PlantGrowthProps> = ({ points }) => {
  const getPlantImage = () => {
    // Plant evolves/grows at different point thresholds:
    // 0-4 points: sprout
    // 5-9 points: medium plant
    // 10+ points: full plant
    if (points >= 10) {
      return require('../../assets/images/plant-full.png');
    } else if (points >= 5) {
      return require('../../assets/images/plant-medium.png');
    } else {
      return require('../../assets/images/plant-sprout.png');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={getPlantImage()}
        style={styles.plantImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  plantImage: {
    width: 150,
    height: 150,
  },
}); 