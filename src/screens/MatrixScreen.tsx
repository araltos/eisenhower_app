import { View, Text, StyleSheet } from 'react-native';

export default function MatrixScreen() {
  return (
    <View style={styles.container}>
      <Text>Matrix Screen (Eisenhower Grid will go here)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});