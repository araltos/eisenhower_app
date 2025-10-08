import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function MatrixScreen() {
  const [tasks, setTasks] = useState({
    urgentImportant: [] as string[],        // Q1 → Do Now
    notUrgentImportant: [] as string[],     // Q2 → Plan Next
    urgentNotImportant: [] as string[],     // Q3 → Delegate
    notUrgentNotImportant: [] as string[],  // Q4 → Eliminate
  });

  const [newTask, setNewTask] = useState('');
  const [activeQuadrant, setActiveQuadrant] = useState<null | keyof typeof tasks>(null);

  const [editingTask, setEditingTask] = useState<{ quadrant: keyof typeof tasks; index: number } | null>(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (!newTask || !activeQuadrant) return;
    setTasks(prev => ({
      ...prev,
      [activeQuadrant]: [...prev[activeQuadrant], newTask.trim()],
    }));
    setNewTask('');
    setActiveQuadrant(null);
  };

  const deleteTask = (quadrant: keyof typeof tasks, index: number) => {
    setTasks(prev => {
      const updated = [...prev[quadrant]];
      updated.splice(index, 1);
      return { ...prev, [quadrant]: updated };
    });
  };

  const startEditing = (quadrant: keyof typeof tasks, index: number, text: string) => {
    setEditingTask({ quadrant, index });
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editingTask) return;
    setTasks(prev => {
      const updated = [...prev[editingTask.quadrant]];
      updated[editingTask.index] = editText.trim();
      return { ...prev, [editingTask.quadrant]: updated };
    });
    setEditingTask(null);
    setEditText('');
  };

  const renderTask = (quadrant: keyof typeof tasks, item: string, index: number) => {
    const isEditing = editingTask?.quadrant === quadrant && editingTask.index === index;
    return (
      <View style={styles.taskRow}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              placeholder="Edit task..."
            />
            <Button title="Save" onPress={saveEdit} />
          </>
        ) : (
          <>
            <Text style={styles.task}>{'• '}{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEditing(quadrant, index, item)}>
                <Text style={styles.edit}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(quadrant, index)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  const quadrantMeta: Record<keyof typeof tasks, { title: string; subtitle: string; style: any; addLabel: string }> = {
    urgentImportant: {
      title: 'Do Now',
      subtitle: 'Critical tasks with deadlines',
      style: styles.q1,
      addLabel: 'Add task',
    },
    notUrgentImportant: {
      title: 'Plan Next',
      subtitle: 'Long‑term, high‑value work',
      style: styles.q2,
      addLabel: 'Schedule it',
    },
    urgentNotImportant: {
      title: 'Delegate',
      subtitle: 'Time‑sensitive but low‑value for you',
      style: styles.q3,
      addLabel: 'Assign it',
    },
    notUrgentNotImportant: {
      title: 'Eliminate',
      subtitle: 'Distractions and low‑value tasks',
      style: styles.q4,
      addLabel: 'Park (review later)',
    },
  };

  const renderQuadrant = (key: keyof typeof tasks) => {
    const meta = quadrantMeta[key];
    return (
      <View style={[styles.cell, meta.style]}>
        <Text style={styles.title}>{meta.title}</Text>
        <Text style={styles.subtitle}>{meta.subtitle}</Text>

        <FlatList
          data={tasks[key]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => renderTask(key, item, index)}
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
          <Button title={`+ ${meta.addLabel}`} onPress={() => setActiveQuadrant(key)} />
        )}
      </View>
    );
  };

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
            {renderQuadrant('urgentImportant')}
            {renderQuadrant('notUrgentImportant')}
          </View>
          <View style={styles.row}>
            {renderQuadrant('urgentNotImportant')}
            {renderQuadrant('notUrgentNotImportant')}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff', padding: 6 },
  container: { flex: 1, flexDirection: 'row' },
  row: { flex: 1, flexDirection: 'row' },

  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 8,
    margin: 3,
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },

  // Titles and subtitles (clear hierarchy)
  title: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 2 },
  subtitle: { fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 8 },

  // Task row and controls
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  task: { fontSize: 13, flex: 1 },
  actions: { flexDirection: 'row', marginLeft: 6 },
  edit: { marginHorizontal: 6, fontSize: 14 },
  delete: { marginHorizontal: 6, fontSize: 14, color: 'red' },

  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    flex: 1,
    padding: 6,
    fontSize: 13,
    borderRadius: 6,
    backgroundColor: '#fff',
  },

  // Psychology-backed colors (bg = light; border = strong accent)
  q1: { backgroundColor: '#FFE9E9', borderColor: '#FF6B6B' }, // Do Now (red/orange urgency)
  q2: { backgroundColor: '#E7FAF7', borderColor: '#2EC4B6' }, // Plan Next (calm green/teal)
  q3: { backgroundColor: '#E7F0FF', borderColor: '#3A86FF' }, // Delegate (trust blue)
  q4: { backgroundColor: '#F2F3F5', borderColor: '#9AA0A6' }, // Eliminate (neutral gray)

  // Axis labels
  topLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 6,
  },
  sideLabels: {
    justifyContent: 'space-around',
    paddingRight: 6,
  },
  axisLabel: { fontWeight: 'bold', fontSize: 14 },
  axisLabelVertical: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    transform: [{ rotate: '-90deg' }],
  },
});