import { useState, useEffect } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  formatEther,
} from "viem";
import { baseSepolia } from "viem/chains";

// Contract ABI
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "MessagePosted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getMessage",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessageCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
    ],
    name: "getRecentMessages",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct MessageBoard.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messageCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "messages",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "postMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Contract address - Deploy sonrası buraya yazılacak
const CONTRACT_ADDRESS = "0x64CD1a30CE18Cb9bdf0156731E4Ac1B98395EDe3";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publicClient, setPublicClient] = useState(null);
  const [walletClient, setWalletClient] = useState(null);

  // Public client oluştur (okuma için)
  useEffect(() => {
    const client = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });
    setPublicClient(client);
  }, []);

  // Wallet bağlantısı
  const connectWallet = async () => {
    try {
      setError(null);

      if (!window.ethereum) {
        setError("MetaMask yüklü değil! Lütfen MetaMask extension yükleyin.");
        return;
      }

      // Wallet client oluştur
      const client = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
      });

      // Hesap bağlantısı iste
      const [address] = await client.requestAddresses();
      setAccount(address);
      setWalletClient(client);

      // Balance al
      const bal = await publicClient.getBalance({ address });
      setBalance(formatEther(bal));

      // Mesajları yükle
      loadMessages();
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError("Wallet bağlantısı başarısız: " + err.message);
    }
  };

  // Mesajları yükle (Okuma işlemi)
  const loadMessages = async () => {
    if (!publicClient) return;

    try {
      setLoading(true);
      setError(null);

      // Son 10 mesajı al
      const recentMessages = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "getRecentMessages",
        args: [10n],
      });

      setMessages(recentMessages);
    } catch (err) {
      console.error("Load messages error:", err);
      setError("Mesajlar yüklenemedi. Contract deploy edildi mi?");
    } finally {
      setLoading(false);
    }
  };

  // Mesaj gönder (Yazma işlemi)
  const postMessage = async (e) => {
    e.preventDefault();

    if (!walletClient || !account) {
      setError("Önce wallet bağlayın!");
      return;
    }

    if (!messageContent.trim()) {
      setError("Mesaj boş olamaz!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Transaction gönder
      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "postMessage",
        args: [messageContent],
        account,
      });

      console.log("Transaction hash:", hash);

      // Transaction onayını bekle
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log("Transaction confirmed:", receipt);

      // Formu temizle
      setMessageContent("");

      // Mesajları yenile
      setTimeout(() => loadMessages(), 2000);

      alert("Mesaj başarıyla gönderildi! 🎉");
    } catch (err) {
      console.error("Post message error:", err);
      setError("Mesaj gönderilemedi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Tarih formatlama
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString("tr-TR");
  };

  // Address kısaltma
  const shortAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>📝 Message Board</h1>
        <p>Base Sepolia Testnet üzerinde çalışan basit bir dApp</p>

        {!account ? (
          <button className="connect-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>
              <strong>Connected:</strong> {shortAddress(account)}
            </p>
            <p>
              <strong>Balance:</strong> {parseFloat(balance).toFixed(4)} ETH
            </p>
            <p>
              <strong>Network:</strong> Base Sepolia
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="error">{error}</div>}

      {/* Message Form */}
      {account && (
        <div className="message-form">
          <h2>Yeni Mesaj</h2>
          <form onSubmit={postMessage}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Mesajınızı yazın... (max 280 karakter)"
              maxLength={280}
              disabled={loading}
            />
            <div
              className={`char-count ${messageContent.length > 250 ? "warning" : ""}`}
            >
              {messageContent.length}/280
            </div>
            <button
              type="submit"
              className="post-button"
              disabled={loading || !messageContent.trim()}
            >
              {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
            </button>
          </form>
        </div>
      )}

      {/* Messages Section */}
      <div className="messages-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Son Mesajlar</h2>
          <button
            className="refresh-button"
            onClick={loadMessages}
            disabled={loading}
          >
            🔄 Yenile
          </button>
        </div>

        {loading && <div className="loading">Yükleniyor...</div>}

        {!loading && messages.length === 0 && (
          <div className="no-messages">
            Henüz mesaj yok. İlk mesajı siz gönderin! 🚀
          </div>
        )}

        {!loading &&
          messages.map((message, index) => (
            <div key={index} className="message-card">
              <div className="message-header">
                <span className="message-author">
                  {shortAddress(message.author)}
                </span>
                <span className="message-time">
                  {formatDate(message.timestamp)}
                </span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
