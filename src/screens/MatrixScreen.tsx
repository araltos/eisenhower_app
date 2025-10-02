import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';

export default function MatrixScreen() {
  const [tasks, setTasks] = useState({
    urgentImportant: [] as string[],
    notUrgentImportant: [] as string[],
    urgentNotImportant: [] as string[],
    notUrgentNotImportant: [] as string[],
  });

  const [newTask, setNewTask] = useState('');
  const [activeQuadrant, setActiveQuadrant] = useState<null | keyof typeof tasks>(null);

  const addTask = () => {
    if (!newTask || !activeQuadrant) return;
    setTasks(prev => ({
      ...prev,
      [activeQuadrant]: [...prev[activeQuadrant], newTask],
    }));
    setNewTask('');
    setActiveQuadrant(null);
  };

  const renderQuadrant = (
    title: string,
    key: keyof typeof tasks,
    style: any
  ) => (
    <View style={[styles.cell, style]}>
      <Text style={styles.cellTitle}>{title}</Text>
      <FlatList
        data={tasks[key]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.task}>{'• '}{item}</Text>}
      />
      {activeQuadrant === key ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Enter task..."
          />
          <Button title="Save" onPress={addTask} />
        </View>
      ) : (
        <Button title="+ Add Task" onPress={() => setActiveQuadrant(key)} />
      )}
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      {/* Top Axis Labels */}
      <View style={styles.topLabels}>
        <Text style={styles.axisLabel}>Urgent</Text>
        <Text style={styles.axisLabel}>Not Urgent</Text>
      </View>

      <View style={styles.container}>
        {/* Left Axis Labels */}
        <View style={styles.sideLabels}>
          <Text style={styles.axisLabelVertical}>Important</Text>
          <Text style={styles.axisLabelVertical}>Not Important</Text>
        </View>

        {/* The 2x2 Grid */}
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            {renderQuadrant('Urgent + Important', 'urgentImportant', styles.urgentImportant)}
            {renderQuadrant('Not Urgent + Important', 'notUrgentImportant', styles.notUrgentImportant)}
          </View>
          <View style={styles.row}>
            {renderQuadrant('Urgent + Not Important', 'urgentNotImportant', styles.urgentNotImportant)}
            {renderQuadrant('Not Urgent + Not Important', 'notUrgentNotImportant', styles.notUrgentNotImportant)}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff', padding: 4 },
  container: { flex: 1, flexDirection: 'row' },
  row: { flex: 1, flexDirection: 'row' },

  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 6,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  cellTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  task: { fontSize: 12, marginVertical: 2 },

  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    padding: 4,
    fontSize: 12,
    borderRadius: 4,
    backgroundColor: '#fff',
  },

  // Quadrant colors
  urgentImportant: { backgroundColor: '#ffdddd' },
  notUrgentImportant: { backgroundColor: '#ddffdd' },
  urgentNotImportant: { backgroundColor: '#ddddff' },
  notUrgentNotImportant: { backgroundColor: '#f0f0f0' },

  // Axis labels
  topLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 4,
  },
  sideLabels: {
    justifyContent: 'space-around',
    paddingRight: 4,
  },
  axisLabel: { fontWeight: 'bold', fontSize: 14 },
  axisLabelVertical: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    transform: [{ rotate: '-90deg' }],
  },
});