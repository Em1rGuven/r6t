import './style.css';
import './app.css';

import {MenuRender} from './menu.js';
import {Session} from "./session.js";
import {UserLogin, UserRegister, ForgetPassword, GetUserID, Debugging} from '../wailsjs/go/main/App';

const app = document.getElementById('app');
export function RenderLoginPage() {
    app.innerHTML = `
        <div class="login-container">
            <div class="login-card">
                <h2>6 Sefer Kelime Tekrar</h2>
                <p>Lütfen bilgilerinizi girerek devam edin.</p>
                
                <div class="input-group">
                    <input type="text" id="username" placeholder="Kullanıcı Adı" required>
                </div>
                <div class="input-group">
                    <input type="text" id="password" placeholder="Şifre" required>
                </div>
                
                
                <button id="loginBtn">Giriş Yap</button>
                <br><br>
                <button id="registerBtn">Kayıt Ol</button>
                <br><br>
                <button id="forgetPasswordBtn">Şifremi Unuttum</button>
                <div id="message" class="status-message"></div>
            </div>
        </div>
    `;

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const forgetPasswordBtn = document.getElementById('forgetPasswordBtn');
    const message = document.getElementById('message');
    loginBtn.addEventListener('click', async () => {
        try {
            await UserLogin(usernameInput.value, passwordInput.value);
            message.style.color = 'green';
            message.innerText = "Giriş başarılı!";
            Session.userID = await GetUserID(usernameInput.value);
            MenuRender();
        } catch (err) {
            message.style.color = "red";
            message.innerText = "Giriş işlemi başarısız! " + err;
        }
    });

    registerBtn.addEventListener('click', async () => {
        try {
            await UserRegister(usernameInput.value, passwordInput.value);
            message.style.color = 'green';
            message.innerText = "Kayıt başarılı! Şimdi lütfen giriş yapın."
            usernameInput.value = "";
            passwordInput.value = "";
        } catch (err) {
            message.style.color = "red";
            message.innerText = "Kayıt işlemi başarısız! " + err;
        }
    })

    forgetPasswordBtn.addEventListener('click', async () => {
        RenderForgetPassword();
    })
}

function RenderForgetPassword() {
    app.innerHTML = `
        <div class="login-container">
            <div class="login-card">
                <h2>Şifre Sıfırla</h2>
                <p>Kullanıcı adınızı ve yeni şifrenizi girin.</p>
                
                <div class="input-group">
                    <input type="text" id="resetUsername" placeholder="Kullanıcı Adı" required>
                </div>
                <div class="input-group">
                    <input type="text" id="newPassword" placeholder="Yeni Şifre" required>
                </div>
          
                <button id="submitResetBtn">Şifreyi Güncelle</button>
                <br><br>
                <button id="backToLoginBtn" class="secondary-btn">Geri Dön</button>
                <div id="resetMessage" class="status-message"></div>
            </div>
        </div>
    `;

    const resetUsername = document.getElementById('resetUsername');
    const newPassword = document.getElementById('newPassword');
    const resetMessage = document.getElementById('resetMessage');

    document.getElementById('submitResetBtn').addEventListener('click', async () => {
        try {
            await ForgetPassword(resetUsername.value, newPassword.value);
            resetMessage.style.color = 'green';
            resetMessage.innerText = "Şifre başarıyla güncellendi!";
            RenderLoginPage();
        } catch (err) {
            resetMessage.style.color = 'red';
            resetMessage.innerText = "Hata: " + err;
        }
    });

    document.getElementById('backToLoginBtn').addEventListener('click', () => {
        RenderLoginPage();
    });
}