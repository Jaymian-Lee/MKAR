import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Switch } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Linking } from 'react-native';



export default function SettingsScreen() {


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
     {/* create simple dunction to switch theme style */}
      <ThemedView style={styles.settingItem}>
        <ThemedText>Dark mode</ThemedText>
        <Switch
          value={true}
          onValueChange={() => { }}
        />
      </ThemedView>
      <ThemedView style={styles.settingItem}>
        <ThemedText type="link" onPress={ ()=>{ Linking.openURL('https://github.com/Jaymian-Lee/MKAR')}}>GitHub</ThemedText>
        <ThemedText></ThemedText>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
