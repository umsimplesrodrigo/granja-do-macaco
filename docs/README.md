# <img src="imagens/macaco-cirugiao-umsimples.png" width="70px"> granja-do-macaco 
Receber temperatura via página web do firebase, que recebe do embarcado no wokwi.
## Components:
- **esp32**
- **led vermelha**
- **transistor 220o**
- **dht22**
- **miniboard**
## Repository
- [Web Monitadorador](https://umsimplesrodrigo.github.io/granja-do-macaco/)
- [Wokwi](https://wokwi.com/projects/425804100764032001)
- [Banco Firebase](https://wokwi.com/projects/425148074290018305)
## 2. C++
## 2.1. Funções e Métodos
- **Entrada e Saída (Serial - Comunicação Serial)**
  - `Serial.begin(115200);` → Inicializa a comunicação serial com baud rate de 115200 bps.
  - `Serial.println(F("Macaco DHT22!"));` → Imprime uma string na serial e pula para a próxima linha.
  - `Serial.print("Conectando ao Wi-Fi");` → Imprime uma string na serial sem pular linha.
  - `Serial.print(".");` → Imprime um ponto na serial (usado na animação de conexão ao Wi-Fi).
  - `Serial.println("\nWi-Fi conectado!");` → Imprime "Wi-Fi conectado!" e pula linha.
  - `Serial.print(F("Umidade: "));` → Usa F() para armazenar strings em flash memory (economiza RAM).
  - `Serial.print(umidade);` → Imprime o valor da variável umidade.
  - `Serial.print(F("% Temperatura: "));` → Imprime uma string e continua na mesma linha.
  - `Serial.print(temperatura);` → Imprime a variável temperatura.
  - `Serial.print("Erro ao enviar temperatura: ");` → Imprime mensagem de erro na serial.
  - `Serial.println(fbdo.errorReason().c_str());` → Imprime o erro retornado pelo Firebase.
- **Controle de Fluxo (if, return)**
  - `if (WiFi.status() != WL_CONNECTED) { ... }` → Verifica se o Wi-Fi está conectado e aguarda.
  - `if (isnan(temperatura) || isnan(umidade)) { ... }` → Verifica se os valores do sensor são válidos (evita erro).
  - `if (Firebase.ready()) { ... }` → Verifica se o Firebase está pronto para enviar dados.
  - `if (Firebase.RTDB.getInt(&fbdo, "controlar-led/led", &ledState)) { ... }` → Obtém um valor do Firebase e, se for bem-sucedido, executa o código.
  - `if (!Firebase.RTDB.setFloat(&fbdo, "dht22-macaco/temperatura", temperatura)) { ... }` → Se não conseguir enviar a temperatura, imprime um erro.
  - `return;` → Interrompe a execução da função loop() caso os valores do sensor sejam inválidos.
- **Manipulação de Variáveis**
  - `float temperatura = dht.readTemperature();` → Declaração e atribuição de variável float.
  - `float umidade = dht.readHumidity();` → Declaração e atribuição de variável float.
  - `int ledState;` → Declaração da variável ledState para armazenar o estado do LED.
- **Funções de Tempo (delay())**
  - `delay(500);` → Aguarda 500ms antes de verificar novamente o status do Wi-Fi.
  - `delay(2000);` → Aguarda 2 segundos antes de coletar uma nova leitura do sensor DHT22.
  - `delay(1000);` → Aguarda 1 segundo antes de enviar dados para o Firebase.
- **Manipulação de Pinos (pinMode(), digitalWrite())**
  - `pinMode(LED, OUTPUT);` → Define o pino 12 como saída (LED).
  - `digitalWrite(LED, ledState);` → Liga ou desliga o LED conforme o valor obtido do Firebase.
## 2.2. Bibliotecas utilizadas
## 2.3. DHT.io
- Lida com sensores de temperatura e umidade da linha DHT (DHT11, DHT22/AM2302, etc.). No nosso caso utilizamos o DHT11.
- Funções utilizadas no projeto:
  - `DHT(pin, type)`: Inicializa o sensor, definindo o pino de entrada e o modelo do sensor.
  - `begin()`: Inicializa a comunicação com o sensor.
  - `readTemperature()`: Retorna a temperatura medida pelo sensor.
  - `readHumidity()`: Retorna a umidade relativa do ar.
## 2.4. Firebase_ESP_Client.h
- Permite conectar um ESP32 ou ESP8266 ao Firebase Realtime Database e ao Firebase Firestore.
- **Objetos e Estruturas utilizadas no projeto:**
  - `FirebaseData fbdo;` → Objeto para gerenciar a comunicação com o Firebase.
  - `FirebaseAuth auth;` → Armazena as credenciais do usuário (e-mail e senha).
  - `FirebaseConfig config;` → Configuração da API Key e URL do Firebase.
- **Funções e Métodos utilizados:**
  - `Firebase.begin(&config, &auth);` → Inicia a conexão com o Firebase usando a configuração e autenticação definidas.
  - `config.api_key = API_KEY;` → Define a chave da API do Firebase.
  - `config.database_url = DATABASE_URL;` → Define a URL do banco de dados Firebase.
  - `auth.user.email = USER_EMAIL;` → Define o e-mail para autenticação no Firebase.
  - `auth.user.password = USER_PASSWORD;` → Define a senha para autenticação no Firebase.
  - `Firebase.ready();` → Verifica se a conexão com o Firebase está pronta.
  - `Firebase.RTDB.getInt(&fbdo, "dht22-macaco/led", &ledState);` → Obtém um valor inteiro do caminho "controlar-led/led" no Firebase.
  - `Firebase.RTDB.setFloat(&fbdo, "dht22-macaco/temperatura", temperatura);` → Envia a temperatura (float) para o Firebase no caminho "dht22-macaco/temperatura".
  - `Firebase.RTDB.setFloat(&fbdo, "dht22-macaco/umidade", umidade);` → Envia a umidade (float) para o Firebase no caminho "dht22-macaco/umidade".
  - `fbdo.errorReason().c_str();` → Retorna a descrição do erro caso ocorra uma falha ao enviar dados para o Firebase.
  - `fbdo.setBSSLBufferSize(1024, 512);` → Ajusta o tamanho do buffer SSL para otimizar a comunicação.
> **Nota:** Apesar de estar funcionando perfeitamente no Wokwi, ainda não conseguimos fazer funcionar 100% no ESP32 físico.

