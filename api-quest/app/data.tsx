import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, RefreshControl
} from 'react-native';
import MealCard from '../components/MealCard';
import { Ionicons } from '@expo/vector-icons';

export default function DataScreen() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // Fetch initial random meals or specific default query
  useEffect(() => {
    fetchMeals('chicken'); // Default search
  }, []);

  const fetchMeals = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      const data = await response.json();
      
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        setError(`No recipes found for "${searchQuery}"`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setMeals([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMeals(query || 'chicken');
  };

  const handleSearch = () => {
    fetchMeals(query);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerArea}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes (e.g. Beef, Vegan)..."
            placeholderTextColor="#A0AEC0"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Ionicons name="close-circle" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.searchButton, !query.trim() && styles.searchButtonDisabled]} 
          onPress={handleSearch}
          disabled={!query.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#FF4757" />
          <Text style={styles.loadingText}>Finding best recipes...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <View style={styles.iconCircleError}>
            <Ionicons name="alert" size={32} color="#FF4757" />
          </View>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => fetchMeals('chicken')} style={styles.resetButton}>
             <Text style={styles.resetButtonText}>Reset Search</Text>
          </TouchableOpacity>
        </View>
      ) : meals.length === 0 && searched ? (
        <View style={styles.centerContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="restaurant" size={32} color="#A0AEC0" />
          </View>
          <Text style={styles.emptyText}>We couldn't find anything delicious for that. Let's try another ingredient!</Text>
        </View>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <MealCard meal={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF4757']} // Android
              tintColor={'#FF4757'} // iOS
            />
          }
          ListHeaderComponent={
             <Text style={styles.resultsHeader}>
               {searched ? `${meals.length} Results` : "Suggested for you"}
             </Text>
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  headerArea: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#2D3748',
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: '#FF4757',
    borderRadius: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonDisabled: {
    backgroundColor: '#FC8181',
    shadowOpacity: 0.1,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  resultsHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 16,
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconCircleError: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 20,
    color: '#718096',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#2D3748',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#EDF2F7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#4A5568',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    color: '#718096',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
