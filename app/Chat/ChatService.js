import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

// TU IP CORRECTA
const API_URL = 'http://10.10.54.97:5000/chatHub'; 

class ChatService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(API_URL)
      .configureLogging(LogLevel.Information)
      .build();
  }

  async connect() {
    try {
      if (this.connection.state === 'Disconnected') {
        await this.connection.start();
        console.log(" Conectado a SignalR");
      }
    } catch (err) {
      console.log(" Error conectando:", err);
    }
  }

  async sendMessage(userName, text) {
    try {
      await this.connection.invoke("SendMessage", userName, text);
    } catch (err) {
      console.error("Error enviando:", err);
    }
  }

  onReceiveMessage(callback) {
    this.connection.on("ReceiveMessage", (user, message) => {
      callback({ user, message });
    });
  }
}

export default new ChatService();