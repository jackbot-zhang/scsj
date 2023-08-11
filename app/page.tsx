'use client'

import React from "react";
import { invoke } from '@tauri-apps/api/tauri'
import './styles.css';

export default function Home() {
    return (
        <main>
            <Form />
        </main>
    )
}

const Form = () => {
    const t = new Date().getTime()
    const [form, setForm] = React.useState({
        address: '127.0.0.1:6379',
        password: '',
        username: 'app',
        latitude: '30.88000',
        epicenter: '四川青白江（测试）',
        updateAt: t.toString(),
        insideNet: '1',
        stations: '3',
        eventID: '',
        updates: '1',
        longitude: '104.35000',
        depth: '10.00000',
        startAt: (t - 3000).toString(),
        magnitude: '3.20000',
        sourceType: "meihuan",
        epiIntensity: '3.4'
    });
    const [msg, setMessage] = React.useState('');
    const handleChange = (event: any) => {
        if (event.target.name === "sourceType") {
            setForm({ ...form, sourceType: event.target.value });
        } else {
            setForm({ ...form, [event.target.id]: event.target.value, });
        }
    };


    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(form.sourceType);
        if (form.eventID === "") {
            setMessage("请填写地震事件ID");
            return;
        }


        invoke('my_custom_command', {
            address: form.address,
            passwd: form.password,
            username: form.username,
            latitude: form.latitude,
            epicenter: form.epicenter,
            updateAt: form.updateAt,
            insideNet: form.insideNet,
            stations: form.stations,
            eventId: form.eventID,
            updates: form.updates,
            longitude: form.longitude,
            depth: form.depth,
            magnitude: form.magnitude,
            sourceType: form.sourceType,
            epiIntensity: form.epiIntensity,
            startAt: form.startAt
        }).then(r => {
            setMessage("提交成功!")
        }).catch(err => {
            setMessage(err.toString())
        }
        )
    };
    const handleGetCurrentTime = () => {
        const currentTime = new Date().getTime();
        setForm({ ...form, updateAt: currentTime.toString(), startAt: (currentTime - 3000).toString() });
    };
    return (
        <div className="page">
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label htmlFor="address">redis_address</label>
                    <input id="address" type="text" value={form.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">redis_password</label>
                    <input id="password" type="text" value={form.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={form.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input id="latitude" type="text" value={form.latitude} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="epicenter">Epicenter</label>
                    <input id="epicenter" type="text" value={form.epicenter} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="updateAt">UpdateAt</label>
                    <input id="updateAt" type="text" value={form.updateAt} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="insideNet">InsideNet</label>
                    <input id="insideNet" type="text" value={form.insideNet} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stations">Stations</label>
                    <input id="stations" type="text" value={form.stations} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="eventID">EventID</label>
                    <input id="eventID" type="text" value={form.eventID} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="updates">Updates</label>
                    <input id="updates" type="text" value={form.updates} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude</label>
                    <input id="longitude" type="text" value={form.longitude} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="depth">Depth</label>
                    <input id="depth" type="text" value={form.depth} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="startAt">StartAt</label>
                    <input id="startAt" type="text" value={form.startAt} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="magnitude">Magnitude</label>
                    <input id="magnitude" type="text" value={form.magnitude} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="sourceType">SourceType</label>
                    <div className="socrce-type">
                        <input name="sourceType" type="radio" value="meihuan" onChange={handleChange} checked={form.sourceType === "meihuan"} />美幻
                        <input name="sourceType" type="radio" value="scdzj" onChange={handleChange} />地震局
                    </div>
                </div>
                <div>
                    <label htmlFor="epiIntensity">EpiIntensity</label>
                    <input id="epiIntensity" type="text" value={form.epiIntensity} onChange={handleChange} />
                </div>
                <div className="btns">
                    <button type="button" onClick={handleGetCurrentTime}>
                        填充当前时间
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p>{msg}</p>
        </div>
    );
};





