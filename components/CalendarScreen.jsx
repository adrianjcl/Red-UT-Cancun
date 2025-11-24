import React, { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, Button, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Cargar eventos guardados
  useEffect(() => {
    AsyncStorage.getItem("events").then((data) => {
      if (data) setEvents(JSON.parse(data));
    });
  }, []);

  // Guardar eventos cada vez que cambian
  useEffect(() => {
    AsyncStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!selectedDate || !title || !start || !end) return;

    const newEvent = {
      id: Date.now().toString(),
      title,
      start,
      end
    };

    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEvent]
    }));

    setModalVisible(false);
    setTitle("");
    setStart("");
    setEnd("");
  };

  const deleteEvent = (eventId) => {
    setEvents((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter((e) => e.id !== eventId)
    }));
  };

  const marked = {};
  Object.keys(events).forEach((date) => {
    marked[date] = { marked: true, dotColor: "blue" };
  });

  if (selectedDate) {
    marked[selectedDate] = { selected: true, selectedColor: "#4F6DF5" };
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={marked}
        theme={{
          selectedDayBackgroundColor: "#4F6DF5",
          todayTextColor: "#4F6DF5"
        }}
      />

      {selectedDate && (
        <View style={styles.eventsContainer}>
          <Text style={styles.dateTitle}>Eventos del {selectedDate}</Text>

          <FlatList
            data={events[selectedDate] || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventTime}>
                  {item.start} - {item.end}
                </Text>
                <TouchableOpacity onPress={() => deleteEvent(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Button title="Agregar Evento" onPress={() => setModalVisible(true)} />
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Evento</Text>
            <TextInput
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Hora inicio (HH:mm)"
              value={start}
              onChangeText={setStart}
              style={styles.input}
            />
            <TextInput
              placeholder="Hora fin (HH:mm)"
              value={end}
              onChangeText={setEnd}
              style={styles.input}
            />

            <Button title="Guardar" onPress={addEvent} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  eventsContainer: {
    flex: 1,
    padding: 16
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8
  },
  eventCard: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600"
  },
  eventTime: {
    fontSize: 14,
    color: "#333"
  },
  deleteBtn: {
    marginTop: 6,
    padding: 6,
    backgroundColor: "#ff5555",
    borderRadius: 5,
    alignSelf: "flex-start"
  },
  deleteText: {
    color: "white",
    fontWeight: "600"
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000088"
  },
  modalContent: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 12
  }
});
