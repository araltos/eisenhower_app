import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';

export default function MatrixScreen() {
  // State for each quadrant
  const [tasks, setTasks] = useState({
    urgentImportant: [] as string[],
    notUrgentImportant: [] as string[],
    urgentNotImportant: [] as string[],
    notUrgentNotImportant: [] as string[],
  });

  // State for new task input
  const [newTask, setNewTask] = useState('');
  const [activeQuadrant, setActiveQuadrant] = useState<null | keyof typeof tasks>(null);

  // Add a new task into the correct quadrant
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
      <Text style={styles.cellText}>{title}</Text>
      <FlatList
        data={tasks[key]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}
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
    <View style={styles.container}>
      <View style={styles.row}>
        {renderQuadrant('Urgent + Important', 'urgentImportant', styles.urgentImportant)}
        {renderQuadrant('Not Urgent + Important', 'notUrgentImportant', styles.notUrgentImportant)}
      </View>
      <View style={styles.row}>
        {renderQuadrant('Urgent + Not Important', 'urgentNotImportant', styles.urgentNotImportant)}
        {renderQuadrant('Not Urgent + Not Important', 'notUrgentNotImportant', styles.notUrgentNotImportant)}
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
    padding: 6,
  },
  cellText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  task: {
    fontSize: 12,
    marginVertical: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    flex: 1,
    padding: 4,
    fontSize: 12,
    backgroundColor: '#fff',
  },
  urgentImportant: { backgroundColor: '#ffdddd' },
  notUrgentImportant: { backgroundColor: '#ddffdd' },
  urgentNotImportant: { backgroundColor: '#ddddff' },
  notUrgentNotImportant: { backgroundColor: '#f0f0f0' },
});