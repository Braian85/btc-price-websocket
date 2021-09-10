import "./styles.css";
import { useState } from "react";

export default function App() {
  // Create WebSocket connection.

  const [data, setData] = useState(0);

  console.log("Inicio");
  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c1q16m2ad3icph06u4eg"
  );

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
    );
    socket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    //  if (typeof event.data !== "undefined") {
    try {
      const data = JSON.parse(event.data).data[0];
      const { p } = data;
      console.log("Message from server ", p);
      setData(p);
    } catch (error) {
      console.log(error);
    }
  });

  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  return (
    <div className="App">
      <h1>BTCUSDT</h1>
      <h1>{data}</h1>
    </div>
  );
}
