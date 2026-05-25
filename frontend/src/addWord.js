import './style.css';
import './app.css';

import {AddWord, AddSample} from '../wailsjs/go/main/App';
import {MenuRender} from "./menu.js";

const app = document.getElementById('app');
export function AddWordRender() {
    app.innerHTML = `
        <h3>Yeni Kelime Ekle</h3>
        <input type="text" id="engWord" placeholder="İngilizce">
        <input type="text" id="turWord" placeholder="Türkçe">
        <input type="text" id="sample" placeholder="Cümle">
        <button id="wordAddBtn">Kaydet</button>
        <button id="turnBack">Geri Dön</button>
        <p id="result-message"></p>
    `;
    const engInput = document.getElementById("engWord");
    const turInput = document.getElementById("turWord");
    const addBtn = document.getElementById("wordAddBtn");
    const sampleInput = document.getElementById("sample");
    const turnBtn = document.getElementById("turnBack");
    const message = document.getElementById("result-message");

    addBtn.addEventListener("click", async () => {
        const eng = engInput.value.trim();
        const tur = turInput.value.trim();
        const sample = sampleInput.value.trim();
        if (!eng || !tur) {
            message.innerText = "İngilizce ve Türkçe alanları zorunludur!";
            message.style.color = "red";
            return;
        }

        try {
            await AddWord(eng, tur, "unvalid");
            if (sample !== "") {
                await AddSample(eng, sample);
            }
            message.innerText = "Kelime ve örnek başarıyla eklendi!";
            message.style.color = "green";
            engInput.value = "";
            turInput.value = "";
            sampleInput.value = "";
        } catch (err) {
            message.innerText = "İşlem sırasında hata: " + err;
            message.style.color = "red";
        }
    });

    turnBtn.addEventListener("click", async () => {
        MenuRender();
    })
}