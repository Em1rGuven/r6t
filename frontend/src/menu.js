import './style.css';
import './app.css';

import {AddWordRender} from "./addWord.js";
import {QuizPageRender} from "./quiz.js";
import {Session} from "./session.js";
import {ChangeWordCount, Debugging, GetProgression, GetRandomWords} from '../wailsjs/go/main/App';

const app = document.getElementById('app');

export function MenuRender() {
    app.innerHTML = `
        <div class="menu-page-container">
            <div class="menu-page-card">
                <h1>6 Sefer Kelime Tekrar</h1>
                <p>Yapmak istediğiniz işlemi seçin.</p>

                <div class="menu-page-buttons">
                    <button id="menu-add-word-btn" class="menu-page-btn">
                        Kelime Ekle
                    </button>

                    <button id="menu-change-count-btn" class="menu-page-btn">
                        Kelime Sayısını Değiştir
                    </button>

                    <button id="menu-stats-btn" class="menu-page-btn">
                        İstatistikleri Gör
                    </button>

                    <button id="menu-quiz-btn" class="menu-page-btn">
                        Quiz Başlat
                    </button>
                </div>

                <div id="menu-page-message" class="status-message"></div>
            </div>
        </div>
    `;

    const addWordBtn = document.getElementById("menu-add-word-btn");
    const statsBtn = document.getElementById("menu-stats-btn");
    const changeCountBtn = document.getElementById("menu-change-count-btn");
    const quizBtn = document.getElementById("menu-quiz-btn");
    const menuMessage = document.getElementById("menu-page-message");

    addWordBtn.addEventListener("click", () => {
        AddWordRender();
    });

    changeCountBtn.addEventListener("click", () => {
        app.innerHTML = `
        <div class="change-count-container">
            <h3>Tekrar Sayısını Değiştir</h3>
            <input 
                type="number"
                id="change-count-input"
                placeholder="Yeni tekrar sayısı"
                min="1"
            >
            <button id="change-count-submit-btn">
                Gönder
            </button>
            <button id="change-count-back-btn">
                Geri Dön
            </button>
            <p id="change-count-message"></p>
        </div>
        `;
        const countInput = document.getElementById("change-count-input");
        const submitBtn = document.getElementById("change-count-submit-btn");
        const backBtn = document.getElementById("change-count-back-btn");
        const message = document.getElementById("change-count-message");

        submitBtn.addEventListener("click", async () => {
            const count = Number(countInput.value);
            try {
                if (!count || count <= 0) {
                    message.innerText = "Geçerli bir sayı giriniz!";
                    message.style.color = "red";
                    return;
                }
                await ChangeWordCount(count);
                message.innerText = "Tekrar sayısı güncellendi!";
                message.style.color = "green";
                countInput.value = "";

            } catch (err) {
                message.innerText = "Hata oluştu: " + err;
                message.style.color = "red";
            }
        });

        backBtn.addEventListener("click", () => {
            MenuRender();
        });
    });

    statsBtn.addEventListener("click", async () => {
        await Progression();
    });

    quizBtn.addEventListener("click", async () => {
        try {
            QuizPageRender();
        } catch (err) {
            menuMessage.innerText = "Bilinmeyen hata.";
        }
    });
}

async function Progression() {
    app.innerHTML = `
        <div class="progression-page-container">
            <div class="progression-page-card">
                <h2 class="progression-page-title">
                    Öğrenme İstatistikleri
                </h2>
                <div id="progression-loading-text">
                    Veriler yükleniyor...
                </div>
            </div>
        </div>
    `;
    try {
        const progression = await GetProgression(Session.userID);

        const learned = progression.learned;
        const total = progression.total;

        const percentage = total === 0
            ? 0
            : Math.floor((learned / total) * 100);
        app.innerHTML = `
            <div class="progression-page-container">
                <div class="progression-page-card">

                    <h2 class="progression-page-title">
                        Öğrenme İstatistikleri
                    </h2>
                    <div class="progression-stats-wrapper">
                        <div class="progression-stat-box">
                            <span class="progression-stat-label">
                                Öğrenilen Kelime
                            </span>
                            <span class="progression-stat-value">
                                ${learned}
                            </span>
                        </div>
                        <div class="progression-stat-box">
                            <span class="progression-stat-label">
                                Toplam Kelime
                            </span>
                            <span class="progression-stat-value">
                                ${total}
                            </span>
                        </div>
                    </div>
                    <div class="progression-percent-wrapper">
                        <div class="progression-percent-top">
                            <span>Tamamlama Oranı</span>
                            <span>${percentage}%</span>
                        </div>
                        <div class="progression-progressbar-bg">
                            <div 
                                class="progression-progressbar-fill"
                                style="width: ${percentage}%"
                            ></div>
                        </div>
                    </div>
                    <button 
                        id="progression-page-back-btn"
                        class="progression-back-btn"
                    >
                        Geri Dön
                    </button>
                </div>
            </div>
        `;
        const backBtn = document.getElementById("progression-page-back-btn");
        backBtn.addEventListener("click", () => {
            MenuRender();
        });
    } catch (err) {
        app.innerHTML = `
            <div class="progression-page-container">
                <div class="progression-error-card">

                    <h2 class="progression-error-title">
                        Bir Hata Oluştu
                    </h2>

                    <p class="progression-error-message">
                        ${err}
                    </p>

                    <button 
                        id="progression-error-back-btn"
                        class="progression-back-btn"
                    >
                        Geri Dön
                    </button>

                </div>
            </div>
        `;
        const errorBackBtn = document.getElementById("progression-error-back-btn");
        errorBackBtn.addEventListener("click", () => {
            MenuRender();
        });
    }
}