import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type Product = {};

const TabTwoScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();

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
    <View style={styles.section}>
      <ScrollView contentContainerStyle={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/${product.id}`)}
            >
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
              <ThemedText style={styles.productTitle}>
                {product.name}
              </ThemedText>
              <View style={styles.descriptionWrapper}>
              <View style={styles.descriptionInner}>
              <ThemedText style={styles.productDescription}>
                {product.description}
              </ThemedText>
              </View>
              <View style={styles.arrow}>
                <Ionicons name="arrow-forward-outline" size={24} color="white" />
              </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText style={styles.noProductsText}>
            Geen producten gevonden...
          </ThemedText>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 16,
    marginTop: 64,
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
    height: 100,
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
  productDescription: {
    color: "white",
    fontSize: 12,
    fontFamily: "Roboto",
    lineHeight: 16,
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
  descriptionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionInner: {
    width: "80%",
  },
  arrow: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabTwoScreen;
