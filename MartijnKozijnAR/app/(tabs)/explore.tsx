import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Product = {
  id: string;
  name: string;
  description: string;
  price?: number;
  imageUrl: string;
};

const TabTwoScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="compass" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.mainTitle}>Explore</ThemedText>
      </ThemedView>
      <ScrollView contentContainerStyle={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
              <ThemedText style={styles.productTitle}>
                {product.name}
              </ThemedText>
              <ThemedText>{product.description}</ThemedText>
              <ThemedText>
                {product.price ? `Prijs: €${product.price}` : ""}
              </ThemedText>
            </View>
          ))
        ) : (
          <ThemedText style={styles.noProductsText}>
            Geen producten gevonden...
          </ThemedText>
        )}
      </ScrollView>
      <ThemedText style={styles.section}>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing" style={styles.section}>
        <ThemedText>
          This app has two screens: <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
      </Collapsible>
      {/* Rest van je componenten */}
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 20,
  },
  mainTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#36343B",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    color: "#fff",
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
    fontSize: 12,
    fontFamily: "Roboto",
  },
  noProductsText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "#1D1B20",
    textDecorationLine: "underline",
  },
  ctaButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  ctaText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerContent: {
    padding: 24,
    backgroundColor: "#1D1B20",
    borderRadius: 16,
    marginBottom: 20,
  },
});

export default TabTwoScreen;
