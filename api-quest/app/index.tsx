import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative Background Elements */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} style={styles.decorativeCircleTop} />
      <Animated.View entering={FadeIn.delay(400).duration(1000)} style={styles.decorativeCircleBottom} />

      <View style={styles.content}>
        <Animated.View entering={SlideInUp.duration(800).springify()} style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://www.themealdb.com/images/ingredients/Salmon.png' }} 
            style={styles.heroImage} 
            resizeMode="contain"
          />
          <Animated.View entering={FadeInDown.delay(800).duration(500)} style={styles.badgeContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.badgeText}>Premium Recipes</Text>
          </Animated.View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.Text entering={FadeInDown.delay(600).duration(600)} style={styles.title}>
            Cook Like A <Text style={styles.titleHighlight}>Pro</Text>
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(800).duration(600)} style={styles.description}>
            Explore thousands of delicious recipes from around the globe. Fresh ingredients, step-by-step instructions, and endless inspiration.
          </Animated.Text>
        </View>
      </View>

      <Animated.View entering={FadeInDown.delay(1000).duration(600)} style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/data')} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Start Exploring</Text>
          <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFE',
    justifyContent: 'space-between',
  },
  decorativeCircleTop: {
    position: 'absolute',
    top: -width * 0.4,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#FFF0F0',
    opacity: 0.6,
  },
  decorativeCircleBottom: {
    position: 'absolute',
    bottom: -width * 0.2,
    left: -width * 0.3,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: '#FFF0F0',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 60,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 240,
    height: 240,
    borderRadius: 120,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
    marginBottom: 50,
    position: 'relative',
  },
  heroImage: {
    width: 160,
    height: 160,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  badgeText: {
    fontWeight: '700',
    color: '#2D3436',
    marginLeft: 6,
    fontSize: 14,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: -1,
  },
  titleHighlight: {
    color: '#FF4757',
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#FF4757',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 10,
  },
});
