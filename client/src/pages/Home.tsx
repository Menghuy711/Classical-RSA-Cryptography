/* Neo-Tokyo Cyberpunk Design:
   - Pure black background with electric green accents
   - Diagonal section breaks using clip-path
   - Monospace typography for terminal aesthetic
   - Green glow effects on hover
   - Binary code as decorative texture
*/

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Lock, Code, Shuffle, Key, BookOpen, Users, Zap, MousePointer2, Github, Twitter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  caesarEncrypt,
  caesarDecrypt,
  shiftEncrypt,
  shiftDecrypt,
  getShiftMapping,
  affineEncrypt,
  affineDecrypt,
  transpositionEncrypt,
  transpositionDecrypt,
  rsaGenerateKeys,
  rsaEncrypt,
  rsaDecrypt,
} from "@/lib/crypto";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500">
      {/* Binary Background Pattern */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/02Or6jhLZ3Mg726WnAWeOl/sandbox/Vc2gV8xNqiPcUMDNQlhtW0-img-1_1771404379000_na1fn_aGVyby1iaW5hcnktbWF0cml4.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMDJPcjZqaExaM01nNzI2V25BV2VPbC9zYW5kYm94L1ZjMmdWOHhOcWlQY1VNRE5RbGh0VzAtaW1nLTFfMTc3MTQwNDM3OTAwMF9uYTFmbl9hR1Z5YnkxaWFXNWhjbmt0YldGMGNtbDQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=M66UvWZM0E9nSzdHjULfCoogR-IQC3lzyKXnVuG0M5kvIVD2NiYSZAMBNoqPPh0UV-hVeTXBZ-KAyFwvn-wi2N5nUBeBDqJSwqooSSLySRq0ypBrcqy6dKB7t9VPPI28yipw3NJq0XAR1H5zFWCISqa-heVcs3J0QopYIyFHqzPBTCCAPnLXuJCvm3VmojXoQYA--KO1iWuvMmw0JWb8L~M1fUrPO-2oZREKdpJ-gZTBxNNBNlhDgxi~X520HsO4ZtO-zqWbAck2im5C9fi7kjObZ52BNhCjcEkODfvQEwXQPe-EFFkovMTb1~Z9sNK6PxqYyNBdd1ssCXN3J2kpzQ__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center font-mono font-bold text-zinc-950">
              MP
            </div>
            <span className="text-xl font-mono font-bold text-green-500">MathProject</span>
          </div>
          <div className="hidden md:flex gap-6 font-mono text-sm">
            <button onClick={() => scrollToSection("topics")} className="hover:text-green-400 transition-colors">Topics</button>
            <button onClick={() => scrollToSection("members")} className="hover:text-green-400 transition-colors">Member</button>
            <button onClick={() => scrollToSection("converter")} className="hover:text-green-400 transition-colors">Converter</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-green-400 transition-colors">About</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <Badge variant="outline" className="mb-6 border-green-500 text-green-500 font-mono">
              11000001...
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-mono font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Classical <span className="text-green-500">and</span> RSA<br />Cryptography
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-zinc-400 font-mono mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Math Group project
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <MousePointer2 className="mx-auto animate-bounce text-green-500" size={32} />
          </motion.div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-24 relative" style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)' }}>
        <div className="absolute inset-0 bg-zinc-900/50" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
              OUR <span className="text-green-500">MEMBERS</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-center text-zinc-400 font-mono mb-12">
              The team behind the cryptography
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Lor Menghuy", id: "00000001" },
                { name: "Hen Sopheap", id: "00000010" },
                { name: "Heang Sokun", id: "00000011" },
                { name: "Loy Lyza", id: "00000100" },
                { name: "Heng Liden", id: "00000101" },
              ].map((member, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green">
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-green-500">
                        <User className="text-green-500" size={40} />
                      </div>
                      <CardTitle className="text-green-500 font-mono">{member.name}</CardTitle>
                      <CardDescription className="text-zinc-400 font-mono">{member.id}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
              CRYPTOGRAPHY <span className="text-green-500">TOPICS</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-center text-zinc-400 font-mono mb-12">
              Explore classical and modern encryption methods
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Caesar Cipher", code: "1.1", icon: Lock, type: "Classical", desc: "Fixed shift of 3 positions" },
                { title: "General Shift", code: "1.2", icon: Shuffle, type: "Classical", desc: "Variable shift cipher" },
                { title: "Affine Cipher", code: "1.3", icon: Code, type: "Classical", desc: "Linear transformation" },
                { title: "Transposition", code: "1.4", icon: Shuffle, type: "Classical", desc: "Columnar rearrangement" },
                { title: "RSA", code: "2.0", icon: Key, type: "Modern", desc: "Public-key cryptography" },
              ].map((topic, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green h-full">
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
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
              ENCRYPTION & DECRYPTION <span className="text-green-500">CONVERTER</span>
            </h2>
            <p className="text-center text-zinc-400 font-mono mb-12">
              Interactive cryptography tools
            </p>

            <ConverterTabs />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
              WHY LEARN <span className="text-green-500">BINARY MATHEMATICS?</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
              {[
                { icon: BookOpen, title: "Comprehensive Learning", desc: "Master both classical and modern cryptography techniques" },
                { icon: Zap, title: "Interactive Exercises", desc: "Practice encryption and decryption in real-time" },
                { icon: Users, title: "Community Support", desc: "Learn together with fellow cryptography enthusiasts" },
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="bg-zinc-900 border-zinc-800 text-center h-full">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 flex items-center justify-center border border-green-500">
                        <item.icon className="text-green-500" size={32} />
                      </div>
                      <CardTitle className="text-green-500 font-mono mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-zinc-400 font-mono">{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center font-mono font-bold text-zinc-950">
                MP
              </div>
              <span className="text-xl font-mono font-bold text-green-500">MathProject</span>
            </div>
            
            <div className="flex gap-6 font-mono text-sm text-zinc-400">
              <button onClick={() => scrollToSection("topics")} className="hover:text-green-500 transition-colors">Topics</button>
              <button onClick={() => scrollToSection("members")} className="hover:text-green-500 transition-colors">Member</button>
              <button onClick={() => scrollToSection("converter")} className="hover:text-green-500 transition-colors">Converter</button>
              <button onClick={() => scrollToSection("about")} className="hover:text-green-500 transition-colors">About</button>
            </div>
            
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400">
                <Github size={20} />
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-zinc-500 font-mono text-sm">
            <p>Built with &lt;01101100 01101111 01110110 01100101&gt;</p>
            <p className="mt-2">© 2026 MathProject. All rights reserved.</p>
          </div>
        </div>
      </footer>
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
      setShiftBruteForce(results.join(" | "));
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
      const validA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]; // Values coprime with 26
      
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
      setAffineBruteForce(results.join(" | "));
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
            <TabsTrigger value="rsa" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap">RSA Cryptography</TabsTrigger>
          </TabsList>

          {/* Caesar Tab */}
          <TabsContent value="caesar" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-green-500 font-mono text-sm">E(x) = (x + 3) mod 26</p>
            </div>
            <div>
              <Label className="font-mono text-green-500">Plaintext</Label>
              <Textarea 
                value={caesarPlaintext}
                onChange={(e) => setCaesarPlaintext(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="Enter text to encrypt/decrypt..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleCaesarEncrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Encrypt
              </Button>
              <Button onClick={handleCaesarDecrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Decrypt
              </Button>
            </div>
            {caesarEncrypted && (
              <div>
                <Label className="font-mono text-green-500">Encrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {caesarEncrypted}
                </div>
              </div>
            )}
            {caesarDecrypted && (
              <div>
                <Label className="font-mono text-green-500">Decrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {caesarDecrypted}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Shift Tab */}
          <TabsContent value="shift" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-green-500 font-mono text-sm">E(x) = (x + k) mod 26</p>
            </div>
            <div>
              <Label className="font-mono text-green-500">Shift Value</Label>
              <Input 
                type="number"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
              />
            </div>
            <div>
              <Label className="font-mono text-green-500">Plaintext</Label>
              <Textarea 
                value={shiftPlaintext}
                onChange={(e) => setShiftPlaintext(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="Enter text to encrypt/decrypt..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleShiftEncrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Encrypt
              </Button>
              <Button onClick={handleShiftDecrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Decrypt
              </Button>
            </div>
            {shiftEncrypted && (
              <div>
                <Label className="font-mono text-green-500">Encrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {shiftEncrypted}
                </div>
              </div>
            )}
            {shiftDecrypted && (
              <div>
                <Label className="font-mono text-green-500">Decrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {shiftDecrypted}
                </div>
              </div>
            )}
            <div className="border-t border-zinc-700 pt-4 mt-4">
              <Button onClick={handleShiftBruteForce} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-mono">
                Run Brute Force Attack
              </Button>
            </div>
            {shiftBruteForce && (
              <div>
                <Label className="font-mono text-green-500">Brute Force Results</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all max-h-48 overflow-y-auto text-xs">
                  {shiftBruteForce}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Affine Tab */}
          <TabsContent value="affine" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-green-500 font-mono text-sm">E(x) = (ax + b) mod 26</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-mono text-green-500">a (coprime with 26)</Label>
                <Input 
                  type="number"
                  value={affineA}
                  onChange={(e) => setAffineA(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                />
              </div>
              <div>
                <Label className="font-mono text-green-500">b</Label>
                <Input 
                  type="number"
                  value={affineB}
                  onChange={(e) => setAffineB(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                />
              </div>
            </div>
            <div>
              <Label className="font-mono text-green-500">Plaintext</Label>
              <Textarea 
                value={affinePlaintext}
                onChange={(e) => setAffinePlaintext(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="Enter text to encrypt/decrypt..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAffineEncrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Encrypt
              </Button>
              <Button onClick={handleAffineDecrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Decrypt
              </Button>
            </div>
            {affineEncrypted && (
              <div>
                <Label className="font-mono text-green-500">Encrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {affineEncrypted}
                </div>
              </div>
            )}
            {affineDecrypted && (
              <div>
                <Label className="font-mono text-green-500">Decrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {affineDecrypted}
                </div>
              </div>
            )}
            <div className="border-t border-zinc-700 pt-4 mt-4">
              <Button onClick={handleAffineBruteForce} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-mono">
                Run Brute Force Attack
              </Button>
            </div>
            {affineBruteForce && (
              <div>
                <Label className="font-mono text-green-500">Brute Force Results</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all max-h-48 overflow-y-auto text-xs">
                  {affineBruteForce}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Transposition Tab */}
          <TabsContent value="trans" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-green-500 font-mono text-sm">Columnar Transposition</p>
            </div>
            <div>
              <Label className="font-mono text-green-500">Key</Label>
              <Input 
                value={transKey}
                onChange={(e) => setTransKey(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="e.g., CRYPTO"
              />
            </div>
            <div>
              <Label className="font-mono text-green-500">Plaintext</Label>
              <Textarea 
                value={transPlaintext}
                onChange={(e) => setTransPlaintext(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="Enter text to encrypt/decrypt..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleTransEncrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Encrypt
              </Button>
              <Button onClick={handleTransDecrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Decrypt
              </Button>
            </div>
            {transEncrypted && (
              <div>
                <Label className="font-mono text-green-500">Encrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {transEncrypted}
                </div>
              </div>
            )}
            {transDecrypted && (
              <div>
                <Label className="font-mono text-green-500">Decrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {transDecrypted}
                </div>
              </div>
            )}
          </TabsContent>

          {/* RSA Tab */}
          <TabsContent value="rsa" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-green-500 font-mono text-sm">C = M^e mod n | M = C^d mod n</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 p-4 space-y-2">
              <p className="font-mono text-green-500 text-sm">Public Key: (e={rsaKeys.publicKey.e}, n={rsaKeys.publicKey.n})</p>
              <p className="font-mono text-green-500 text-sm">Private Key: (d={rsaKeys.privateKey.d}, n={rsaKeys.privateKey.n})</p>
              <Button onClick={handleRsaGenerateKeys} variant="outline" size="sm" className="font-mono border-green-500 text-green-500 hover:bg-green-500 hover:text-zinc-950">
                Generate New Keys
              </Button>
            </div>
            <div>
              <Label className="font-mono text-green-500">Plaintext</Label>
              <Textarea 
                value={rsaPlaintext}
                onChange={(e) => setRsaPlaintext(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="Enter text to encrypt/decrypt..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleRsaEncrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Encrypt
              </Button>
              <Button onClick={handleRsaDecrypt} className="flex-1 bg-green-500 hover:bg-green-600 text-zinc-950 font-mono">
                Decrypt
              </Button>
            </div>
            {rsaEncrypted && (
              <div>
                <Label className="font-mono text-green-500">Encrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all text-xs">
                  {rsaEncrypted}
                </div>
              </div>
            )}
            {rsaDecrypted && (
              <div>
                <Label className="font-mono text-green-500">Decrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all">
                  {rsaDecrypted}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
