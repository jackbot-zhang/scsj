// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::redis_client::initial;

mod redis_client;

// Also in main.rs
fn main() {
    tauri::Builder::default()
        // This is where you pass in your commands
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}

#[tauri::command]
fn my_custom_command(
                    address: String,
                    passwd: String,
                    username: String,
                     latitude: String,
                     epicenter: String,
                     update_at: String,
                     inside_net: String,
                     stations: String,
                     event_id: String,
                     updates: String,
                     longitude: String,
                     depth: String,
                     magnitude: String,
                     source_type: String,
                     epi_intensity: String,
                     start_at: String,
) -> Result<(), String> {
    match initial(address,passwd,username,latitude,epicenter,update_at,inside_net,stations,event_id,updates,longitude,depth,magnitude,source_type,epi_intensity,start_at) {
        Ok(_) => {
            Ok(())
        }
        Err(e) => {
            Err(format!("Error:{}", e))
        }
    }
}