import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '@/firebaseConfig';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { DarkTheme } from '@react-navigation/native';

type Product= {};

const ReadData = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData: Product[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Product, 'id'>,
        }));

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="home" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welkom bij MartijnKozijnAR</ThemedText>
      </ThemedView>

      <ThemedText>Ervaar het beste van augmented reality met MartijnKozijnAR.</ThemedText>

      <ScrollView contentContainerStyle={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              <ThemedText style={styles.productTitle}>{product.name}</ThemedText>
              <ThemedText>{product.description}</ThemedText>
              <ThemedText > {product.price ? `Prijs: €${product.price}` : ''}</ThemedText>
            </View>
          ))
        ) : (
          <ThemedText>Geen producten gevonden...</ThemedText>
        )}
      </ScrollView>

      <ThemedView style={styles.section}>
        <ThemedText>Functies</ThemedText>
        <ThemedText>- Indrukwekkende AR-ervaringen</ThemedText>
        <ThemedText>- Gebruiksvriendelijke interface</ThemedText>
        <ThemedText>- Ondersteuning voor meerdere platforms</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Aan de slag</ThemedText>
        <ThemedText>Volg de handleidingen en tutorials om de app op te zetten en te gebruiken.</ThemedText>
        <ExternalLink href="https://docs.expo.dev/get-started/installation/">
          <ThemedText type="link">Installatiegids</ThemedText>
        </ExternalLink>
        <ExternalLink href="https://docs.expo.dev/tutorial/">
          <ThemedText type="link">Tutorials</ThemedText>
        </ExternalLink>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Contact</ThemedText>
        <ThemedText>Vragen of ondersteuning nodig? Neem contact met ons op.</ThemedText>
        <ExternalLink href="https://www.martijnkozijn.nl/content/contact.html">
          <ThemedText type="link">Contactpagina</ThemedText>
        </ExternalLink>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 20,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#1e1e1e', // Donkere achtergrond
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
     // MUI gebruikt box-shadow in plaats van shadowColor etc.
    color: '#fff', // Tekst in wit voor beter contrast op donkere achtergrond
    elevation: 2,
},

  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ReadData;
