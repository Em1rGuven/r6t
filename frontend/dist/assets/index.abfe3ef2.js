(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();function B(e,t){return window.go.main.App.AddSample(e,t)}function f(e,t,s){return window.go.main.App.AddWord(e,t,s)}function w(e){return window.go.main.App.ChangeWordCount(e)}function E(e,t){return window.go.main.App.ForgetPassword(e,t)}function I(e){return window.go.main.App.GetProgression(e)}function k(){return window.go.main.App.GetRandomWords()}function z(e){return window.go.main.App.GetUserID(e)}function q(e){return window.go.main.App.GetWords(e)}function T(e,t,s){return window.go.main.App.UpdateWordStates(e,t,s)}function L(e,t){return window.go.main.App.UserLogin(e,t)}function x(e,t){return window.go.main.App.UserRegister(e,t)}const A=document.getElementById("app");function M(){A.innerHTML=`
        <h3>Yeni Kelime Ekle</h3>
        <input type="text" id="engWord" placeholder="\u0130ngilizce">
        <input type="text" id="turWord" placeholder="T\xFCrk\xE7e">
        <input type="text" id="sample" placeholder="C\xFCmle">
        <button id="wordAddBtn">Kaydet</button>
        <button id="turnBack">Geri D\xF6n</button>
        <p id="result-message"></p>
    `;const e=document.getElementById("engWord"),t=document.getElementById("turWord"),s=document.getElementById("wordAddBtn"),i=document.getElementById("sample"),r=document.getElementById("turnBack"),n=document.getElementById("result-message");s.addEventListener("click",async()=>{const o=e.value.trim(),c=t.value.trim(),a=i.value.trim();if(!o||!c){n.innerText="\u0130ngilizce ve T\xFCrk\xE7e alanlar\u0131 zorunludur!",n.style.color="red";return}try{await f(o,c,"unvalid"),a!==""&&await B(o,a),n.innerText="Kelime ve \xF6rnek ba\u015Far\u0131yla eklendi!",n.style.color="green",e.value="",t.value="",i.value=""}catch(d){n.innerText="\u0130\u015Flem s\u0131ras\u0131nda hata: "+d,n.style.color="red"}}),r.addEventListener("click",async()=>{l()})}const m={userID:-1},b=document.getElementById("app");async function G(){const e=await q(m.userID),t=await k();b.innerHTML=`
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
    </div>`;let s=0;const i={progress:document.getElementById("qz-progress"),word:document.getElementById("qz-word-en"),sentence:document.getElementById("qz-sentence"),btns:[document.getElementById("qz-but-1"),document.getElementById("qz-but-2"),document.getElementById("qz-but-3")]};for(let o=0;o<e.length;o++){const c=[document.getElementById("qz-but-1"),document.getElementById("qz-but-2"),document.getElementById("qz-but-3")],a=e[o];i.progress.innerText=`${o+1} / ${e.length}`,i.word.innerText=a.English,i.sentence.innerText=a.Sample;let d=[a.Turkish];for(;d.length<3;){let u=t[Math.floor(Math.random()*t.length)];d.includes(u)||d.push(u)}d.sort(()=>Math.random()-.5),c.forEach((u,h)=>{u.innerText=d[h],u.className="qz-opt-btn"});const g=await P(c,a.Turkish);g&&s++,await T(m.userID,a.English,g)}const r=Math.round(s/e.length*100);b.innerHTML=`
    <div id="qz-result-container">
        <div class="qz-result-card">
            <h2>Quiz Tamamland\u0131!</h2>
            <div class="qz-stats">
                <div class="qz-stat-item">
                    <span class="label">Toplam Soru</span>
                    <span class="value">${e.length}</span>
                </div>
                <div class="qz-stat-item">
                    <span class="label">Do\u011Fru Cevap</span>
                    <span class="value success">${s}</span>
                </div>
                <div class="qz-stat-item">
                    <span class="label">Ba\u015Far\u0131 Oran\u0131</span>
                    <span class="value">${r}%</span>
                </div>
            </div>
            <button id="qz-retry-btn" class="qz-primary-btn">Men\xFCye D\xF6n</button>
        </div>
    </div>
    `,document.getElementById("qz-retry-btn").addEventListener("click",()=>{l()})}function P(e,t){return new Promise(s=>{e.forEach(i=>{i.onclick=()=>{const r=i.innerText===t;e.forEach(n=>{const o=n.cloneNode(!0);n.replaceWith(o)}),s(r)}})})}const p=document.getElementById("app");function l(){p.innerHTML=`
        <div class="menu-page-container">
            <div class="menu-page-card">
                <h1>6 Sefer Kelime Tekrar</h1>
                <p>Yapmak istedi\u011Finiz i\u015Flemi se\xE7in.</p>

                <div class="menu-page-buttons">
                    <button id="menu-add-word-btn" class="menu-page-btn">
                        Kelime Ekle
                    </button>

                    <button id="menu-change-count-btn" class="menu-page-btn">
                        Kelime Say\u0131s\u0131n\u0131 De\u011Fi\u015Ftir
                    </button>

                    <button id="menu-stats-btn" class="menu-page-btn">
                        \u0130statistikleri G\xF6r
                    </button>

                    <button id="menu-quiz-btn" class="menu-page-btn">
                        Quiz Ba\u015Flat
                    </button>
                </div>

                <div id="menu-page-message" class="status-message"></div>
            </div>
        </div>
    `;const e=document.getElementById("menu-add-word-btn"),t=document.getElementById("menu-stats-btn"),s=document.getElementById("menu-change-count-btn"),i=document.getElementById("menu-quiz-btn"),r=document.getElementById("menu-page-message");e.addEventListener("click",()=>{M()}),s.addEventListener("click",()=>{p.innerHTML=`
        <div class="change-count-container">
            <h3>Tekrar Say\u0131s\u0131n\u0131 De\u011Fi\u015Ftir</h3>
            <input 
                type="number"
                id="change-count-input"
                placeholder="Yeni tekrar say\u0131s\u0131"
                min="1"
            >
            <button id="change-count-submit-btn">
                G\xF6nder
            </button>
            <button id="change-count-back-btn">
                Geri D\xF6n
            </button>
            <p id="change-count-message"></p>
        </div>
        `;const n=document.getElementById("change-count-input"),o=document.getElementById("change-count-submit-btn"),c=document.getElementById("change-count-back-btn"),a=document.getElementById("change-count-message");o.addEventListener("click",async()=>{const d=Number(n.value);try{if(!d||d<=0){a.innerText="Ge\xE7erli bir say\u0131 giriniz!",a.style.color="red";return}await w(d),a.innerText="Tekrar say\u0131s\u0131 g\xFCncellendi!",a.style.color="green",n.value=""}catch(g){a.innerText="Hata olu\u015Ftu: "+g,a.style.color="red"}}),c.addEventListener("click",()=>{l()})}),t.addEventListener("click",async()=>{await W()}),i.addEventListener("click",async()=>{try{G()}catch{r.innerText="Bilinmeyen hata."}})}async function W(){p.innerHTML=`
        <div class="progression-page-container">
            <div class="progression-page-card">
                <h2 class="progression-page-title">
                    \xD6\u011Frenme \u0130statistikleri
                </h2>
                <div id="progression-loading-text">
                    Veriler y\xFCkleniyor...
                </div>
            </div>
        </div>
    `;try{const e=await I(m.userID),t=e.learned,s=e.total,i=s===0?0:Math.floor(t/s*100);p.innerHTML=`
            <div class="progression-page-container">
                <div class="progression-page-card">

                    <h2 class="progression-page-title">
                        \xD6\u011Frenme \u0130statistikleri
                    </h2>
                    <div class="progression-stats-wrapper">
                        <div class="progression-stat-box">
                            <span class="progression-stat-label">
                                \xD6\u011Frenilen Kelime
                            </span>
                            <span class="progression-stat-value">
                                ${t}
                            </span>
                        </div>
                        <div class="progression-stat-box">
                            <span class="progression-stat-label">
                                Toplam Kelime
                            </span>
                            <span class="progression-stat-value">
                                ${s}
                            </span>
                        </div>
                    </div>
                    <div class="progression-percent-wrapper">
                        <div class="progression-percent-top">
                            <span>Tamamlama Oran\u0131</span>
                            <span>${i}%</span>
                        </div>
                        <div class="progression-progressbar-bg">
                            <div 
                                class="progression-progressbar-fill"
                                style="width: ${i}%"
                            ></div>
                        </div>
                    </div>
                    <button 
                        id="progression-page-back-btn"
                        class="progression-back-btn"
                    >
                        Geri D\xF6n
                    </button>
                </div>
            </div>
        `,document.getElementById("progression-page-back-btn").addEventListener("click",()=>{l()})}catch(e){p.innerHTML=`
            <div class="progression-page-container">
                <div class="progression-error-card">

                    <h2 class="progression-error-title">
                        Bir Hata Olu\u015Ftu
                    </h2>

                    <p class="progression-error-message">
                        ${e}
                    </p>

                    <button 
                        id="progression-error-back-btn"
                        class="progression-back-btn"
                    >
                        Geri D\xF6n
                    </button>

                </div>
            </div>
        `,document.getElementById("progression-error-back-btn").addEventListener("click",()=>{l()})}}const y=document.getElementById("app");function v(){y.innerHTML=`
        <div class="login-container">
            <div class="login-card">
                <h2>6 Sefer Kelime Tekrar</h2>
                <p>L\xFCtfen bilgilerinizi girerek devam edin.</p>
                
                <div class="input-group">
                    <input type="text" id="username" placeholder="Kullan\u0131c\u0131 Ad\u0131" required>
                </div>
                <div class="input-group">
                    <input type="text" id="password" placeholder="\u015Eifre" required>
                </div>
                
                
                <button id="loginBtn">Giri\u015F Yap</button>
                <br><br>
                <button id="registerBtn">Kay\u0131t Ol</button>
                <br><br>
                <button id="forgetPasswordBtn">\u015Eifremi Unuttum</button>
                <div id="message" class="status-message"></div>
            </div>
        </div>
    `;const e=document.getElementById("username"),t=document.getElementById("password"),s=document.getElementById("loginBtn"),i=document.getElementById("registerBtn"),r=document.getElementById("forgetPasswordBtn"),n=document.getElementById("message");s.addEventListener("click",async()=>{try{await L(e.value,t.value),n.style.color="green",n.innerText="Giri\u015F ba\u015Far\u0131l\u0131!",m.userID=await z(e.value),l()}catch(o){n.style.color="red",n.innerText="Giri\u015F i\u015Flemi ba\u015Far\u0131s\u0131z! "+o}}),i.addEventListener("click",async()=>{try{await x(e.value,t.value),n.style.color="green",n.innerText="Kay\u0131t ba\u015Far\u0131l\u0131! \u015Eimdi l\xFCtfen giri\u015F yap\u0131n.",e.value="",t.value=""}catch(o){n.style.color="red",n.innerText="Kay\u0131t i\u015Flemi ba\u015Far\u0131s\u0131z! "+o}}),r.addEventListener("click",async()=>{D()})}function D(){y.innerHTML=`
        <div class="login-container">
            <div class="login-card">
                <h2>\u015Eifre S\u0131f\u0131rla</h2>
                <p>Kullan\u0131c\u0131 ad\u0131n\u0131z\u0131 ve yeni \u015Fifrenizi girin.</p>
                
                <div class="input-group">
                    <input type="text" id="resetUsername" placeholder="Kullan\u0131c\u0131 Ad\u0131" required>
                </div>
                <div class="input-group">
                    <input type="text" id="newPassword" placeholder="Yeni \u015Eifre" required>
                </div>
          
                <button id="submitResetBtn">\u015Eifreyi G\xFCncelle</button>
                <br><br>
                <button id="backToLoginBtn" class="secondary-btn">Geri D\xF6n</button>
                <div id="resetMessage" class="status-message"></div>
            </div>
        </div>
    `;const e=document.getElementById("resetUsername"),t=document.getElementById("newPassword"),s=document.getElementById("resetMessage");document.getElementById("submitResetBtn").addEventListener("click",async()=>{try{await E(e.value,t.value),s.style.color="green",s.innerText="\u015Eifre ba\u015Far\u0131yla g\xFCncellendi!",v()}catch(i){s.style.color="red",s.innerText="Hata: "+i}}),document.getElementById("backToLoginBtn").addEventListener("click",()=>{v()})}function K(){v()}K();
