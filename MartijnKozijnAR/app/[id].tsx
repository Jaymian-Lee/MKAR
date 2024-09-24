import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const router = useRouter(); // Voeg deze regel toe om router te gebruiken

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <ScrollView contentContainerStyle={styles.productsGrid}>
        <View style={styles.productInteractionWrapper}>
          <View style={styles.productInformation}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
          <View style={styles.productInteraction}>
            <Pressable
              style={styles.productButton}
              onPress={() => router.push(product.url)} // Gebruik router.push() om te navigeren
            >
              <Text style={styles.buttonText}>
                <Ionicons style={styles.iconStyle} name="link" />
              </Text>
            </Pressable>
            <Pressable
              style={styles.productButton}
              onPress={() => {
                router.push({
                  pathname: "/ar-view", // De naam van je AR-pagina
                  params: { id: id }, // Geef de ID van het product door
                });
              }}
            >
              <Text style={styles.buttonText}>
                <Ionicons style={styles.iconStyle} name="cube" />
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: "#1D1B20",
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  productDescription: {
    color: "white",
  },
  productPrice: {
    color: "white",
    fontWeight: "bold",
  },
  productInteractionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productInformation: {
    width: "55%",
  },
  productInteraction: {
    width: "44%",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 24,
    fontWeight: "bold",
  },
  productButton: {
    backgroundColor: "#1d1b20",
    borderRadius: 32,
    justifyContent: "center",
    height: 40,
    marginLeft: 8,
  },
  productsGrid: {
    backgroundColor: "#2b2930",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 16,
  },
  iconStyle: {
    color: "#D0BCFF",
    fontSize: 24,
  },
});

export default ProductDetail;
