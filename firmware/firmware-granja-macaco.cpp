#include <DHT.h>
#include <Firebase_ESP_Client.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define API_KEY "AIzaSyDyXCUngiPb610F3ClRGlDJERGMgrKEqzk"
#define DATABASE_URL "https://macaco-led-default-rtdb.firebaseio.com"
#define USER_EMAIL "umsimplesti@gmail.com"
#define USER_PASSWORD "MacacoCirugiao*"
#define DHTPIN 13
#define DHTTYPE DHT22
#define LED 12

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  Serial.println(F("Macaco DHT22!"));
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  // while (WiFi.status() != WL_CONNECTED) delay(300);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
  Serial.print(".");
  delay(500);
  }
  Serial.println("\nWi-Fi conectado!");

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  config.cert.data = nullptr;
  fbdo.setBSSLBufferSize(1024, 512);

  dht.begin();

  pinMode(LED, OUTPUT);
}

void loop() {
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Conserta essa bosta ai namoral!");
    return;
  }

  Serial.print(F("Umidade: "));
  Serial.print(umidade);
  Serial.print(F("% Temperatura: "));
  Serial.print(temperatura);
  delay(2000);

  if (Firebase.ready()) {
    int ledState;
    if (Firebase.RTDB.getInt(&fbdo, "controlar-led/led", &ledState)) {
      digitalWrite(LED, ledState);
    }
  }
  delay(1000);

  if (!Firebase.RTDB.setFloat(&fbdo, "dht22-macaco/temperatura", temperatura)) {
      Serial.print("Erro ao enviar temperatura: ");
      Serial.println(fbdo.errorReason().c_str());
  }


    if (!Firebase.RTDB.setFloat(&fbdo, "dht22-macaco/umidade", umidade)) {
      Serial.print("Erro ao enviar umidade: ");
      Serial.println(fbdo.errorReason().c_str());
  }
  delay(1000);
}



























