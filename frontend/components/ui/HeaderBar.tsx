import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export default function HeaderBar({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#af1111ff',
  },
  title: {
    fontSize: 20,
    color: '#1890ff',
    fontWeight: 'bold',
  },
});