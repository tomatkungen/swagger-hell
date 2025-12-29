use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader, Write};
use std::sync::{Arc, Mutex};
use tauri::{Manager};
use tauri::Emitter;
use std::env;


// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn start_node(app: tauri::AppHandle) -> Result<(), String> {
    // Command::new("node")
    // .arg("node_server.js") // path to your node script

    let currentfilepath = env::current_dir()
        .unwrap()
        .join("bin")
        .join("inter-process-communication-aarch64-apple-darwin");

    println!("CWD1: {:?}", currentfilepath);

    let mut child = Command::new(currentdir)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;

    let stdout = child.stdout.take().unwrap();
    let stderr = child.stderr.take().unwrap();
    let stdin = Arc::new(Mutex::new(child.stdin.take().unwrap()));

    // Read stdout
    let app_stdout = app.clone();
    std::thread::spawn(move || {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            if let Ok(line) = line {
                app_stdout.emit("node:stdout", line).ok();
            }
        }
    });

    // Read stderr
    let app_stderr = app.clone();
    std::thread::spawn(move || {
        let reader = BufReader::new(stderr);
        for line in reader.lines() {
            if let Ok(line) = line {
                app_stderr.emit("node:stderr", line).ok();
            }
        }
    });

    // Store stdin so frontend can send messages
    app.manage(stdin);

    Ok(())
}

#[tauri::command]
fn send_to_node(
    state: tauri::State<Arc<Mutex<std::process::ChildStdin>>>,
    message: String,
) -> Result<(), String> {
    let mut stdin = state.lock().unwrap();
    writeln!(stdin, "{}", message).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, start_node, send_to_node])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
