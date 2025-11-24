import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Slot } from "expo-router";
import BottomNavbar from "../../components/BottomNavBar";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Slot />
      <BottomNavbar></BottomNavbar>
    </SafeAreaView>
  );
}
