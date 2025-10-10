# Lecture 9: Blockchain Fundamentals & Hackathon Strategies

## 📚 Ders İçeriği ve Detaylı Anlatım

---

## 1. Blockchain Temelleri: Giriş

### 1.1 Blockchain Nedir?

**Basit Tanım:**

Blockchain (blok zinciri), verilerin birbirine bağlı bloklar halinde, değiştirilemez ve şeffaf bir şekilde saklandığı dağıtık bir veri tabanı teknolojisidir.

```
┌────────────────────────────────────────────────────────────┐
│              Traditional Database vs Blockchain            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Traditional Database (Centralized):                       │
│  ┌──────────────────────────────┐                          │
│  │      Central Server          │                          │
│  │   ┌──────────────────┐       │                          │
│  │   │  User A: $1000   │       │                          │
│  │   │  User B: $500    │       │                          │
│  │   │  User C: $2000   │       │                          │
│  │   └──────────────────┘       │                          │
│  └──────────────────────────────┘                          │
│         │                                                  │
│         │ Tek nokta kontrolü                               │
│         │ Değiştirilebilir                                 │
│         │ Merkezi otorite gerekli                          │
│                                                            │
│  Blockchain (Decentralized):                               │
│  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐              │
│  │Node 1│────│Node 2│────│Node 3│────│Node 4│              │
│  └───┬──┘    └───┬──┘    └───┬──┘    └───┬──┘              │
│      │           │           │           │                 │
│      └───────────┴───────────┴───────────┘                 │
│                  │                                         │
│           Aynı veri kopyası                                │
│           (Distributed Ledger)                             │
│                                                            │
│  Avantajları:                                              │
│  ✓ Tek bir noktada değişiklik yapılamaz                    │
│  ✓ Şeffaf - Herkes görebilir                               │
│  ✓ Merkezi otoriteye ihtiyaç yok                           │
│  ✓ Değiştirilemez (Immutable)                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 1.2 Blockchain Nasıl Çalışır?

**Block (Blok) Yapısı:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Block Anatomy                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Block #1234                                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Block Header:                                        │  │
│  │  ├─ Block Number: 1234                                │  │
│  │  ├─ Timestamp: 2025-10-10 10:30:45                    │  │
│  │  ├─ Previous Hash: 0x7a8f9c...                        │  │
│  │  ├─ Current Hash: 0x4b2e1d...                         │  │
│  │  └─ Nonce: 847259                                     │  │
│  │                                                       │  │
│  │  Block Data (Transactions):                           │  │
│  │  ├─ Alice → Bob: 0.5 ETH                              │  │
│  │  ├─ Charlie → Dave: 1.2 ETH                           │  │
│  │  └─ Eve → Frank: 0.8 ETH                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Chain (Zincir) Yapısı:**

```
┌──────────────────────────────────────────────────────────────┐
│                    Blockchain Chain                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐      ┌─────────┐      ┌─────────┐               │
│  │ Block 1 │      │ Block 2 │      │ Block 3 │               │
│  ├─────────┤      ├─────────┤      ├─────────┤               │
│  │Hash:    │      │Hash:    │      │Hash:    │               │
│  │0x1a2b.. │      │0x3c4d.. │      │0x5e6f.. │               │
│  │         │      │         │      │         │               │
│  │Prev:    │──┐   │Prev:    │──┐   │Prev:    │               │
│  │Genesis  │  │   │0x1a2b.. │  │   │0x3c4d.. │               │
│  │         │  │   │         │  │   │         │               │
│  │Data:    │  │   │Data:    │  │   │Data:    │               │
│  │Tx1, Tx2 │  │   │Tx3, Tx4 │  │   │Tx5, Tx6 │               │
│  └─────────┘  │   └─────────┘  │   └─────────┘               │
│               │                │                             │
│               └────────────────┘                             │
│                                                              │
│  Her blok, önceki bloğun hash'ini içerir                     │
│  Bu sayede zincir değiştirilemez hale gelir                  │
│                                                              │
│  Değiştirme denemesi:                                        │
│  ❌ Block 2'yi değiştirirsen → Hash değişir                  │
│     → Block 3'ün Prev Hash'i uyuşmaz                         │
│     → Zincir kırılır → Değişiklik reddedilir                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 1.3 Temel Konseptler

**Hash Function (Kriptografik Hash):**

```
┌────────────────────────────────────────────────────────┐
│              Hash Function (SHA-256)                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Input (Any size):                                     │
│  "Alice sends 1 BTC to Bob"                            │
│         │                                              │
│         ▼                                              │
│  ┌─────────────┐                                       │
│  │  SHA-256    │                                       │
│  │  Function   │                                       │
│  └─────────────┘                                       │
│         │                                              │
│         ▼                                              │
│  Output (Fixed 256 bits):                              │
│  2ef7bde608ce5404e97d5f042f95f89f...                   │
│                                                        │
│  Özellikler:                                           │
│  ✓ Aynı input → Her zaman aynı output                  │
│  ✓ Küçük değişiklik → Tamamen farklı output            │
│  ✓ Output'tan input bulunamaz (one-way)                │
│                                                        │
│  Örnek:                                                │
│  hash("hello")  → 2cf24dba5fb0a30e26e83b2ac5b9e29e...  │
│  hash("hello1") → 0b4e7a0e5fe84ad35fb5f95b9ceeac79...  │
│  (Tamamen farklı!)                                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Mining (Madencilik) & Proof of Work:**

```
┌────────────────────────────────────────────────────────────┐
│                  Mining Process                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Hedef: Hash değeri belirli bir sayıda sıfır ile başlasın  │
│         (Örnek: 0000abcd1234...)                           │
│                                                            │
│  Miner'ın İşi:                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │  Block Data + Nonce → Hash                       │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│  Deneme 1:                                                 │
│  Block Data + Nonce(0) → Hash: 9a3f2b... ❌ Başarısız      │
│                                                            │
│  Deneme 2:                                                 │
│  Block Data + Nonce(1) → Hash: 7c5d8e... ❌ Başarısız      │
│                                                            │
│  ...                                                       │
│                                                            │
│  Deneme 847259:                                            │
│  Block Data + Nonce(847259) → Hash: 0000a1b2... ✅ Buldu!  │
│                                                            │
│  Ödül:                                                     │
│  - Bitcoin: ~6.25 BTC                                      │
│  - Ethereum (eski): ~2 ETH                                 │
│  - Transaction fees                                        │
│                                                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Consensus Mechanisms (Mutabakat Mekanizmaları):**

```
┌──────────────────────────────────────────────────────────────┐
│            Consensus Mechanisms Comparison                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Proof of Work (PoW):                                        │
│  ─────────────────────────────────────────                   │
│  En çok hesaplama gücü olan kazanır                          │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                  │
│  │ Miner 1  │   │ Miner 2  │   │ Miner 3  │                  │
│  │ Hash:    │   │ Hash:    │   │ Hash:    │                  │
│  │ 100 TH/s │   │ 150 TH/s │   │ 200 TH/s │◄─ Kazanır        │
│  └──────────┘   └──────────┘   └──────────┘                  │
│                                                              │
│  ✓ Güvenli (51% saldırısı çok pahalı)                        │
│  ✗ Enerji tüketimi çok yüksek                                │
│  Örnek: Bitcoin, Ethereum (eski)                             │
│                                                              │
│  Proof of Stake (PoS):                                       │
│  ─────────────────────────────────────────                   │
│  En çok stake eden kazanır (rastgele seçim)                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                  │
│  │Validator1│   │Validator2│   │Validator3│                  │
│  │ Stake:   │   │ Stake:   │   │ Stake:   │                  │
│  │ 32 ETH   │   │ 100 ETH  │   │ 500 ETH  │◄─ Daha yüksek    │
│  │          │   │          │   │          │   şans           │
│  └──────────┘   └──────────┘   └──────────┘                  │
│                                                              │
│  ✓ Enerji verimli (%99.95 daha az)                           │
│  ✓ Daha hızlı transaction                                    │
│  Örnek: Ethereum 2.0, Cardano, Solana                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Ethereum & Smart Contracts

### 2.1 Ethereum Nedir?

**Bitcoin vs Ethereum:**

```
┌────────────────────────────────────────────────────────────┐
│              Bitcoin vs Ethereum                           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Bitcoin:                                                  │
│  ┌────────────────────────────────────────────┐            │
│  │  "Digital Gold" - Dijital Para             │            │
│  │                                            │            │
│  │  Kullanım:                                 │            │
│  │  - Para transferi                          │            │
│  │  - Değer saklama                           │            │
│  │                                            │            │
│  │  Dil: Bitcoin Script (sınırlı)             │            │
│  │  Hız: ~7 transaction/second                │            │
│  │  Block Time: ~10 dakika                    │            │
│  │  Gas Fee: $1-50 (yoğunluğa göre)           │            │
│  └────────────────────────────────────────────┘            │
│                                                            │
│  Ethereum (Layer 1):                                       │
│  ┌────────────────────────────────────────────┐            │
│  │  "World Computer" - Dünya Bilgisayarı      │            │
│  │                                            │            │
│  │  Kullanım:                                 │            │
│  │  - Para transferi (ETH)                    │            │
│  │  - Smart Contracts (Akıllı Sözleşmeler)    │            │
│  │  - Decentralized Apps (dApps)              │            │
│  │  - NFT, DeFi, DAO, Gaming...               │            │
│  │                                            │            │
│  │  Dil: Solidity (Turing complete)           │            │
│  │  Hız: ~15 transaction/second               │            │
│  │  Block Time: ~12 saniye                    │            │
│  │  Gas Fee: $5-100 (yoğunluğa göre)          │            │
│  └────────────────────────────────────────────┘            │
│                                                            │
│  Ethereum Layer 2 (Scaling Solutions):                     │
│  ┌────────────────────────────────────────────┐            │
│  │  Base, Optimism, Arbitrum, zkSync          │            │
│  │                                            │            │
│  │  Avantajlar:                               │            │
│  │  ✓ Çok daha hızlı (~2000 tx/s)             │            │
│  │  ✓ Çok daha ucuz ($0.01-0.10 gas fee)      │            │
│  │  ✓ Ethereum güvenliği (L1'e bağlı)         │            │
│  │  ✓ Aynı Solidity kodları çalışır           │            │
│  │                                            │            │
│  │  - Hackathon'larda popüler!                │            │
│  └────────────────────────────────────────────┘            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 2.2 Smart Contracts (Akıllı Sözleşmeler)

**Smart Contract Nedir?**

Smart contract, blockchain üzerinde otomatik olarak çalışan, değiştirilemez programlardır.

```
┌────────────────────────────────────────────────────────────┐
│           Traditional Contract vs Smart Contract           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Traditional Contract (Geleneksel Sözleşme):               │
│  ┌──────────────────────────────────────────────────┐      │
│  │  1. Alice ve Bob anlaşma yapar                   │      │
│  │  2. Kağıt imzalanır                              │      │
│  │  3. Alice evi Bob'a kiralar                      │      │
│  │  4. Bob her ay kira ödemek zorunda               │      │
│  │  5. Problem: Bob ödemedi mi?                     │      │
│  │     → Mahkemeye git (pahalı, yavaş)              │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│  Smart Contract (Akıllı Sözleşme):                         │
│  ┌──────────────────────────────────────────────────┐      │
│  │  1. Sözleşme kod olarak yazılır                  │      │
│  │  2. Blockchain'e deploy edilir                   │      │
│  │  3. Otomatik çalışır:                            │      │
│  │     IF (kira ödendi)                             │      │
│  │       THEN (ev erişimi aç)                       │      │
│  │     ELSE (ev erişimi kapat)                      │      │
│  │  4. Değiştirilemez, şeffaf, otomatik             │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│  Avantajlar:                                               │
│  ✓ Otomatik (aracıya gerek yok)                            │
│  ✓ Güvenilir (kod değiştirilemez)                          │
│  ✓ Şeffaf (herkes görebilir)                               │
│  ✓ Hızlı (saniyeler içinde)                                │
│  ✓ Ucuz (lawyer, noter yerine gas fee)                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Smart Contract Çalışma Mantığı:**

```
┌────────────────────────────────────────────────────────────┐
│              Smart Contract Execution Flow                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. Deploy:                                                │
│  Developer ──[Deploy Contract]──> Ethereum                 │
│              Gas Fee: ~$50                                 │
│                                                            │
│              Contract Address: 0x742d35Cc6634...           │
│                                                            │
│  2. Interaction:                                           │
│  User A ──[transfer(UserB, 100)]──> Contract               │
│           Gas Fee: ~$5                                     │
│                                                            │
│           Contract çalışır:                                │
│           - User A'nın bakiyesi kontrol edilir             │
│           - 100 token User A'dan User B'ye transfer edilir │
│           - Event emit edilir                              │
│           - State blockchain'de güncellenir                │
│                                                            │
│                                                            │
│  Not: Read işlemleri ücretsiz, Write işlemleri gas gerekir │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 2.3 Solidity Temelleri

**Solidity Syntax - Hızlı Bakış:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Todo List Smart Contract
 * Blockchain üzerinde çalışan bir todo uygulaması
 */
contract TodoList {
    // Struct (Veri yapısı)
    struct Todo {
        uint id;
        string content;
        bool completed;
        address owner;
        uint createdAt;
    }

    // State variables
    mapping(uint => Todo) public todos;
    uint public todoCount = 0;

    // Events
    event TodoCreated(uint id, string content, address owner);
    event TodoCompleted(uint id);

    // Modifiers (Erişim kontrolü)
    modifier onlyOwner(uint _id) {
        require(todos[_id].owner == msg.sender, "Sadece sahibi yapabilir");
        _;
    }

    // Functions

    // Todo oluştur
    function createTodo(string memory _content) public {
        todoCount++;
        todos[todoCount] = Todo({
            id: todoCount,
            content: _content,
            completed: false,
            owner: msg.sender,
            createdAt: block.timestamp
        });

        emit TodoCreated(todoCount, _content, msg.sender);
    }

    // Todo'yu tamamla
    function toggleTodo(uint _id) public onlyOwner(_id) {
        Todo storage todo = todos[_id];
        todo.completed = !todo.completed;

        if (todo.completed) {
            emit TodoCompleted(_id);
        }
    }

    // Todo'yu oku
    function getTodo(uint _id) public view returns (
        uint, string memory, bool, address, uint
    ) {
        Todo memory todo = todos[_id];
        return (
            todo.id,
            todo.content,
            todo.completed,
            todo.owner,
            todo.createdAt
        );
    }

    // Tüm todo'ları say
    function getTodoCount() public view returns (uint) {
        return todoCount;
    }
}
```

**Solidity Temel Tipler:**

```solidity
// Value Types
bool public myBool = true;
uint public myUint = 123; // unsigned integer (0'dan büyük)
int public myInt = -123; // signed integer (negatif olabilir)
address public myAddress = 0x742d35Cc6634C0532925a3b844Bc454e4438f44e;
bytes32 public myBytes = "hello"; // sabit boyutlu

// Reference Types
string public myString = "Hello World";
uint[] public myArray; // dynamic array
mapping(address => uint) public balances; // key-value

// Struct
struct Person {
    string name;
    uint age;
}
```

**Gas & Gas Fee:**

```
┌────────────────────────────────────────────────────────────┐
│                  Gas Fee Calculation                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Gas: İşlem yapmak için gereken "yakıt"                    │
│                                                            │
│  Transaction Fee = Gas Used × Gas Price                    │
│                                                            │
│  Örnek:                                                    │
│  ┌──────────────────────────────────────────────────┐      │
│  │ Gas Used: 50,000                                 │      │
│  │ Gas Price: 50 Gwei (0.00000005 ETH)              │      │
│  │                                                  │      │
│  │ Total Fee = 50,000 × 50 Gwei                     │      │
│  │           = 0.0025 ETH                           │      │
│  │           ≈ $5 (ETH = $2000 ise)                 │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│                                                            │
│  Gas Optimization:                                         │
│  ✓ Gereksiz loop'lardan kaçın                              │
│  ✓ Batch işlemler yapın                                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Web3 Development: Blockchain ile Uygulama Geliştirme

### 3.1 Web3 Stack

**Modern Web3 Application Architecture:**

```
┌────────────────────────────────────────────────────────────┐
│              Web3 Full Stack Architecture                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Frontend (User Interface):                                │
│  ┌──────────────────────────────────────────────────┐      │
│  │  React / Next.js / Vue                           │      │
│  │  ├─ UI Components                                │      │
│  │  ├─ State Management (Zustand, Redux)            │      │
│  │  └─ Styling (Tailwind, MUI)                      │      │
│  └────────────────┬─────────────────────────────────┘      │
│                   │                                        │
│  Web3 Layer:      │                                        │
│  ┌────────────────▼─────────────────────────────────┐      │
│  │  Web3.js / Ethers.js                             │      │
│  │  ├─ Blockchain interaction                       │      │
│  │  ├─ Wallet connection - Metamask en populer      │      │
│  │  ├─ Contract calls                               │      │
│  │  └─ Transaction signing                          │      │
│  └────────────────┬─────────────────────────────────┘      │
│                   │                                        │
│  Blockchain:      │                                        │
│  ┌────────────────▼─────────────────────────────────┐      │
│  │  Ethereum / Base / Arbitrum                      │      │
│  │  ├─ Smart Contracts (Solidity)                   │      │
│  │  ├─ EVM (Execution)                              │      │
│  │  └─ State Storage                                │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│  Backend (Optional):                                       │
│  ┌──────────────────────────────────────────────────┐      │
│  │  Node.js / Express                               │      │
│  │  ├─ API for off-chain data                       │      │
│  │  ├─ Tx indexleme                                 │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3.2 Viem - Blockchain ile İletişim

**Viem Nedir?**

Viem, Ethereum blockchain ile etkileşime geçmek için kullanılan modern, TypeScript-first JavaScript kütüphanesidir. Ethers.js'e göre daha hızlı ve type-safe'dir.

**Kurulum:**

```bash
npm install viem
```

**Temel Kullanım:**

```javascript
// 1. Client oluştur - Blockchain'e bağlan
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

// Public client (read operations)
const publicClient = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org')
});

// Wallet client (write operations - MetaMask)
const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum)
});

// 2. Contract - Smart contract'ı kullan
const contractAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
const abi = [...]; // Contract ABI

// 3. Read data (ücretsiz)
const balance = await publicClient.readContract({
  address: contractAddress,
  abi: abi,
  functionName: 'balanceOf',
  args: ['0x123...']
});

// 4. Write data (gas gerektirir)
const hash = await walletClient.writeContract({
  address: contractAddress,
  abi: abi,
  functionName: 'transfer',
  args: ['0x456...', parseEther('1.0')]
});

// Transaction onayını bekle
const receipt = await publicClient.waitForTransactionReceipt({ hash });
```

## 4. Hackathon: Popüler Projeler ve Değerlendirme

### 4.1 Popüler Blockchain Proje Kategorileri

Hackathon'larda sıkça görülen ve başarılı olan proje kategorileri:

**1. DeFi (Decentralized Finance):**

- 💰 DEX (Decentralized Exchange) - Token swap platform
- 💳 Lending/Borrowing Protocol
- 📊 Staking Platform - Token stake, reward sistemi

**2. NFT (Non-Fungible Tokens):**

- 🎨 NFT Marketplace - Mint, buy, sell NFTs
- 🎮 NFT Game - Play-to-earn mechanics
- 🎫 Ticketing System - Event tickets as NFTs

**3. DAO (Decentralized Autonomous Organization):**

- 🗳️ Voting Platform - On-chain governance
- 🤝 Crowdfunding Platform - Decentralized Kickstarter

**4. Social & Identity:**

- 📱 Decentralized Social Media - Censorship-resistant
- 🆔 Digital Identity - On-chain credentials

### 4.2 Hackathon Değerlendirme Kriterleri

```
┌────────────────────────────────────────────────────────────┐
│                  Judging Criteria                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. Innovation (30%):                                      │
│  ─────────────────────────────────────────                 │
│  ✓ Yeni bir problem mi çözüyor?                            │
│  ✓ Benzersiz approach var mı?                              │
│  ✓ "Wow" faktörü var mı?                                   │
│                                                            │
│  Tip: Mevcut bir problemi blockchain ile çözmek            │
│       yeni bir blockchain problemi çözmekten daha iyi!     │
│                                                            │
│  2. Technical Complexity (25%):                            │
│  ─────────────────────────────────────────                 │
│  ✓ Smart contract quality                                  │
│  ✓ Clean code                                              │
│  ✓ Sponsor tech kullanımı                                  │
│  ✓ Security considerations                                 │
│                                                            │
│  Tip: OpenZeppelin kullan, security best practices!        │
│                                                            │
│  3. Usability & Design (20%):                              │
│  ─────────────────────────────────────────                 │
│  ✓ UX smooth mu?                                           │
│  ✓ UI modern ve clean mi?                                  │
│  ✓ Wallet connection kolay mı?                             │
│  ✓ Error handling var mı?                                  │
│                                                            │
│  Tip: Tailwind UI components, Chakra UI kullan!            │
│                                                            │
│  4. Completeness (15%):                                    │
│  ─────────────────────────────────────────                 │
│  ✓ End-to-end çalışıyor mu?                                │
│  ✓ Deploy edilmiş mi?                                      │
│  ✓ Demo smooth geçti mi?                                   │
│                                                            │
│  Tip: 3 feature tamamla, 10 feature yarım bırakma!         │
│                                                            │
│  5. Presentation (10%):                                    │
│  ─────────────────────────────────────────                 │
│  ✓ Clear pitch                                             │
│  ✓ Confident delivery                                      │
│  ✓ Problem-solution açık mı?                               │
│  ✓ Questions'a cevap verebiliyor mu?                       │
│                                                            │
│  Tip: Hikaye anlat, sadece tech demo değil!                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Resources & Learning Path

### 5.1 Öğrenme Kaynakları

**Beginner (Başlangıç):**

📚 Tutorials:
├─ CryptoZombies (gamified Solidity)
│ https://cryptozombies.io
│ → En eğlenceli Solidity öğrenme yolu
│
├─ Solidity by Example
│ https://solidity-by-example.org
│ → Code snippets, best practices

🎥 Video Courses:
├─ Patrick Collins - freeCodeCamp
│ "Solidity, Blockchain, Smart Contracts"
│ → 32 saatlik comprehensive course

### 7.2 Essential Tools & Links

├─ Remix IDE: remix.ethereum.org │
├─ Hardhat: hardhat.org │
├─ Thirdweb: thirdweb.com │
└─ OpenZeppelin Wizard: wizard.openzeppelin.com │
