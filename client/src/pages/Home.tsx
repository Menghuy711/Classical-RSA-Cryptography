import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Lock, Shuffle, Code, Key } from "lucide-react";
import {
  caesarEncrypt,
  caesarDecrypt,
  shiftEncrypt,
  shiftDecrypt,
  affineEncrypt,
  affineDecrypt,
  transpositionEncrypt,
  transpositionDecrypt,
  rsaGenerateKeys,
  rsaGenerateKeysWithPrimes,
  rsaEncrypt,
  rsaDecrypt,
} from "@/lib/crypto";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500/20 font-mono text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random() > 0.5 ? "0" : "1"}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fall {
            to {
              transform: translateY(100vh);
            }
          }
        `}</style>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src="https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/rupp-logo.png" alt="RUPP Logo" className="w-24 h-24 mx-auto mb-4" />
            <p className="text-green-500 font-mono text-sm mb-2">Royal University of Phnom Penh</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-mono font-bold text-green-500 mb-4 tracking-wider"
          >
            Classical and RSA
            <br />
            Cryptography
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 font-mono mb-8"
          >
            scroll down
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-green-500 text-3xl"
          >
            ▼
          </motion.div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-500 mb-4">OUR MEMBERS</h2>
            <p className="text-zinc-400 font-mono">The team behind the cryptography</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          >
            {[
              { name: "Heang Sokun", role: "Web Designer", image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/heang-sokun.jpg" },
              { name: "Hen Sopheap", role: "Slide Designer & Tester", image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/hen-sopheap.jpg" },
              { name: "Heng Liden", role: "Presenter", image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/heng-liden.jpg" },
              { name: "Lor Menghuy", role: "Web Designer", image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/lor-menghuy.jpg" },
              { name: "Loy Lyza", role: "Researcher & Tester", image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/loy-lyza.jpg" },
            ].map((member, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="w-full h-32 mb-4 overflow-hidden rounded border-2 border-green-500">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-green-500 font-mono">{member.name}</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono">{member.role}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-500 mb-4">CRYPTOGRAPHY TOPICS</h2>
            <p className="text-zinc-400 font-mono">Explore classical and modern encryption & decryption methods</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Caesar Cipher", code: "1.1", icon: Lock, type: "Classical", desc: "Fixed shift of 3 positions" },
                { title: "General Shift", code: "1.2", icon: Shuffle, type: "Classical", desc: "Variable shift cipher" },
                { title: "Affine Cipher", code: "1.3", icon: Code, type: "Classical", desc: "Linear transformation" },
                { title: "Transposition", code: "1.4", icon: Shuffle, type: "Classical", desc: "Columnar rearrangement" },
                { title: "RSA", code: "2.0", icon: Key, type: "Modern", desc: "Public-key cryptography" },
              ].map((topic, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card 
                    onClick={() => setSelectedTopic(topic.title)}
                    className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green h-full cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center border border-green-500">
                          <topic.icon className="text-green-500" size={24} />
                        </div>
                        <Badge variant={topic.type === "Modern" ? "default" : "secondary"} className="font-mono">
                          {topic.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-green-500 font-mono">{topic.title}</CardTitle>
                      <CardDescription className="text-zinc-400 font-mono">
                        <span className="text-green-500">{topic.code}</span> · {topic.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topic Details Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border-2 border-green-500 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-mono font-bold text-green-500">{selectedTopic}</h2>
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="text-zinc-400 hover:text-green-500 transition-colors font-mono text-2xl"
                >
                  X
                </button>
              </div>
              <TopicDetails topic={selectedTopic} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Converter Section */}
      <section id="converter" className="py-24 relative" style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)' }}>
        <div className="absolute inset-0 bg-zinc-900/50" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-4 text-green-500">
              ENCRYPTION & DECRYPTION CONVERTER
            </h2>
            <p className="text-center text-zinc-400 font-mono mb-12">Interactive cryptography tools</p>
          </motion.div>

          <ConverterTabs />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-500 mb-4">About</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                name: "Mr.LIM Seyha",
                desc: "Special thanks to my Mathematics Lecturer for guidance and support",
                image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/lim-seyha.jpg",
              },
              {
                name: "Mr.UNG Sereysopea",
                desc: "This project incorporates source code originally developed by the developer and adapted for this implementation",
                image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/ung-sereysopea.jpg",
              },
              {
                name: "Our teams",
                desc: "Thank you for exploring our website",
                image: "https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/team-photo.jpg",
              },
            ].map((member, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-full h-48 mb-4 overflow-hidden rounded border-2 border-green-500">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-green-500 font-mono text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono">{member.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <img src="https://cdn.manus.im/webdev/0d4a5e7f-6b8c-4d2e-9a1f-3c8e7d2b4a9f/rupp-logo.png" alt="RUPP Logo" className="w-12 h-12" />
              <div>
                <h3 className="text-green-500 font-mono font-bold">MathProject</h3>
                <span className="text-xs font-mono text-green-400">ROYAL UNIVERSITY OF PHNOM PENH</span>
              </div>
            </div>
            
            <div className="flex gap-6 font-mono text-sm text-zinc-400">
              <button onClick={() => scrollToSection("topics")} className="hover:text-green-500 transition-colors">Topics</button>
              <button onClick={() => scrollToSection("members")} className="hover:text-green-500 transition-colors">Member</button>
              <button onClick={() => scrollToSection("converter")} className="hover:text-green-500 transition-colors">Converter</button>
              <button onClick={() => scrollToSection("about")} className="hover:text-green-500 transition-colors">About</button>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 text-center">
            <p className="text-sm font-mono text-zinc-500 mb-2">
              For donations and support: 
              <a href="https://link.payway.com.kh/ABAPAYnF417765k" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 ml-2">
                ABA Bank
              </a>
            </p>
          </div>
          
          <div className="mt-8 text-center text-zinc-500 font-mono text-sm">
            <p>Built with &lt;ITE A5 Generation 11&gt;</p>
            <p className="mt-2">© 2026 MathProject. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TopicDetails({ topic }: { topic: string }) {
  const topicData: Record<string, { meaning: string; formulas: string[]; history: string; imageUrl: string; caption: string }> = {
    "Caesar Cipher": {
      meaning: "A substitution cipher where each letter is shifted by a fixed number of positions (traditionally 3). It replaces each letter with the letter a fixed number of positions down the alphabet.",
      formulas: [
        "Encryption: E(x) = (x + 3) mod 26",
        "Decryption: D(x) = (x - 3) mod 26"
      ],
      history: "Created by Julius Caesar in the 1st century BC. Used for military communications in ancient Rome.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg",
      caption: "Julius Caesar - Roman general (100-44 BC)"
    },
    "General Shift": {
      meaning: "An extension of the Caesar cipher where the shift value can be any number from 0 to 25. Each letter is shifted by the same variable amount.",
      formulas: [
        "Encryption: E(x) = (x + k) mod 26, where k is the shift key",
        "Decryption: D(x) = (x - k) mod 26"
      ],
      history: "Generalization of Caesar cipher. Studied extensively in classical cryptography since the Middle Ages.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg",
      caption: "Julius Caesar - Early use of shift substitution"
    },
    "Affine Cipher": {
      meaning: "A substitution cipher combining multiplication and addition. Uses two keys (a, b) where a must be coprime to 26. More secure than shift ciphers due to two parameters.",
      formulas: [
        "Encryption: E(x) = (ax + b) mod 26, where gcd(a, 26) = 1",
        "Decryption: D(x) = a^(-1)(x - b) mod 26"
      ],
      history: "Developed as an enhancement to shift ciphers. Studied in classical cryptography as a more complex substitution method.",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%231a1a1a' width='200' height='200'/%3E%3Ctext x='100' y='60' font-size='48' fill='%2322c55e' text-anchor='middle' font-family='monospace' font-weight='bold'%3E%26%2310230%3B%3C/text%3E%3Ctext x='100' y='130' font-size='14' fill='%2388cc00' text-anchor='middle' font-family='monospace'%3E(ax %2B b) mod 26%3C/text%3E%3C/svg%3E",
      caption: "Based on modular arithmetic concepts (17th-19th century mathematics)"
    },
    "Transposition": {
      meaning: "A cipher that rearranges the positions of letters without changing them. Uses a keyword to determine the column order. The plaintext is written row-by-row and read column-by-column.",
      formulas: [
        "Method: Write plaintext in rows under keyword, read columns in alphabetical order of keyword",
        "Decryption: Reverse the process using the same keyword"
      ],
      history: "Used in military communications for centuries. Rail Fence and Columnar Transposition are common variants.",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%231a1a1a' width='200' height='200'/%3E%3Cg fill='%2322c55e'%3E%3Crect x='20' y='30' width='30' height='30'/%3E%3Crect x='60' y='30' width='30' height='30'/%3E%3Crect x='100' y='30' width='30' height='30'/%3E%3Crect x='140' y='30' width='30' height='30'/%3E%3Crect x='20' y='70' width='30' height='30'/%3E%3Crect x='60' y='70' width='30' height='30'/%3E%3Crect x='100' y='70' width='30' height='30'/%3E%3Crect x='140' y='70' width='30' height='30'/%3E%3Crect x='20' y='110' width='30' height='30'/%3E%3Crect x='60' y='110' width='30' height='30'/%3E%3Crect x='100' y='110' width='30' height='30'/%3E%3Crect x='140' y='110' width='30' height='30'/%3E%3C/g%3E%3Ctext x='100' y='180' font-size='12' fill='%2388cc00' text-anchor='middle' font-family='monospace'%3EColumnar Rearrangement%3C/text%3E%3C/svg%3E",
      caption: "Used in ancient Greece and Rome"
    },
    "RSA": {
      meaning: "A public-key cryptosystem using two keys: a public key for encryption and a private key for decryption. Based on the difficulty of factoring large prime numbers.",
      formulas: [
        "Encryption: C = M^e mod n",
        "Decryption: M = C^d mod n",
        "Where n = p*q, e is public exponent, d is private exponent"
      ],
      history: "Invented by Rivest, Shamir, and Adleman in 1977. First practical public-key cryptosystem, revolutionized secure communication.",
      imageUrl: "https://ericplayground.com/wp-content/uploads/2017/03/rsa-2003.jpg",
      caption: "Rivest, Shamir, and Adleman - Inventors of RSA (1977)"
    }
  };

  const data = topicData[topic];
  if (!data) return null;

  return (
    <div className="space-y-6 text-zinc-300 font-mono">
      <div>
        <h3 className="text-xl font-bold text-green-500 mb-2">Meaning:</h3>
        <p className="text-sm leading-relaxed">{data.meaning}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-green-500 mb-2">Formula:</h3>
        <div className="space-y-2">
          {data.formulas.map((formula, idx) => (
            <p key={idx} className="text-sm bg-zinc-800 p-3 rounded border border-green-500/30">
              {formula}
            </p>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-green-500 mb-2">History:</h3>
        <p className="text-sm leading-relaxed mb-4">{data.history}</p>
        {data.imageUrl && (
          <div className="flex flex-col items-center">
            <img 
              src={data.imageUrl} 
              alt={data.caption}
              className="w-48 h-auto rounded-lg shadow-lg border border-green-500/30 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className="text-xs text-zinc-400 mt-3 text-center max-w-xs">{data.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ConverterTabs() {
  // Caesar Cipher State
  const [caesarPlaintext, setCaesarPlaintext] = useState("");
  const [caesarEncrypted, setCaesarEncrypted] = useState("");
  const [caesarDecrypted, setCaesarDecrypted] = useState("");

  // Shift Cipher State
  const [shiftPlaintext, setShiftPlaintext] = useState("");
  const [shiftValue, setShiftValue] = useState("3");
  const [shiftEncrypted, setShiftEncrypted] = useState("");
  const [shiftDecrypted, setShiftDecrypted] = useState("");
  const [shiftBruteForce, setShiftBruteForce] = useState("");

  // Affine Cipher State
  const [affinePlaintext, setAffinePlaintext] = useState("");
  const [affineA, setAffineA] = useState("5");
  const [affineB, setAffineB] = useState("8");
  const [affineEncrypted, setAffineEncrypted] = useState("");
  const [affineDecrypted, setAffineDecrypted] = useState("");
  const [affineBruteForce, setAffineBruteForce] = useState("");

  // Transposition Cipher State
  const [transPlaintext, setTransPlaintext] = useState("");
  const [transKey, setTransKey] = useState("CRYPTO");
  const [transEncrypted, setTransEncrypted] = useState("");
  const [transDecrypted, setTransDecrypted] = useState("");

  // RSA State
  const [rsaPlaintext, setRsaPlaintext] = useState("");
  const [rsaKeys, setRsaKeys] = useState(rsaGenerateKeys());
  const [rsaEncrypted, setRsaEncrypted] = useState("");
  const [rsaDecrypted, setRsaDecrypted] = useState("");
  const [rsaP, setRsaP] = useState("61");
  const [rsaQ, setRsaQ] = useState("53");
  const [rsaKeyGenError, setRsaKeyGenError] = useState("");
  const [rsaE, setRsaE] = useState("");
  const [rsaN, setRsaN] = useState("");
  const [rsaD, setRsaD] = useState("");
  const [rsaPhi, setRsaPhi] = useState("");
  const [rsaEncryptE, setRsaEncryptE] = useState("");
  const [rsaEncryptN, setRsaEncryptN] = useState("");
  const [rsaEncryptMessage, setRsaEncryptMessage] = useState("");
  const [rsaEncryptResult, setRsaEncryptResult] = useState("");
  const [rsaDecryptD, setRsaDecryptD] = useState("");
  const [rsaDecryptN, setRsaDecryptN] = useState("");
  const [rsaDecryptCiphertext, setRsaDecryptCiphertext] = useState("");
  const [rsaDecryptResult, setRsaDecryptResult] = useState("");

  // Caesar handlers
  const handleCaesarEncrypt = () => {
    try {
      const result = caesarEncrypt(caesarPlaintext);
      setCaesarEncrypted(result);
    } catch (error) {
      setCaesarEncrypted("Error: " + (error as Error).message);
    }
  };

  const handleCaesarDecrypt = () => {
    try {
      const result = caesarDecrypt(caesarPlaintext);
      setCaesarDecrypted(result);
    } catch (error) {
      setCaesarDecrypted("Error: " + (error as Error).message);
    }
  };

  // Shift handlers
  const handleShiftEncrypt = () => {
    try {
      const shift = parseInt(shiftValue);
      const result = shiftEncrypt(shiftPlaintext, shift);
      setShiftEncrypted(result);
    } catch (error) {
      setShiftEncrypted("Error: " + (error as Error).message);
    }
  };

  const handleShiftDecrypt = () => {
    try {
      const shift = parseInt(shiftValue);
      const result = shiftDecrypt(shiftPlaintext, shift);
      setShiftDecrypted(result);
    } catch (error) {
      setShiftDecrypted("Error: " + (error as Error).message);
    }
  };

  const handleShiftBruteForce = () => {
    try {
      const results: string[] = [];
      for (let shift = 0; shift < 26; shift++) {
        const decrypted = shiftDecrypt(shiftPlaintext, shift);
        results.push(`Shift ${shift}: ${decrypted}`);
      }
      const formattedResults = [];
      for (let i = 0; i < results.length; i += 4) {
        formattedResults.push(results.slice(i, i + 4).join(" | "));
      }
      setShiftBruteForce(formattedResults.join("\n"));
    } catch (error) {
      setShiftBruteForce("Error: " + (error as Error).message);
    }
  };

  // Affine handlers
  const handleAffineEncrypt = () => {
    try {
      const a = parseInt(affineA);
      const b = parseInt(affineB);
      const result = affineEncrypt(affinePlaintext, a, b);
      setAffineEncrypted(result);
    } catch (error) {
      setAffineEncrypted("Error: " + (error as Error).message);
    }
  };

  const handleAffineDecrypt = () => {
    try {
      const a = parseInt(affineA);
      const b = parseInt(affineB);
      const result = affineDecrypt(affinePlaintext, a, b);
      setAffineDecrypted(result);
    } catch (error) {
      setAffineDecrypted("Error: " + (error as Error).message);
    }
  };

  const handleAffineBruteForce = () => {
    try {
      const results: string[] = [];
      const validA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
      
      for (const a of validA) {
        for (let b = 0; b < 26; b++) {
          try {
            const decrypted = affineDecrypt(affinePlaintext, a, b);
            results.push(`a=${a}, b=${b}: ${decrypted}`);
          } catch (e) {
            // Skip invalid combinations
          }
        }
      }
      const formattedResults = [];
      for (let i = 0; i < results.length; i += 3) {
        formattedResults.push(results.slice(i, i + 3).join(" | "));
      }
      setAffineBruteForce(formattedResults.join("\n"));
    } catch (error) {
      setAffineBruteForce("Error: " + (error as Error).message);
    }
  };

  // Transposition handlers
  const handleTransEncrypt = () => {
    try {
      const result = transpositionEncrypt(transPlaintext, transKey);
      setTransEncrypted(result);
    } catch (error) {
      setTransEncrypted("Error: " + (error as Error).message);
    }
  };

  const handleTransDecrypt = () => {
    try {
      const result = transpositionDecrypt(transPlaintext, transKey);
      setTransDecrypted(result);
    } catch (error) {
      setTransDecrypted("Error: " + (error as Error).message);
    }
  };

  // RSA handlers
  const handleRsaGenerateKeys = () => {
    setRsaKeys(rsaGenerateKeys());
  };

  const handleRsaGenerateKeysWithPrimes = () => {
    try {
      setRsaKeyGenError("");
      const p = parseInt(rsaP);
      const q = parseInt(rsaQ);
      
      if (isNaN(p) || isNaN(q)) {
        setRsaKeyGenError("Please enter valid numbers for p and q");
        return;
      }
      
      const result = rsaGenerateKeysWithPrimes(p, q);
      
      if ('error' in result) {
        setRsaKeyGenError(result.error);
        setRsaE("");
        setRsaN("");
        setRsaD("");
        setRsaPhi("");
      } else {
        setRsaKeyGenError("");
        setRsaE(result.publicKey.e);
        setRsaN(result.publicKey.n);
        setRsaD(result.privateKey.d);
        setRsaPhi(result.phi);
        setRsaEncryptE(result.publicKey.e);
        setRsaEncryptN(result.publicKey.n);
        setRsaDecryptD(result.privateKey.d);
        setRsaDecryptN(result.publicKey.n);
      }
    } catch (error) {
      setRsaKeyGenError("Error: " + (error as Error).message);
    }
  };

  const handleRsaEncryptDemo = () => {
    try {
      if (!rsaEncryptE || !rsaEncryptN || !rsaEncryptMessage) {
        setRsaEncryptResult("Please fill in all fields");
        return;
      }
      const result = rsaEncrypt(rsaEncryptMessage, rsaEncryptE, rsaEncryptN);
      setRsaEncryptResult(result);
    } catch (error) {
      setRsaEncryptResult("Error: " + (error as Error).message);
    }
  };

  const handleRsaDecryptDemo = () => {
    try {
      if (!rsaDecryptD || !rsaDecryptN || !rsaDecryptCiphertext) {
        setRsaDecryptResult("Please fill in all fields");
        return;
      }
      const result = rsaDecrypt(rsaDecryptCiphertext, rsaDecryptD, rsaDecryptN);
      setRsaDecryptResult(result);
    } catch (error) {
      setRsaDecryptResult("Error: " + (error as Error).message);
    }
  };

  const handleRsaEncrypt = () => {
    try {
      const result = rsaEncrypt(rsaPlaintext, rsaKeys.publicKey.e, rsaKeys.publicKey.n);
      setRsaEncrypted(result);
    } catch (error) {
      setRsaEncrypted("Error: " + (error as Error).message);
    }
  };

  const handleRsaDecrypt = () => {
    try {
      const result = rsaDecrypt(rsaPlaintext, rsaKeys.privateKey.d, rsaKeys.privateKey.n);
      setRsaDecrypted(result);
    } catch (error) {
      setRsaDecrypted("Error: " + (error as Error).message);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 max-w-4xl mx-auto">
      <CardContent className="p-6">
        <Tabs defaultValue="caesar" className="w-full">
          <TabsList className="grid grid-cols-5 w-full bg-zinc-800 mb-6 overflow-x-auto">
            <TabsTrigger value="caesar" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap">Caesar Cipher</TabsTrigger>
            <TabsTrigger value="shift" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap">General Shift</TabsTrigger>
            <TabsTrigger value="affine" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap">Affine Cipher</TabsTrigger>
            <TabsTrigger value="trans" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap">Transposition</TabsTrigger>
            <TabsTrigger value="rsa" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap">RSA</TabsTrigger>
          </TabsList>

          {/* Caesar Cipher Tab */}
          <TabsContent value="caesar" className="space-y-4">
            <div className="text-center text-green-500 font-mono text-sm mb-4">E(x) = (x + 3) mod 26</div>
            <div>
              <label className="text-zinc-400 font-mono text-sm">Plaintext</label>
              <textarea
                value={caesarPlaintext}
                onChange={(e) => setCaesarPlaintext(e.target.value)}
                placeholder="Enter text to encrypt/decrypt..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleCaesarEncrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Encrypt</button>
              <button onClick={handleCaesarDecrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Decrypt</button>
            </div>
            {caesarEncrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Encrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{caesarEncrypted}</p>
              </div>
            )}
            {caesarDecrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Decrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{caesarDecrypted}</p>
              </div>
            )}
          </TabsContent>

          {/* Shift Cipher Tab */}
          <TabsContent value="shift" className="space-y-4">
            <div className="text-center text-green-500 font-mono text-sm mb-4">E(x) = (x + k) mod 26</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 font-mono text-sm">Shift Value (k)</label>
                <input
                  type="number"
                  value={shiftValue}
                  onChange={(e) => setShiftValue(e.target.value)}
                  min="0"
                  max="25"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-zinc-400 font-mono text-sm">Plaintext</label>
              <textarea
                value={shiftPlaintext}
                onChange={(e) => setShiftPlaintext(e.target.value)}
                placeholder="Enter text to encrypt/decrypt..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleShiftEncrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Encrypt</button>
              <button onClick={handleShiftDecrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Decrypt</button>
              <button onClick={handleShiftBruteForce} className="flex-1 bg-yellow-600 text-zinc-950 font-mono py-2 rounded hover:bg-yellow-700 transition-colors">Brute Force</button>
            </div>
            {shiftEncrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Encrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{shiftEncrypted}</p>
              </div>
            )}
            {shiftDecrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Decrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{shiftDecrypted}</p>
              </div>
            )}
            {shiftBruteForce && (
              <div className="bg-zinc-800 p-3 rounded border border-yellow-600/30 max-h-48 overflow-y-auto">
                <p className="text-zinc-400 font-mono text-xs mb-1">Brute Force Results:</p>
                <p className="text-yellow-500 font-mono text-xs whitespace-pre-wrap">{shiftBruteForce}</p>
              </div>
            )}
          </TabsContent>

          {/* Affine Cipher Tab */}
          <TabsContent value="affine" className="space-y-4">
            <div className="text-center text-green-500 font-mono text-sm mb-4">E(x) = (ax + b) mod 26</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 font-mono text-sm">a (must be coprime to 26)</label>
                <input
                  type="number"
                  value={affineA}
                  onChange={(e) => setAffineA(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 font-mono text-sm">b</label>
                <input
                  type="number"
                  value={affineB}
                  onChange={(e) => setAffineB(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-zinc-400 font-mono text-sm">Plaintext</label>
              <textarea
                value={affinePlaintext}
                onChange={(e) => setAffinePlaintext(e.target.value)}
                placeholder="Enter text to encrypt/decrypt..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleAffineEncrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Encrypt</button>
              <button onClick={handleAffineDecrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Decrypt</button>
              <button onClick={handleAffineBruteForce} className="flex-1 bg-yellow-600 text-zinc-950 font-mono py-2 rounded hover:bg-yellow-700 transition-colors">Brute Force</button>
            </div>
            {affineEncrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Encrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{affineEncrypted}</p>
              </div>
            )}
            {affineDecrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Decrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{affineDecrypted}</p>
              </div>
            )}
            {affineBruteForce && (
              <div className="bg-zinc-800 p-3 rounded border border-yellow-600/30 max-h-48 overflow-y-auto">
                <p className="text-zinc-400 font-mono text-xs mb-1">Brute Force Results:</p>
                <p className="text-yellow-500 font-mono text-xs whitespace-pre-wrap">{affineBruteForce}</p>
              </div>
            )}
          </TabsContent>

          {/* Transposition Cipher Tab */}
          <TabsContent value="trans" className="space-y-4">
            <div className="text-center text-green-500 font-mono text-sm mb-4">Columnar Transposition</div>
            <div>
              <label className="text-zinc-400 font-mono text-sm">Key</label>
              <input
                type="text"
                value={transKey}
                onChange={(e) => setTransKey(e.target.value.toUpperCase())}
                placeholder="Enter key..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono text-sm">Plaintext</label>
              <textarea
                value={transPlaintext}
                onChange={(e) => setTransPlaintext(e.target.value)}
                placeholder="Enter text to encrypt/decrypt..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-green-500 font-mono text-sm mt-2 focus:border-green-500 focus:outline-none"
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleTransEncrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Encrypt</button>
              <button onClick={handleTransDecrypt} className="flex-1 bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Decrypt</button>
            </div>
            {transEncrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Encrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{transEncrypted}</p>
              </div>
            )}
            {transDecrypted && (
              <div className="bg-zinc-800 p-3 rounded border border-green-500/30">
                <p className="text-zinc-400 font-mono text-xs mb-1">Decrypted:</p>
                <p className="text-green-500 font-mono text-sm break-words">{transDecrypted}</p>
              </div>
            )}
          </TabsContent>

          {/* RSA Tab */}
          <TabsContent value="rsa" className="space-y-4">
            <div className="text-center text-green-500 font-mono text-sm mb-4">RSA Encryption/Decryption</div>
            
            <div className="border-b border-zinc-700 pb-4">
              <h4 className="text-green-500 font-mono text-sm mb-3">Key Generation</h4>
              <button onClick={handleRsaGenerateKeys} className="w-full bg-blue-600 text-white font-mono py-2 rounded hover:bg-blue-700 transition-colors mb-3">Generate Random Keys</button>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-zinc-400 font-mono text-xs">p (prime)</label>
                  <input
                    type="number"
                    value={rsaP}
                    onChange={(e) => setRsaP(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm mt-1 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-mono text-xs">q (prime)</label>
                  <input
                    type="number"
                    value={rsaQ}
                    onChange={(e) => setRsaQ(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm mt-1 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
              <button onClick={handleRsaGenerateKeysWithPrimes} className="w-full bg-blue-600 text-white font-mono py-2 rounded hover:bg-blue-700 transition-colors">Generate Keys with Primes</button>
              
              {rsaKeyGenError && (
                <div className="bg-red-900/30 border border-red-500 p-2 rounded mt-2">
                  <p className="text-red-400 font-mono text-xs">{rsaKeyGenError}</p>
                </div>
              )}
              
              {rsaE && (
                <div className="mt-3 space-y-2 text-xs font-mono">
                  <p className="text-zinc-400">e: <span className="text-green-500">{rsaE}</span></p>
                  <p className="text-zinc-400">n: <span className="text-green-500">{rsaN}</span></p>
                  <p className="text-zinc-400">d: <span className="text-green-500">{rsaD}</span></p>
                  <p className="text-zinc-400">φ(n): <span className="text-green-500">{rsaPhi}</span></p>
                </div>
              )}
            </div>

            <div className="border-b border-zinc-700 pb-4">
              <h4 className="text-green-500 font-mono text-sm mb-3">Encryption Demo</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={rsaEncryptE}
                  onChange={(e) => setRsaEncryptE(e.target.value)}
                  placeholder="e (public exponent)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={rsaEncryptN}
                  onChange={(e) => setRsaEncryptN(e.target.value)}
                  placeholder="n (modulus)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={rsaEncryptMessage}
                  onChange={(e) => setRsaEncryptMessage(e.target.value)}
                  placeholder="Message (number)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                />
                <button onClick={handleRsaEncryptDemo} className="w-full bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Encrypt</button>
              </div>
              {rsaEncryptResult && (
                <div className="bg-zinc-800 p-2 rounded border border-green-500/30 mt-2">
                  <p className="text-zinc-400 font-mono text-xs mb-1">Result:</p>
                  <p className="text-green-500 font-mono text-sm break-words">{rsaEncryptResult}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-green-500 font-mono text-sm mb-3">Decryption Demo</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={rsaDecryptD}
                  onChange={(e) => setRsaDecryptD(e.target.value)}
                  placeholder="d (private exponent)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={rsaDecryptN}
                  onChange={(e) => setRsaDecryptN(e.target.value)}
                  placeholder="n (modulus)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={rsaDecryptCiphertext}
                  onChange={(e) => setRsaDecryptCiphertext(e.target.value)}
                  placeholder="Ciphertext (number)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                />
                <button onClick={handleRsaDecryptDemo} className="w-full bg-green-500 text-zinc-950 font-mono py-2 rounded hover:bg-green-600 transition-colors">Decrypt</button>
              </div>
              {rsaDecryptResult && (
                <div className="bg-zinc-800 p-2 rounded border border-green-500/30 mt-2">
                  <p className="text-zinc-400 font-mono text-xs mb-1">Result:</p>
                  <p className="text-green-500 font-mono text-sm break-words">{rsaDecryptResult}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
