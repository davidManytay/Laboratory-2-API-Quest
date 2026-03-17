import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MealCard({ meal }: { meal: any }) {
  const openRecipeLink = () => {
    if (meal.strSource) {
      Linking.openURL(meal.strSource).catch(() => {
        if (meal.strYoutube) {
           Linking.openURL(meal.strYoutube);
        }
      });
    } else if (meal.strYoutube) {
      Linking.openURL(meal.strYoutube);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openRecipeLink} activeOpacity={0.9}>
      <ImageBackground source={{ uri: meal.strMealThumb }} style={styles.imageBackground} resizeMode="cover">
         <View style={styles.gradientOverlay} />
         
         <View style={styles.topBadges}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{meal.strCategory}</Text>
            </View>
            <View style={[styles.categoryBadge, {backgroundColor: 'rgba(0,0,0,0.6)'}]}>
              <Text style={styles.categoryBadgeText}>{meal.strArea}</Text>
            </View>
         </View>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{meal.strMeal}</Text>
        
        <View style={styles.footerRow}>
           <Text style={styles.linkText}>View full recipe</Text>
           <Ionicons name="arrow-forward-circle" size={24} color="#FF4757" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  imageBackground: {
    width: '100%',
    height: 220,
    justifyContent: 'space-between',
    backgroundColor: '#F7FAFC',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)', // Simplest overlay
  },
  topBadges: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 71, 87, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  linkText: {
    fontSize: 15,
    color: '#718096',
    fontWeight: '600',
  },
});
