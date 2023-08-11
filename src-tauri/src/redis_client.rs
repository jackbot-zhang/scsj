use redis::Commands;

pub fn initial(
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

               ) -> redis::RedisResult<()> {
    let addr = format!("redis://{}/", address);
    let client = redis::Client::open(addr)?;
    let mut con = client.get_connection()?;

    let _: () = con.xadd("earlywarning", "*", &[
        ("Username", username),
        ("Latitude", latitude),
        ("Epicenter", epicenter),
        ("UpdateAt", update_at),
        ("InsideNet", inside_net),
        ("Stations", stations),
        ("EventID", event_id),
        ("Updates", updates),
        ("Longitude", longitude),
        ("Depth", depth),
        ("StartAt", start_at),
        ("Magnitude", magnitude),
        ("SourceType", source_type),
        ("EpiIntensity", epi_intensity),
    ])?;
    Ok(())
}

