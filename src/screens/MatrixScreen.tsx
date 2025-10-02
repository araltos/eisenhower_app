import { View, Text, StyleSheet } from 'react-native';

export default function MatrixScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.cell, styles.urgentImportant]}>
          <Text style={styles.cellText}>Urgent + Important</Text>
        </View>
        <View style={[styles.cell, styles.notUrgentImportant]}>
          <Text style={styles.cellText}>Not Urgent + Important</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.cell, styles.urgentNotImportant]}>
          <Text style={styles.cellText}>Urgent + Not Important</Text>
        </View>
        <View style={[styles.cell, styles.notUrgentNotImportant]}>
          <Text style={styles.cellText}>Not Urgent + Not Important</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cellText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  urgentImportant: { backgroundColor: '#ffdddd' },
  notUrgentImportant: { backgroundColor: '#ddffdd' },
  urgentNotImportant: { backgroundColor: '#ddddff' },
  notUrgentNotImportant: { backgroundColor: '#f0f0f0' },
});