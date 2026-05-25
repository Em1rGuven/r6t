import './style.css';
import './app.css';

import {GetWords, GetRandomWords, UpdateWordStates, Debugging} from "../wailsjs/go/main/App";
import {Session} from "./session.js";
import {MenuRender} from "./menu";

const app = document.getElementById('app');
export async function QuizPageRender() {
    const questions = await GetWords(Session.userID);
    const options = await GetRandomWords();

    app.innerHTML = `
    <div id="qz-container">
        <div id="qz-header"><span id="qz-progress"></span></div>
        <div id="qz-content">
            <h1 id="qz-word-en"></h1>
            <p id="qz-sentence"></p>
            <div id="qz-options">
                <button id="qz-but-1" class="qz-opt-btn"></button>
                <button id="qz-but-2" class="qz-opt-btn"></button>
                <button id="qz-but-3" class="qz-opt-btn"></button>
            </div>
        </div>
    </div>`;

    let correct = 0;
    const elements = {
        progress: document.getElementById("qz-progress"),
        word: document.getElementById("qz-word-en"),
        sentence: document.getElementById("qz-sentence"),
        btns: [
            document.getElementById("qz-but-1"),
            document.getElementById("qz-but-2"),
            document.getElementById("qz-but-3")
        ]
    };

    for (let i = 0; i < questions.length; i++) {
        const currentBtns = [
            document.getElementById("qz-but-1"),
            document.getElementById("qz-but-2"),
            document.getElementById("qz-but-3")
        ];

        const q = questions[i];
        elements.progress.innerText = `${i + 1} / ${questions.length}`;
        elements.word.innerText = q.English;
        elements.sentence.innerText = q.Sample;

        let choices = [q.Turkish];
        while (choices.length < 3) {
            let rand = options[Math.floor(Math.random() * options.length)];
            if (!choices.includes(rand)) choices.push(rand);
        }
        choices.sort(() => Math.random() - 0.5);

        currentBtns.forEach((btn, idx) => {
            btn.innerText = choices[idx];
            btn.className = "qz-opt-btn";
        });

        const isCorrect = await waitAnswer(currentBtns, q.Turkish);
        if (isCorrect) {
            correct++;
        }
        await UpdateWordStates(Session.userID, q.English, isCorrect);
    }

    const scorePercentage = Math.round((correct / questions.length) * 100);
    app.innerHTML = `
    <div id="qz-result-container">
        <div class="qz-result-card">
            <h2>Quiz Tamamlandı!</h2>
            <div class="qz-stats">
                <div class="qz-stat-item">
                    <span class="label">Toplam Soru</span>
                    <span class="value">${questions.length}</span>
                </div>
                <div class="qz-stat-item">
                    <span class="label">Doğru Cevap</span>
                    <span class="value success">${correct}</span>
                </div>
                <div class="qz-stat-item">
                    <span class="label">Başarı Oranı</span>
                    <span class="value">${scorePercentage}%</span>
                </div>
            </div>
            <button id="qz-retry-btn" class="qz-primary-btn">Menüye Dön</button>
        </div>
    </div>
    `;

    const turnBack = document.getElementById("qz-retry-btn");
    turnBack.addEventListener("click", () => {
        MenuRender();
    })
}

function waitAnswer(btns, correctText) {
    return new Promise((resolve) => {
        btns.forEach(btn => {
            btn.onclick = () => {
                const isCorrect = btn.innerText === correctText;
                btns.forEach(b => {
                    const clone = b.cloneNode(true);
                    b.replaceWith(clone);
                });
                resolve(isCorrect);
            };
        });
    });
}