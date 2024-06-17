import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="home" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welkom bij MartijnKozijnAR</ThemedText>
      </ThemedView>
      <ThemedText>Ervaar het beste van augmented reality met MartijnKozijnAR.</ThemedText>
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
}

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
});
