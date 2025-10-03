# Lecture 8: Deployment & Production Ready Applications

## 📚 Ders İçeriği ve Detaylı Anlatım

---

## 1. Giriş: Deployment Nedir ve Neden Önemlidir?

### 1.1 Development vs Production Ortamları

**Development (Geliştirme) Ortamı:**

- Yazılımcıların kod yazdığı ve test ettiği ortam
- Hatalar göz ardı edilebilir, debug tools açık
- Detaylı hata mesajları ve loglar
- Hızlı reload, hot module replacement
- Test verileri kullanılır
- Güvenlik kontrolü minimum

**Production (Canlı) Ortamı:**

- Gerçek kullanıcıların uygulamaya eriştiği ortam
- Hatalar kritik, downtime kabul edilemez
- Hata mesajları genel ve güvenli
- Optimizasyon maksimum
- Gerçek veriler kullanılır
- Güvenlik maksimum seviyede

```
┌────────────────────────────────────────────────────────────────┐
│                    Web Development Lifecycle                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │              │      │              │      │              │  │
│  │  Development │ ───> │   Testing    │ ───> │  Production  │  │
│  │  (Local)     │      │  (Staging)   │      │  (Live)      │  │
│  │              │      │              │      │              │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│                                                                │
│  localhost:3000        staging.app.com       www.app.com       │
│  Debug Mode ON         Pre-production        Optimized         │
│  Test Data             Real-like Data        Real Data         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 1.2 Deployment Süreci Nedir?

Deployment, yazdığınız kodun development ortamından production ortamına taşınması sürecidir. Bu süreç şunları içerir:

1. **Build Process**: Kodun optimize edilmesi
   - Minification (kod boyutunu küçültme)
   - Bundling (dosyaları birleştirme)
   - Transpiling (modern kodu eski tarayıcılar için çevirme)
   - Asset optimization (resim, CSS optimizasyonu)

2. **Configuration**: Ortam ayarları
   - Environment variables
   - Database connections
   - API keys ve secrets
   - CORS settings

3. **Deployment**: Canlıya alma
   - Server'a kod yükleme
   - Dependencies kurma
   - Service başlatma
   - Health check

4. **Monitoring**: İzleme
   - Performance monitoring
   - Error tracking
   - User analytics
   - Uptime monitoring

```
┌────────────────────────────────────────────────────────────────┐
│                      Deployment Pipeline                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Developer                                                     │
│     │                                                          │
│     │ git push                                                 │
│     ▼                                                          │
│  ┌─────────┐                                                   │
│  │   Git   │  (GitHub, GitLab, Bitbucket)                      │
│  │ Repo    │                                                   │
│  └────┬────┘                                                   │
│       │                                                        │
│       │ webhook trigger                                        │
│       ▼                                                        │
│  ┌─────────┐                                                   │
│  │  CI/CD  │  - Run Tests                                      │
│  │ Pipeline│  - Build Application                              │
│  │         │  - Create Artifacts                               │
│  └────┬────┘                                                   │
│       │                                                        │
│       │ deploy                                                 │
│       ▼                                                        │
│  ┌─────────┐                                                   │
│  │Production│ - Serve Users                                    │
│  │ Server  │ - Monitor & Log                                   │
│  └─────────┘                                                   │
│       │                                                        │
│       ▼                                                        │
│   End Users                                                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 1.3 Neden Deployment Önemlidir?

**Kullanıcı Deneyimi:**

- Hızlı yükleme süreleri
- Stabil ve güvenilir çalışma
- 7/24 erişilebilirlik
- Dünya çapında erişim

**İş Değeri:**

- Ürünü pazara sunma
- Kullanıcı geri bildirimi alma
- Revenue generation
- Brand visibility

**Teknik Faydalar:**

- Scalability (ölçeklenebilirlik)
- Reliability (güvenilirlik)
- Maintainability (bakım kolaylığı)
- Security (güvenlik)

---

## 2. Deployment Türleri ve Platform Seçenekleri

### 2.1 Geleneksel Hosting

**Shared Hosting** (Paylaşımlı Barındırma)

```
┌───────────────────────────────────┐
│        Shared Server              │
├───────────────────────────────────┤
│  Website A | Website B | Website C│
│  (Yours)   | (Other)  | (Other)   │
│                                   │
│  Shared: CPU, RAM, Storage        │
│  - Cheap ($5-20/month)            │
│  - Limited control                │
│  - Performance varies             │
└───────────────────────────────────┘
```

**Avantajlar:**

- Ucuz ve kolay başlangıç
- cPanel gibi kullanıcı dostu arayüzler
- FTP ile dosya yükleme

**Dezavantajlar:**

- Sınırlı kaynaklar
- Düşük performans
- Esneklik yok
- Modern framework desteği zayıf

**VPS (Virtual Private Server)**

```
┌───────────────────────────────────┐
│      Physical Server              │
├───────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐         │
│  │  VPS 1  │  │  VPS 2  │         │
│  │ (Yours) │  │ (Other) │         │
│  │         │  │         │         │
│  │Dedicated│  │Dedicated│         │
│  │Resources│  │Resources│         │
│  └─────────┘  └─────────┘         │
│                                   │
│  - More control ($20-100/month)   │
│  - SSH access                     │
│  - Custom configuration           │
└───────────────────────────────────┘
```

**Avantajlar:**

- Daha fazla kontrol
- SSH erişimi
- Root access
- Özelleştirme özgürlüğü

**Dezavantajlar:**

- Server yönetimi gerekli
- Linux/Unix bilgisi şart
- Security updates sizin sorumluluğunuz
- Setup karmaşık

### 2.2 Cloud Platforms

**IaaS (Infrastructure as a Service)**

- AWS EC2, Google Compute Engine, Azure VM
- En fazla kontrol, en fazla sorumluluk
- Server'ı sıfırdan kurarsınız

```
┌────────────────────────────────────────┐
│         AWS / GCP / Azure              │
├────────────────────────────────────────┤
│                                        │
│  You Manage:                           │
│  ├─ Operating System                   │
│  ├─ Runtime (Node.js, Python)          │
│  ├─ Application Code                   │
│  ├─ Security Updates                   │
│  └─ Scaling Configuration              │
│                                        │
│  Provider Manages:                     │
│  ├─ Physical Hardware                  │
│  ├─ Networking                         │
│  └─ Data Center                        │
│                                        │
└────────────────────────────────────────┘
```

**PaaS (Platform as a Service)**

- Heroku, Vercel, Netlify, Railway
- Az kontrol, az sorumluluk
- Kod yazar, push edersiniz, çalışır

```
┌────────────────────────────────────────┐
│      Vercel / Netlify / Heroku         │
├────────────────────────────────────────┤
│                                        │
│  You Manage:                           │
│  └─ Application Code                   │
│                                        │
│  Provider Manages:                     │
│  ├─ Operating System                   │
│  ├─ Runtime Environment                │
│  ├─ Build Process                      │
│  ├─ Deployment                         │
│  ├─ Scaling                            │
│  ├─ SSL Certificates                   │
│  ├─ CDN                                │
│  └─ Security Updates                   │
│                                        │
└────────────────────────────────────────┘
```

### 2.3 Platform Karşılaştırması

| Özellik               | Shared Hosting | VPS        | Cloud (IaaS) | PaaS       |
| --------------------- | -------------- | ---------- | ------------ | ---------- |
| **Fiyat**             | $5-20/ay       | $20-100/ay | $50-500+/ay  | $0-100/ay  |
| **Setup Kolaylığı**   | ⭐⭐⭐⭐⭐     | ⭐⭐       | ⭐           | ⭐⭐⭐⭐⭐ |
| **Kontrol**           | ⭐             | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐   | ⭐⭐       |
| **Scalability**       | ⭐             | ⭐⭐       | ⭐⭐⭐⭐⭐   | ⭐⭐⭐⭐   |
| **Maintenance**       | Easy           | Hard       | Very Hard    | Very Easy  |
| **Modern Frameworks** | ❌             | ✅         | ✅           | ✅         |
| **Auto SSL**          | ✅             | ❌         | ❌           | ✅         |
| **Git Integration**   | ❌             | ❌         | ❌           | ✅         |

**Önerimiz Başlangıç İçin:**

- **Frontend (React, Vue, Vite)**: Vercel, Netlify
- **Backend (Node.js, Python)**: Vercel, Railway, Heroku
- **Full-Stack**: Vercel (Frontend + Serverless Functions)
- **Learning**: PaaS platformlar (Vercel, Netlify)

---

## 3. Static vs Dynamic Applications

### 3.1 Static Sites (Statik Siteler)

**Ne Demek?**

- HTML, CSS, JavaScript dosyalarından oluşur
- Server-side işlem yok
- Her kullanıcı aynı içeriği görür
- CDN'den servis edilir

```
┌──────────────────────────────────────────┐
│         Static Site Architecture         │
├──────────────────────────────────────────┤
│                                          │
│  Build Time:                             │
│  ┌──────────┐         ┌──────────┐       │
│  │  Source  │  Build  │  Static  │       │
│  │  Files   │  ─────> │  Files   │       │
│  │ (React)  │  (Vite) │ (HTML/JS)│       │
│  └──────────┘         └──────────┘       │
│                            │             │
│                            │ Upload      │
│                            ▼             │
│                       ┌──────────┐       │
│                       │   CDN    │       │
│                       └────┬─────┘       │
│                            │             │
│  Request Time:             │             │
│     User ─────────────────>│             │
│     User <─────────────────┘             │
│     (HTML, CSS, JS)                      │
│                                          │
│  Avantajlar:                             │
│  ✓ Çok hızlı (CDN)                       │
│  ✓ Güvenli (no server)                   │
│  ✓ Ucuz ($0-20/month)                    │
│  ✓ Sınırsız scale                        │
│                                          │
└──────────────────────────────────────────┘
```

**Örnekler:**

- Portfolio siteleri
- Blog'lar
- Documentation siteleri
- Landing pages
- Marketing siteleri

**Popüler Static Site Generators:**

- Vite + React
- Next.js (Static Export)
- Gatsby
- Hugo, Jekyll

### 3.2 Dynamic Applications (Dinamik Uygulamalar)

**Ne Demek?**

- Server-side işlem var
- Database bağlantısı
- Her kullanıcıya özel içerik
- Authentication, Authorization

```
┌──────────────────────────────────────────┐
│      Dynamic Application Architecture    │
├──────────────────────────────────────────┤
│                                          │
│  Request Time:                           │
│                                          │
│     User Request                         │
│         │                                │
│         ▼                                │
│    ┌─────────┐                           │
│    │  Server │ <──> Database             │
│    │(Node.js)│                           │
│    └────┬────┘                           │
│         │                                │
│         │ Processes:                     │
│         │ - Authentication               │
│         │ - Database Query               │
│         │ - Business Logic               │
│         │ - Generate Response            │
│         ▼                                │
│     User Response                        │
│                                          │
│  Avantajlar:                             │
│  ✓ User-specific content                 │
│  ✓ Real-time data                        │
│  ✓ Complex interactions                  │
│  ✓ Database operations                   │
│                                          │
│  Dezavantajlar:                          │
│  ✗ Daha yavaş                            │
│  ✗ Daha pahalı                           │
│  ✗ Scaling zor                           │
│  ✗ Security risks                        │
│                                          │
└──────────────────────────────────────────┘
```

**Örnekler:**

- E-commerce siteleri
- Social media
- Dashboard'lar
- SaaS applications
- Real-time chat

### 3.3 Hybrid Approach (JAMstack)

**JAMstack = JavaScript + APIs + Markup**

Modern yaklaşım: Static + Dynamic'in en iyisi

```
┌──────────────────────────────────────────┐
│         JAMstack Architecture            │
├──────────────────────────────────────────┤
│                                          │
│  Frontend (Static)                       │
│  ┌────────────────┐                      │
│  │  Vercel/Netlify│ <── CDN              │
│  │  React/Vite    │                      │
│  └───────┬────────┘                      │
│          │                               │
│          │ API Calls                     │
│          │                               │
│          ▼                               │
│  Backend APIs                            │
│  ┌────────────────┐                      │
│  │  Vercel        │                      │
│  │  Serverless    │ <──> Database        │
│  │  Functions     │                      │
│  └────────────────┘                      │
│                                          │
│  Avantajlar:                             │
│  ✓ Frontend hızlı (static)               │
│  ✓ Backend güçlü (APIs)                  │
│  ✓ Best of both worlds                   │
│                                          │
└──────────────────────────────────────────┘
```

**Bizim Yaklaşımımız:**

- Frontend: Vite + React → Vercel
- Backend: Express API → Vercel Serverless
- Database: Postgres Cloud

---

## 4. Production Ready Application

### 4.1 Environment Configuration

**Environment Variables Neden Önemli?**

❌ **YANLIŞ:**

```javascript
// Kodda hardcoded (GÜVENLİK RİSKİ!)
const dbPassword = "mySecretPassword123";
const apiKey = "sk_live_51abc123...";
```

✅ **DOĞRU:**

```javascript
// Environment variable kullan
const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;
```

**Environment Separation:**

```
┌─────────────────────────────────────────────────┐
│           Environment Variables                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Development (.env.local)                       │
│  ┌────────────────────────────────────┐         │
│  │ PORT=3000                          │         │
│  │ DB_URL=randomhost.postgres.app     │         │
│  │ API_URL=http://localhost:5000      │         │
│  │ DEBUG=true                         │         │
│  │ LOG_LEVEL=verbose                  │         │
│  └────────────────────────────────────┘         │
│                                                 │
│  Production (Vercel Dashboard)                  │
│  ┌────────────────────────────────────┐         │
│  │ PORT=80                            │         │
│  │ DB_URL=randomhost.postgres.app     │         │
│  │ API_URL=https://api.myapp.com      │         │
│  │ DEBUG=false                        │         │
│  │ LOG_LEVEL=error                    │         │
│  └────────────────────────────────────┘         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Örnek Configuration:**

```javascript
// config.js
const config = {
  development: {
    port: 3000,
    database: {
      url: "randomhost.postgres.app",
      options: {
        useNewUrlParser: true,
        autoIndex: true, // Build indexes
      },
    },
    cors: {
      origin: "*", // Allow all in development
      credentials: true,
    },
    logging: {
      level: "debug",
      prettyPrint: true,
    },
  },

  production: {
    port: process.env.PORT || 80,
    database: {
      url: process.env.DATABASE_URL,
      options: {
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes in production
      },
    },
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    logging: {
      level: "error",
      prettyPrint: false,
    },
  },
};

const env = process.env.NODE_ENV || "development";
module.exports = config[env];
```

### 4.2 Security Considerations (Güvenlik)

**1. HTTPS (SSL/TLS)**

```
HTTP (Güvensiz):
User ──────[Plain Text]──────> Server
     <─────[Plain Text]────────

HTTPS (Güvenli):
User ──────[Encrypted]──────> Server
     <─────[Encrypted]────────

✓ Vercel otomatik HTTPS sağlar
✓ Let's Encrypt ücretsiz SSL
```

**2. CORS (Cross-Origin Resource Sharing)**

```javascript
// ❌ YANLIŞ: Herkese izin
app.use(cors({ origin: "*" }));

// ✅ DOĞRU: Sadece frontend domain'e izin
app.use(
  cors({
    origin: ["https://myapp.vercel.app", "https://www.myapp.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

**3. Environment Variables**

```javascript
// ❌ YANLIŞ
const apiKey = "sk_live_51abc123..."; // Git'e gider!

// ✅ DOĞRU
const apiKey = process.env.STRIPE_API_KEY;
```

**4. Rate Limiting**

```javascript
// Basit rate limiting
const rateLimit = new Map();

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 dakika
  const maxRequests = 100; // 15 dakikada max 100 request

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const userLimit = rateLimit.get(ip);

  if (now > userLimit.resetTime) {
    userLimit.count = 1;
    userLimit.resetTime = now + windowMs;
    return next();
  }

  if (userLimit.count >= maxRequests) {
    return res.status(429).json({
      error: "Too many requests",
      retryAfter: Math.ceil((userLimit.resetTime - now) / 1000),
    });
  }

  userLimit.count++;
  next();
};

app.use("/api/", rateLimitMiddleware);
```

**5. Input Validation**

```javascript
// ❌ YANLIŞ: Input direkt kullanılır
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // XSS, SQL Injection risk!
  db.query(`INSERT INTO users VALUES ('${name}', '${email}')`);
});

// ✅ DOĞRU: Input validate et
const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  // Name validation
  if (!name || name.length < 2 || name.length > 50) {
    return res.status(400).json({ error: "Invalid name" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  next();
};

app.post("/api/users", validateUser, (req, res) => {
  // Güvenli kod
});
```

### 4.3 Performance Optimization

**1. Frontend Optimization**

```
Build Size Optimization:
┌────────────────────────────────────┐
│  Before:                           │
│  bundle.js ────── 2.5 MB           │
│                                    │
│  After Optimization:               │
│  vendor.js ────── 500 KB (cached)  │
│  main.js ──────── 150 KB           │
│  utils.js ─────── 50 KB            │
│  Total: 700 KB (70% reduction!)    │
└────────────────────────────────────┘
```

**Vite Configuration:**

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          utils: ["axios", "lodash"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },
});
```

**2. Image Optimization**

```
┌──────────────────────────────────────┐
│  Image Optimization Strategy         │
├──────────────────────────────────────┤
│                                      │
│  Original:  hero.jpg ── 5 MB         │
│                                      │
│  Optimized:                          │
│  - hero-small.webp ─── 50 KB         │
│  - hero-medium.webp ── 150 KB        │
│  - hero-large.webp ─── 300 KB        │
│                                      │
│  98% size reduction!                 │
│                                      │
└──────────────────────────────────────┘
```

**3. Caching Strategy**

```javascript
// Backend: Cache headers
app.get("/api/static-data", (req, res) => {
  res.set({
    "Cache-Control": "public, max-age=3600", // 1 saat cache
    ETag: generateETag(data),
  });
  res.json(data);
});

// Frontend: In-memory cache
const cache = new Map();

const fetchWithCache = async (url, ttl = 300000) => {
  const cached = cache.get(url);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetch(url).then((r) => r.json());
  cache.set(url, { data, timestamp: Date.now() });

  return data;
};
```

### 4.4 Error Handling & Monitoring

**Error Handling Architecture:**

```
┌─────────────────────────────────────────────┐
│         Error Handling Flow                 │
├─────────────────────────────────────────────┤
│                                             │
│  User Action                                │
│     │                                       │
│     ▼                                       │
│  Try/Catch                                  │
│     │                                       │
│     ├──> Success ──> Response               │
│     │                                       │
│     └──> Error                              │
│          │                                  │
│          ├──> Log to Console/File           │
│          ├──> Send to Error Tracking        │
│          │    (Sentry, LogRocket)           │
│          ├──> Notify Developer              │
│          └──> User-friendly Error Message   │
│                                             │
└─────────────────────────────────────────────┘
```

**Örnek Error Handling:**

```javascript
// Backend: Global error handler
app.use((err, req, res, next) => {
  // 1. Log error
  console.error({
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // 2. Send to error tracking service
  if (process.env.NODE_ENV === "production") {
    // Sentry.captureException(err);
  }

  // 3. User-friendly response
  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    timestamp: new Date().toISOString(),
  });
});

// Frontend: Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    // Send to error tracking
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }
    return this.props.children;
  }
}
```

---

## 5. Debug Deployment

### 5.1 ngrok - Local Development Tunneling

**Ne İşe Yarar?**

- Local development server'ınızı internete açar
- Webhook testing için ideal
- Mobil cihazdan test için mükemmel
- Client'a demo göstermek için kullanılır

```
┌──────────────────────────────────────────────┐
│          ngrok Architecture                  │
├──────────────────────────────────────────────┤
│                                              │
│  Your Computer:                              │
│  ┌────────────────┐                          │
│  │ localhost:3000 │                          │
│  └────────┬───────┘                          │
│           │                                  │
│           │ ngrok tunnel                     │
│           ▼                                  │
│  ┌────────────────┐                          │
│  │     ngrok      │                          │
│  │   (client)     │                          │
│  └────────┬───────┘                          │
│           │                                  │
│           │ encrypted tunnel                 │
│           │                                  │
│  Internet │                                  │
│  ═════════╪═══════════════════════           │
│           │                                  │
│           ▼                                  │
│  ┌────────────────┐                          │
│  │ ngrok servers  │                          │
│  │ (cloud)        │                          │
│  └────────┬───────┘                          │
│           │                                  │
│           │ https://abc123.ngrok.io          │
│           ▼                                  │
│  External Users                              │
│  Mobile Devices                              │
│  Webhooks                                    │
│                                              │
└──────────────────────────────────────────────┘
```

**Kullanım Adımları:**

1. **Kurulum:**

```bash
# macOS
brew install ngrok

# veya manual download
# https://ngrok.com/download
```

2. **Auth Token Setup:**

```bash
# ngrok.com'dan hesap oluştur
# Dashboard'dan auth token al
ngrok config add-authtoken YOUR_TOKEN
```

3. **Server Başlat:**

```bash
# Local server'ınızı başlatın
npm run dev
# Server çalışıyor: localhost:3000
```

4. **ngrok Tunnel Aç:**

```bash
# Yeni terminal aç
ngrok http 3000

# Output:
# Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

5. **Test Et:**

- Tarayıcıda https://abc123.ngrok.io aç
- Mobil cihazdan eriş
- Webhook URL olarak kullan

**Use Cases:**

- 📱 Mobil cihazdan test
- 🔗 Webhook development (GitHub, Stripe, Discord)
- 👥 Client'a demo
- 🤝 Pair programming

### 5.2 Vercel - Frontend & Backend Deployment

**Vercel Nedir?**

- Frontend deployment için #1 platform
- Next.js'in yaratıcıları
- Otomatik HTTPS, CDN, Git integration
- Serverless functions için mükemmel

```
┌──────────────────────────────────────────────┐
│         Vercel Deployment Flow               │
├──────────────────────────────────────────────┤
│                                              │
│  Step 1: Code Push                           │
│  Developer ──git push──> GitHub              │
│                                              │
│  Step 2: Auto Trigger                        │
│  GitHub ──webhook──> Vercel                  │
│                                              │
│  Step 3: Build                               │
│  Vercel:                                     │
│  ├─ Install dependencies                     │
│  ├─ Run build command                        │
│  ├─ Optimize assets                          │
│  └─ Generate static files                    │
│                                              │
│  Step 4: Deploy                              │
│  ├─ Upload to CDN (Global)                   │
│  ├─ Generate unique URL                      │
│  └─ Update production                        │
│                                              │
│  Step 5: Live!                               │
│  https://your-app.vercel.app                 │
│                                              │
│  Total Time: ~30 seconds!                    │
│                                              │
└──────────────────────────────────────────────┘
```

**Vercel Frontend Deployment - Adım Adım:**

**1. Projeyi Hazırla:**

```bash
# Vite projesi oluştur
npm create vite@latest my-app -- --template react
cd my-app
npm install

# Test et
npm run dev
```

**2. Git Repository Oluştur:**

```bash
git init
git add .
git commit -m "Initial commit"

# GitHub'da repo oluştur, sonra:
git remote add origin https://github.com/username/my-app.git
git push -u origin main
```

**3. Vercel'e Deploy Et:**

- vercel.com'a git
- "Import Project" tıkla
- GitHub repository seç
- Framework: Vite
- Deploy tıkla
- ✅ Bitti! 30 saniyede live

**4. Environment Variables Ekle:**

```bash
# Vercel Dashboard:
# Project Settings → Environment Variables

VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=My App
```

**5. Custom Domain (Opsiyonel):**

```bash
# Vercel Dashboard:
# Project Settings → Domains
# Add: www.myapp.com

# DNS ayarlarını yap
# Hazır
```

**Vercel Backend (Serverless Functions) - Adım Adım:**

**1. Proje Yapısı:**

```
my-backend/
├── package.json
├── vercel.json          # Vercel config
├── index.js             # Ana dosya
└── api/                 # Serverless functions (opsiyonel)
    ├── hello.js
    └── users.js
```

**2. vercel.json Oluştur:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

**3. index.js:**

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from Vercel!" });
});

app.get("/api/users", (req, res) => {
  res.json({ users: ["Alice", "Bob"] });
});

// Export for Vercel
module.exports = app;

// Local development
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}
```

**4. Deploy:**

```bash
git add .
git commit -m "Add backend"
git push

# Vercel otomatik deploy eder!
```

**Vercel'in Avantajları:**

- ✅ Otomatik HTTPS
- ✅ Global CDN
- ✅ Git integration
- ✅ Preview deployments (PR preview)
- ✅ Instant rollback
- ✅ Analytics
- ✅ Ücretsiz plan (hobby)

**Vercel Limitations:**

- ⚠️ Serverless function timeout: 10s (free), 60s (pro)
- ⚠️ Memory limit: 1024MB
- ⚠️ Read-only filesystem
- ⚠️ Cold starts (ilk request yavaş)

---

## 6. Deployment Best Practices

### 6.1 Deployment Checklist

**Pre-Deployment:**

```
□ Kod testi yapıldı mı?
  └─ Unit tests
  └─ Integration tests
  └─ E2E tests

□ Environment variables ayarlandı mı?
  └─ Development .env.local
  └─ Production Vercel Dashboard

□ Security check yapıldı mı?
  └─ No hardcoded secrets
  └─ CORS configured
  └─ Rate limiting added
  └─ Input validation

□ Performance optimize edildi mi?
  └─ Bundle size checked
  └─ Images optimized
  └─ Caching implemented
  └─ Lazy loading added

□ Error handling var mı?
  └─ Try/catch blocks
  └─ Error boundaries
  └─ User-friendly messages

□ Monitoring ayarlandı mı?
  └─ Error tracking
  └─ Analytics
  └─ Performance monitoring
```

**Post-Deployment:**

```
□ Smoke test
  └─ Ana sayfalar çalışıyor mu?
  └─ API endpoints respond ediyor mu?
  └─ Database connection OK mi?

□ Monitor logs
  └─ Error logs kontrol et
  └─ Performance metrics bak
  └─ User behavior analiz et

□ Rollback planı var mı?
  └─ Vercel'de bir tıkla rollback
  └─ Önceki version hazırda

□ Documentation güncel mi?
  └─ README updated
  └─ Deployment steps documented
  └─ Environment variables listed
```

### 6.2 Common Deployment Issues & Solutions

**Problem 1: Build Fails**

```
Error: Module not found: Can't resolve 'axios'
```

**Solution:**

```bash
# package.json'da dependencies kontrol et
# Local'de çalışıyorsa ama production'da fail ediyorsa:
npm install axios --save  # Not --save-dev!
git add package.json package-lock.json
git commit -m "Fix: Add axios to dependencies"
git push
```

**Problem 2: Environment Variables Not Working**

```
Error: process.env.API_URL is undefined
```

**Solution:**

```bash
# Frontend (Vite):
# .env dosyasında VITE_ prefix kullan
VITE_API_URL=https://api.com  # ✅ Doğru
API_URL=https://api.com        # ❌ Yanlış

# Vercel Dashboard'da ekle
# Settings → Environment Variables
```

**Problem 3: CORS Error**

```
Access to fetch at 'https://api.com' from origin 'https://myapp.com'
has been blocked by CORS policy
```

**Solution:**

```javascript
// Backend'de CORS ekle
const cors = require("cors");
app.use(
  cors({
    origin: ["https://myapp.vercel.app", "https://www.myapp.com"],
    credentials: true,
  })
);
```

### 6.3 Monitoring & Debugging

**Monitoring Tools:**

```
┌──────────────────────────────────────────┐
│      Production Monitoring Stack         │
├──────────────────────────────────────────┤
│                                          │
│  Error Tracking:                         │
│  └─ Sentry                               │
│                                          │
│  Performance:                            │
│  └─ Vercel Analytics, Lighthouse         │
│                                          │
│  Uptime:                                 │
│  └─ Betterstack, Pingdom                 │
│                                          │
│  User Analytics:                         │
│  └─ Google Analytics, Mixpanel           │
│                                          │
└──────────────────────────────────────────┘
```

---

**Deployment:**

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

**Best Practices:**

- [12 Factor App](https://12factor.net/)
- [Web.dev](https://web.dev/)
- [MDN Web Docs](https://developer.mozilla.org)

**Security:**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com)

**Performance:**

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org)

---
