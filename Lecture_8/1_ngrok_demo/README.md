# ngrok ile Local Development Server'ı Dışarıya Açma

## 🎯 Amaç

Local development server'ımızı internet üzerinden erişilebilir hale getirmek ve external webhook'ları test etmek.

## 📋 Ön Gereksinimler

- Node.js yüklü olmalı
- Basit bir Express.js uygulaması
- ngrok hesabı (ücretsiz)

## 🚀 Adım 1: Basit Express Server Oluşturma

### package.json

```json
{
  "name": "ngrok-demo",
  "version": "1.0.0",
  "description": "ngrok demo for ITU ACM DevTeam Bootcamp",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### server.js

```javascript
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "ITU ACM DevTeam Bootcamp - ngrok Demo",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

// Webhook endpoint for testing
app.post("/api/webhook", (req, res) => {
  console.log("🎣 Webhook received:", {
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  res.json({
    message: "Webhook received successfully",
    received_data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// User data endpoint
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com" },
    { id: 2, name: "Fatma Demir", email: "fatma@example.com" },
    { id: 3, name: "Mehmet Kaya", email: "mehmet@example.com" },
  ];

  res.json({
    users,
    count: users.length,
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/users`);
  console.log(`   POST http://localhost:${PORT}/api/webhook`);
});
```

### public/index.html

```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ngrok Demo - ITU ACM DevTeam</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        min-height: 100vh;
      }
      .container {
        background: rgba(255, 255, 255, 0.1);
        padding: 30px;
        border-radius: 15px;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      }
      h1 {
        text-align: center;
        margin-bottom: 30px;
      }
      .endpoint {
        background: rgba(255, 255, 255, 0.2);
        padding: 15px;
        margin: 10px 0;
        border-radius: 8px;
        border-left: 4px solid #4caf50;
      }
      .method {
        font-weight: bold;
        color: #4caf50;
      }
      button {
        background: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;
      }
      button:hover {
        background: #45a049;
      }
      #response {
        background: rgba(0, 0, 0, 0.3);
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
        font-family: monospace;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 ngrok Demo - ITU ACM DevTeam Bootcamp</h1>

      <div class="endpoint">
        <span class="method">GET</span> /api/health
        <button onclick="testEndpoint('/api/health')">Test</button>
      </div>

      <div class="endpoint">
        <span class="method">GET</span> /api/users
        <button onclick="testEndpoint('/api/users')">Test</button>
      </div>

      <div class="endpoint">
        <span class="method">POST</span> /api/webhook
        <button onclick="testWebhook()">Test Webhook</button>
      </div>

      <div id="response"></div>
    </div>

    <script>
      async function testEndpoint(endpoint) {
        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          document.getElementById("response").textContent =
            `Response from ${endpoint}:\n${JSON.stringify(data, null, 2)}`;
        } catch (error) {
          document.getElementById("response").textContent =
            `Error: ${error.message}`;
        }
      }

      async function testWebhook() {
        try {
          const testData = {
            event: "test_webhook",
            user_id: 123,
            message: "Hello from ngrok demo!",
            timestamp: new Date().toISOString(),
          };

          const response = await fetch("/api/webhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testData),
          });

          const data = await response.json();
          document.getElementById("response").textContent =
            `Webhook Response:\n${JSON.stringify(data, null, 2)}`;
        } catch (error) {
          document.getElementById("response").textContent =
            `Error: ${error.message}`;
        }
      }
    </script>
  </body>
</html>
```

## 🔧 Adım 2: ngrok Kurulumu ve Kullanımı

### 1. ngrok İndirme ve Kurulum

```bash
# macOS (Homebrew)
brew install ngrok/ngrok/ngrok

# Windows (Chocolatey)
choco install ngrok

# Linux (Snap)
sudo snap install ngrok

# Manuel indirme: https://ngrok.com/download
```

### 2. ngrok Hesabı ve Authtoken

```bash
# ngrok.com'dan ücretsiz hesap oluşturun
# Dashboard'dan authtoken'ınızı alın
ngrok config add-authtoken <your-authtoken>
```

### 3. Server'ı Başlatma

```bash
# Dependencies yükleyin
npm install

# Server'ı başlatın
npm run dev
```

### 4. ngrok ile Tunnel Oluşturma

```bash
# Yeni terminal açın ve ngrok'u başlatın
ngrok http 3000

# Çıktı örneği:
# Session Status    online
# Account           your-email@example.com
# Version           3.x.x
# Region            Europe (eu)
# Forwarding        https://abc123.ngrok.io -> http://localhost:3000
# Forwarding        http://abc123.ngrok.io -> http://localhost:3000
```

## 🧪 Test Senaryoları

### 1. Temel Test

- ngrok URL'ini tarayıcıda açın: `https://abc123.ngrok.io`
- Ana sayfa yüklendiğini kontrol edin

### 2. API Endpoint Test

```bash
# Health check
curl https://abc123.ngrok.io/api/health

# Users endpoint
curl https://abc123.ngrok.io/api/users

# Webhook test
curl -X POST https://abc123.ngrok.io/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data", "from": "external_service"}'
```

### 3. External Webhook Test

- Webhook.site gibi servisleri kullanarak webhook endpoint'inizi test edin
- Discord, Slack webhook'larını test edin
- GitHub webhook'larını test edin

## 📱 Mobil Test

- ngrok URL'ini mobil cihazınızda açın
- Responsive design'ı test edin
- Network koşullarını test edin

## 🔍 ngrok Web Interface

- `http://127.0.0.1:4040` adresinden ngrok web interface'ine erişin
- Request/response loglarını inceleyin
- Traffic analizi yapın

## 💡 İpuçları ve Best Practices

### 1. Environment Variables

```javascript
// ngrok URL'ini environment variable olarak kullanın
const NGROK_URL = process.env.NGROK_URL || "http://localhost:3000";
```

### 2. Webhook Debugging

```javascript
// Webhook loglarını detaylı tutun
app.post("/api/webhook", (req, res) => {
  console.log("🎣 Webhook Details:", {
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
    query: req.query,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  // Response'u hızlı gönderin
  res.status(200).json({ received: true });
});
```

### 3. CORS Configuration

```javascript
// ngrok URL'ini CORS'a ekleyin
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://*.ngrok.io", // ngrok subdomain'lerini allow et
    ],
  })
);
```

## ⚠️ Güvenlik Uyarıları

- ngrok URL'lerini public olarak paylaşmayın
- Sensitive data içeren endpoint'leri koruyun
- Production'da ngrok kullanmayın
- Tunnel'ı kullanım sonrası kapatın

## 🎯 Kullanım Alanları

1. **Webhook Development**: External service integration
2. **Mobile Testing**: Local app'i mobil cihazda test
3. **Client Demo**: Müşteriye local development gösterme
4. **API Testing**: External API client'larla test
5. **Collaboration**: Takım arkadaşlarıyla paylaşım
