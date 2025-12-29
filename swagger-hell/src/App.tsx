import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const handleStart = async () => {
    try {
      await invoke('start_node');

      listen("node:stdout", (event) => {
        console.log("Node stdout:", event.payload);
      });

      listen("node:stderr", (event) => {
        console.error("Node stderr:", event.payload);
      });
    } catch (e) {
      console.log('handleStartError: ', e);
    }
  }

  const handleSend = async () => {
    try {

      const res = await invoke('send_to_node', { message: JSON.stringify({"query":"query ($a:Int!,$b:Int!){ add(a:$a,b:$b) }","variables":{"a":5,"b":2}}) })
      console.log('result', res);
    } catch (e) {
      console.log('handleSendError: ', e);
    }
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button onClick={handleStart}>start</button>
        <button onClick={handleSend}>send</button>
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
