const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Constantes
const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/fbT60RqLjEc:APA91bGx0MaXD-MfOfFxJdhOE4Il54w5ULANMsOK8FAiqeENG7Xn74xrf7oHUgNvIO-sTP4oJH39LF6mUz-l2TLdi2X25p72tWUpVqlAUQbG1tirTMG2bp4iE8V4jLoVdn6vaCK7dJD2',
    expirationTime: null,
    keys: {
        p256dh: 'BIQ87A_LyM7KBo0Cm0A67qh6HbeWuzPbIUcBiG48uCnhbQDqeLoqJjAR1f3cYHMdK362vTO8t2HhHja4B1MAv6w',
        auth: 'pbwb4Fecs6YbZpP9sAW1iA'
    }
}

const vapidKeys = {
    publicKey: "BLYcuXnf8jGZolIqjZGbKKIax3TXAXQuAjeOzIsNY2Rhmk2UnRQk73PaXzV8Ol8g8kNFxdBqc-cZSzHbIPcIpmU",
    privateKey: "83b5LM265oQC-YRRAZzA5B-pyRVafk6km9kmRvfbK-Q"
}

webpush.setVapidDetails(
    'mailto:raclunt@mail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

// Routes
app.get('/', async (req, res) => {
    const payload = JSON.stringify({ title: "Titulo de Notificacion", message: "Mensaje de la notifiación" })
    try {
        await webpush.sendNotification(pushSubscription, payload);
        await res.send("Enviado");
    } catch (error) {
        console.log(error)
    }
});

app.post('/subscription', (req, res) => {
    console.log(req.body);
    res.sendStatus(200).json();
})

app.listen(8000, () => console.log('Server listening on port 8000'));