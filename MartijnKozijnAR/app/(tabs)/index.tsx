import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,

} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExternalLink } from "@/components/ExternalLink";
import { Link } from "expo-router";
import { useEffect, useState } from "react";

type Product = {};

const ReadData = () => {
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
      headerBackgroundColor={{ light: "#1D1B20", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="home" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.headerContent}>
        <ThemedText type="title" style={styles.mainTitle}>
          Welkom bij MartijnKozijnAR
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Ervaar het beste van kozijnen en deuren in augmented reality.
        </ThemedText>

        {/* CTA button */}
        <Link style={styles.ctaButton} href="/explore">
          <Text style={styles.ctaText}>Ontdek meer</Text>
        </Link>
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

      <ThemedView style={styles.section}>
        <ThemedText>Functies</ThemedText>
        <ThemedText>- Indrukwekkende AR-ervaringen</ThemedText>
        <ThemedText>- Gebruiksvriendelijke interface</ThemedText>
        <ThemedText>- Ondersteuning voor meerdere platforms</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Aan de slag</ThemedText>
        <ThemedText>
          Volg de handleidingen en tutorials om de app op te zetten en te
          gebruiken.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/get-started/installation/">
          <ThemedText type="link" style={styles.link}>
            Installatiegids
          </ThemedText>
        </ExternalLink>
        <ExternalLink href="https://docs.expo.dev/tutorial/">
          <ThemedText type="link" style={styles.link}>
            Tutorials
          </ThemedText>
        </ExternalLink>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Contact</ThemedText>
        <ThemedText>
          Vragen of ondersteuning nodig? Neem contact met ons op.
        </ThemedText>
        <ExternalLink href="https://www.martijnkozijn.nl/content/contact.html">
          <ThemedText type="link" style={styles.link}>
            Contactpagina
          </ThemedText>
        </ExternalLink>
      </ThemedView>
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
  subtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
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
    color: "#CA5041",
    textDecorationLine: "underline",
  },
  ctaButton: {
    backgroundColor: "#CA5041",
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

export default ReadData;
