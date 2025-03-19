import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyXCUngiPb610F3ClRGlDJERGMgrKEqzk",
    authDomain: "macaco-led.firebaseapp.com",
    databaseURL: "https://macaco-led-default-rtdb.firebaseio.com",
    projectId: "macaco-led",
    storageBucket: "macaco-led.firebasestorage.app",
    messagingSenderId: "520712162599",
    appId: "1:520712162599:web:01e418dd7500a56d0c2d02",
    measurementId: "G-02YKHV9C9B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const ledRef = ref(db, "dht22-macaco/led");
const tempRef = ref(db, "dht22-macaco/temperatura");
const umiRef = ref(db, "dht22-macaco/umidade");
const tempElement = document.getElementById("temp");
const umiElement = document.getElementById("umi");

let estado_atual;
onValue(ledRef, (snapshot) => {
    if (snapshot.exists()) {
        estado_atual = snapshot.val();
        atualizarBotao(estado_atual);
        console.log("Estado atualizado do Firebase:", estado_atual);
    } else {
        console.log("Cade o snapshot seu bosta?");
    }
}, (error) => {
    console.log("Deu erro krai:", error);
});

function mudarEstado() {
    estado_atual = !estado_atual;
    set(ledRef, estado_atual);
    console.log("Led:", estado_atual);
}

function atualizarBotao(estado_atual) {
    let botao = document.getElementById("botaozin");
    botao.innerText = estado_atual ? "Ligado" : "Desligado";
    botao.style.backgroundColor = estado_atual ? "green" : "red";
}

window.onload = function() {
    document.getElementById("botaozin").addEventListener("click", mudarEstado);
}

onValue(tempRef, (snapshot) => {
    if (snapshot.exists()) {
        const temp = snapshot.val();
        tempElement.textContent = temp;
    } else {
        console.log("Temperatura não encontrada!");
    }
}, (error) => {
    console.error("Erro ao obter temperatura:", error);
});

onValue(umiRef, (snapshot) => {
    if (snapshot.exists()) {
        const umi = snapshot.val();
        umiElement.textContent = umi;
    } else {
        console.log("Umidade não encontrada!");
    }
}, (error) => {
    console.error("Erro ao obter umidade:", error);
});



