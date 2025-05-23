import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import { Task } from '../types/task';

interface TaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'completed'>) => void;
  initialTask?: Partial<Task>;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isVisible,
  onClose,
  onSave,
  initialTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [date, setDate] = useState(new Date());
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);


  useEffect(() => {
    if (isVisible) {
      if (initialTask) {
        setTitle(initialTask.title || '');
        setDescription(initialTask.description || '');
        setPriority(initialTask.priority || 'medium');
        
        // set default time to noon to avoid timezone issues.
        if (initialTask.date) {
          const taskDate = new Date(initialTask.date + 'T12:00:00');
          setDate(taskDate);
        } else {
          const newDate = new Date();
          newDate.setHours(12, 0, 0, 0);
          setDate(newDate);
        }
      } else {
        setTitle('');
        setDescription('');
        setPriority('medium');
        const newDate = new Date();
        newDate.setHours(12, 0, 0, 0);
        setDate(newDate);
      }
    }
  }, [isVisible, initialTask]);

  // Handle task save and format date
  const handleSave = () => {
    // Convert the date to YYYY-MM-DD format without timezone conversion
    const localDateOnly = date.toISOString().split('T')[0];
    
    onSave({
      title,
      description,
      priority,
      date: localDateOnly,
    });
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowAndroidPicker(false);
    if (selectedDate) {
      // Set time to noon to avoid timezone issues
      const localDate = new Date(selectedDate);
      localDate.setHours(12, 0, 0, 0);
      setDate(localDate);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <View style={styles.priorityContainer}>
            <Text style={styles.label}>Priority:</Text>
            <View style={styles.priorityButtons}>
              {(['low', 'medium', 'high'] as const).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityButton,
                    priority === p && styles.selectedPriority,
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text style={[
                    styles.priorityText,
                    priority === p && styles.selectedPriorityText
                  ]}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.label}>Complete by:</Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={date}
                mode="date"
                display="compact"
                onChange={handleDateChange}
                style={styles.iosDatePicker}
              />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowAndroidPicker(true)}
                >
                  <Text style={styles.dateButtonText}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                {showAndroidPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={handleDateChange}
                  />
                )}
              </>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#222',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#222',
  },
  priorityContainer: {
    marginBottom: 15,
  },
  dateContainer: {
    marginBottom: 15,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedPriority: {
    backgroundColor: '#007AFF',
  },
  priorityText: {
    textAlign: 'center',
    color: '#222',
  },
  selectedPriorityText: {
    color: 'white',
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dateButtonText: {
    color: '#222',
  },
  iosDatePicker: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    textAlign: 'center',
    color: '#222',
  },
  saveButtonText: {
    color: 'white',
  },
}); 