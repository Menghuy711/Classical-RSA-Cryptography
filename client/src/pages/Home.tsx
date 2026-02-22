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
  rsaGenerateKeysWithPrimes,
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
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/UHgYopAfydDtbEgU.png" alt="RUPP Logo" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-xl font-mono font-bold text-green-500" style={{color: '#ffffff'}}>សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</span>
              <span className="text-xs font-mono text-green-400" style={{color: '#ffffff'}}>ROYAL UNIVERSITY OF PHNOM PENH</span>
            </div>
          </div>
          <div className="hidden md:flex gap-6 font-mono text-sm">
            <button onClick={() => scrollToSection("topics")} className="hover:text-green-400 transition-colors" style={{color: '#ffffff'}}>Topics</button>
            <button onClick={() => scrollToSection("members")} className="hover:text-green-400 transition-colors" style={{color: '#ffffff'}}>Member</button>
            <button onClick={() => scrollToSection("converter")} className="hover:text-green-400 transition-colors" style={{color: '#ffffff'}}>Converter</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-green-400 transition-colors" style={{color: '#ffffff'}}>About</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeInUp} className="flex flex-col items-center">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/UHgYopAfydDtbEgU.png" alt="RUPP Logo" className="w-24 h-24 mb-4 rounded-full object-cover" />
            <Badge variant="outline" className="mb-6 border-green-500 text-green-500 font-mono">
              Royal University of Phnom Penh
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-mono font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} style={{color: '#ffffff'}}
          >
            Classical <span className="text-green-500" style={{color: '#ffffff'}}>and</span> RSA<br style={{color: '#ffffff'}} />Cryptography
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-zinc-400 font-mono mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }} style={{color: '#00c951'}}
          >
            scroll down
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
            <motion.p variants={fadeInUp} className="text-center text-zinc-400 font-mono mb-12" style={{color: '#ffffff'}}>
              The team behind the cryptography
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Heang Sokun Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/HXWFwDiINOrRetRN.JPG" alt="Heang Sokun" className="w-full h-full object-cover" style={{height: '160px', borderColor: '#ffffff', backgroundColor: '#ffffff'}} />
                    </div>
                    <CardTitle className="text-green-500 font-mono">Heang Sokun</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Web Designer</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Hen Sopheap Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/abGDOqpqQosYXyRw.jpg" alt="Hen Sopheap" className="w-full h-full object-cover" style={{height: '160px'}} />
                    </div>
                    <CardTitle className="text-green-500 font-mono">Hen Sopheap</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Slide Designer & Tester</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Heng Liden Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/eplUvtPQIsyZUmdg.JPG" alt="Heng Liden" className="w-full h-full object-cover" style={{height: '155px'}} />
                    </div>
                    <CardTitle className="text-green-500 font-mono">Heng Liden</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Presenter</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Lor Menghuy Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/iKnBcXPfLDsxCYOt.JPG" alt="Lor Menghuy" className="w-full h-full object-cover" style={{height: '140px'}} />
                    </div>
                    <CardTitle className="text-green-500 font-mono">Lor Menghuy</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Web Designer</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Loy Lyza Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/zmUNWVEWiIOhlhFK.JPG" alt="Loy Lyza" className="w-full h-full object-cover" style={{height: '150px'}} />
                    </div>
                    <CardTitle className="text-green-500 font-mono">Loy Lyza</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Researcher & Tester</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
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
            <motion.p variants={fadeInUp} className="text-center text-zinc-400 font-mono mb-12" style={{color: '#ffffff'}}>
              Explore classical and modern encryption &   decryption methods
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
                  <Card 
                    onClick={() => setSelectedTopic(topic.title)}
                    className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300 hover:glow-green h-full cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center border border-green-500">
                          <topic.icon className="text-green-500" size={24} />
                        </div>
                        <Badge variant={topic.type === "Modern" ? "default" : "secondary"} className="font-mono" style={{color: '#000000', backgroundColor: '#0fa440'}}>
                          {topic.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-green-500 font-mono">{topic.title}</CardTitle>
                      <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>
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
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-4">
              ENCRYPTION & DECRYPTION <span className="text-green-500">CONVERTER</span>
            </h2>
            <p className="text-center text-zinc-400 font-mono mb-12" style={{color: '#ffffff'}}>
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
              <span className="text-green-500">About</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
              {/* Mr. LIM Seyha Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 text-center h-full">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/wKCjXbtZgVpUHhBR.png" alt="Mr.LIM Seyha" className="w-full h-full object-cover" style={{paddingTop: 'px', paddingRight: 'px', paddingBottom: 'px', paddingLeft: 'px', marginTop: 'px', marginRight: 'px', marginBottom: 'px', marginLeft: 'px', height: '160px'}} />
                    </div>
                    <CardTitle className="text-green-500 font-mono mb-2">Mr.LIM Seyha</CardTitle>
                      <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Special thanks to my Mathematics Lecturer for guidance and support</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Mr. UNG Sereysopea Card with Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 text-center h-full">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/iUMYhzArdzJEztcA.png" alt="Mr.UNG Sereysopea" className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-green-500 font-mono mb-2">Mr.UNG Sereysopea</CardTitle>
                      <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>This project incorporates source code originally developed by the developer and adapted for this implementation</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              {/* Our Teams Card with Group Photo - Top Layer */}
              <motion.div variants={fadeInUp} className="relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 text-center h-full">
                  <CardHeader>
                    <div className="w-full h-48 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/mYMfnfyRdDCCECaF.png" alt="Our Teams" className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-green-500 font-mono mb-2">Our teams</CardTitle>
                    <CardDescription className="text-zinc-400 font-mono" style={{color: '#ffffff'}}>Thank you for exploring our website</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/UHgYopAfydDtbEgU.png" alt="RUPP Logo" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-xl font-mono font-bold text-green-500" style={{color: '#ffffff'}}>សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</span>
                <span className="text-xs font-mono text-green-400" style={{color: '#ffffff'}}>ROYAL UNIVERSITY OF PHNOM PENH</span>
              </div>
            </div>
            
            <div className="flex gap-6 font-mono text-sm text-zinc-400">
              <button onClick={() => scrollToSection("topics")} className="hover:text-green-500 transition-colors" style={{color: '#ffffff'}}>Topics</button>
              <button onClick={() => scrollToSection("members")} className="hover:text-green-500 transition-colors" style={{color: '#ffffff'}}>Member</button>
              <button onClick={() => scrollToSection("converter")} className="hover:text-green-500 transition-colors" style={{color: '#ffffff'}}>Converter</button>
              <button onClick={() => scrollToSection("about")} className="hover:text-green-500 transition-colors" style={{color: '#ffffff'}}>About</button>
            </div>
            
            <div className="flex gap-4">
              <a href="https://link.payway.com.kh/ABAPAYnF417765k" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365465367/bbdKraAUYPhlQuTr.png" alt="ABA Bank" className="w-10 h-10 object-contain" />
              </a>
              <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400">
                <Github size={20} />
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-zinc-500 font-mono text-sm">
            <p style={{color: '#ffffff'}}>Built with &lt;ITE A5 Generation 11&gt;</p>
            <p className="mt-2" style={{color: '#ffffff'}}>© 2026 MathProject. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TopicDetails({ topic }: { topic: string }) {
  const topicData: Record<string, { meaning: string; formulas: string[]; history: string; imageUrl?: string; caption?: string }> = {
    "Caesar Cipher": {
      meaning: "A substitution cipher where each letter is shifted by a fixed number of positions (traditionally 3). It replaces each letter with the letter a fixed number of positions down the alphabet.",
      formulas: [
        "Encryption: E(x) = (x + 3) mod 26",
        "Decryption: D(x) = (x - 3) mod 26"
      ],
      history: "Created by Julius Caesar in the 1st century BC. Used for military communications in ancient Rome.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg",
      caption: "Julius Caesar – Roman general (100–44 BC)"
    },
    "General Shift": {
      meaning: "An extension of the Caesar cipher where the shift value can be any number from 0 to 25. Each letter is shifted by the same variable amount.",
      formulas: [
        "Encryption: E(x) = (x + k) mod 26, where k is the shift key",
        "Decryption: D(x) = (x - k) mod 26"
      ],
      history: "Generalization of Caesar cipher. Studied extensively in classical cryptography since the Middle Ages.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg",
      caption: "Julius Caesar – Early use of shift substitution"
    },
    "Affine Cipher": {
      meaning: "A substitution cipher combining multiplication and addition. Uses two keys (a, b) where a must be coprime to 26. More secure than shift ciphers due to two parameters.",
      formulas: [
        "Encryption: E(x) = (ax + b) mod 26, where gcd(a, 26) = 1",
        "Decryption: D(x) = a^(-1)(x - b) mod 26"
      ],
      history: "Developed as an enhancement to shift ciphers. Studied in classical cryptography as a more complex substitution method.",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%231a1a1a' width='200' height='200'/%3E%3Ctext x='100' y='60' font-size='48' fill='%2322c55e' text-anchor='middle' font-family='monospace' font-weight='bold'%3E%26%2310230%3B%3C/text%3E%3Ctext x='100' y='130' font-size='14' fill='%2388cc00' text-anchor='middle' font-family='monospace'%3E(ax %2B b) mod 26%3C/text%3E%3C/svg%3E",
      caption: "Based on modular arithmetic concepts (17th–19th century mathematics)"
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
      caption: "Rivest, Shamir, and Adleman – Inventors of RSA (1977)"
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
    <Card className="bg-zinc-900 border-zinc-800 max-w-4xl mx-auto hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <Tabs defaultValue="caesar" className="w-full">
          <TabsList className="grid grid-cols-5 w-full bg-zinc-800 mb-6 overflow-x-auto">
            <TabsTrigger value="caesar" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap" style={{color: '#ffffff'}}>Caesar Cipher</TabsTrigger>
            <TabsTrigger value="shift" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap" style={{color: '#ffffff'}}>General Shift Cipher</TabsTrigger>
            <TabsTrigger value="affine" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap" style={{color: '#ffffff'}}>Affine Cipher</TabsTrigger>
            <TabsTrigger value="trans" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap" style={{color: '#ffffff'}}>Transposition Cipher</TabsTrigger>
            <TabsTrigger value="rsa" className="font-mono text-xs data-[state=active]:bg-green-500 data-[state=active]:text-zinc-950 whitespace-nowrap" style={{color: '#ffffff'}}>RSA Cryptography</TabsTrigger>
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
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2" style={{color: '#ffffff'}}
              />
            </div>
            <div>
              <Label className="font-mono text-green-500">Plaintext</Label>
              <Textarea 
                value={shiftPlaintext}
                onChange={(e) => setShiftPlaintext(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                placeholder="Enter text to encrypt/decrypt..." style={{color: '#ffffff'}}
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
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all" style={{color: '#ffffff'}}>
                  {shiftEncrypted}
                </div>
              </div>
            )}
            {shiftDecrypted && (
              <div>
                <Label className="font-mono text-green-500">Decrypted Text</Label>
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all" style={{color: '#ffffff'}}>
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
                <div className="bg-zinc-800 border border-zinc-700 p-4 mt-2 font-mono text-green-500 break-all max-h-48 overflow-y-auto text-xs" style={{color: '#ffffff'}}>
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
          <TabsContent value="rsa" className="space-y-6">
            {/* Section 1: RSA Key Generation */}
            <div className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/50">
              <h3 className="text-lg font-mono text-green-500 mb-4 font-bold">RSA Key Generation Demo</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="font-mono text-green-500">First Prime (p)</Label>
                  <Input 
                    type="number"
                    value={rsaP}
                    onChange={(e) => setRsaP(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                    placeholder="e.g., 61"
                  />
                </div>
                <div>
                  <Label className="font-mono text-green-500">Second Prime (q)</Label>
                  <Input 
                    type="number"
                    value={rsaQ}
                    onChange={(e) => setRsaQ(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                    placeholder="e.g., 53"
                  />
                </div>
              </div>
              <Button onClick={handleRsaGenerateKeysWithPrimes} className="w-full bg-green-500 hover:bg-green-600 text-zinc-950 font-mono mb-4">
                Generate Key
              </Button>
              {rsaKeyGenError && (
                <div className="bg-red-900/30 border border-red-700 p-3 rounded mb-4">
                  <p className="font-mono text-red-400 text-sm">{rsaKeyGenError}</p>
                </div>
              )}
              {rsaE && rsaN && rsaD && (
                <div className="bg-zinc-700/50 p-4 rounded space-y-2">
                  <p className="font-mono text-green-400 text-sm">n = p × q = {rsaN}</p>
                  <p className="font-mono text-green-400 text-sm">φ(n) = (p-1)(q-1) = {rsaPhi}</p>
                  <p className="font-mono text-green-400 text-sm">Public Key (e, n): ({rsaE}, {rsaN})</p>
                  <p className="font-mono text-green-400 text-sm">Private Key (d, n): ({rsaD}, {rsaN})</p>
                </div>
              )}
            </div>

            {/* Section 2: RSA Encryption */}
            <div className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/50">
              <h3 className="text-lg font-mono text-green-500 mb-4 font-bold">RSA Encryption Demo</h3>
              <div className="text-center mb-4">
                <p className="text-green-500 font-mono text-sm">C = M^e mod n</p>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <Label className="font-mono text-green-500">Plaintext Message</Label>
                  <Input 
                    value={rsaEncryptMessage}
                    onChange={(e) => setRsaEncryptMessage(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                    placeholder="Enter message to encrypt"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-mono text-green-500">Public Exponent (e)</Label>
                    <Input 
                      value={rsaEncryptE}
                      onChange={(e) => setRsaEncryptE(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                      placeholder="e"
                    />
                  </div>
                  <div>
                    <Label className="font-mono text-green-500">Modulus (n)</Label>
                    <Input 
                      value={rsaEncryptN}
                      onChange={(e) => setRsaEncryptN(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                      placeholder="n"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleRsaEncryptDemo} className="w-full bg-green-500 hover:bg-green-600 text-zinc-950 font-mono mb-4">
                Encrypt
              </Button>
              {rsaEncryptResult && (
                <div>
                  <Label className="font-mono text-green-500">Encrypted Ciphertext</Label>
                  <div className="bg-zinc-800 border border-zinc-700 p-3 mt-2 font-mono text-green-500 break-all text-xs max-h-24 overflow-y-auto">
                    {rsaEncryptResult}
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: RSA Decryption */}
            <div className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/50">
              <h3 className="text-lg font-mono text-green-500 mb-4 font-bold">RSA Decryption Demo</h3>
              <div className="text-center mb-4">
                <p className="text-green-500 font-mono text-sm">M = C^d mod n</p>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <Label className="font-mono text-green-500">Ciphertext</Label>
                  <Textarea 
                    value={rsaDecryptCiphertext}
                    onChange={(e) => setRsaDecryptCiphertext(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                    placeholder="Enter ciphertext to decrypt"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-mono text-green-500">Private Exponent (d)</Label>
                    <Input 
                      value={rsaDecryptD}
                      onChange={(e) => setRsaDecryptD(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                      placeholder="d"
                    />
                  </div>
                  <div>
                    <Label className="font-mono text-green-500">Modulus (n)</Label>
                    <Input 
                      value={rsaDecryptN}
                      onChange={(e) => setRsaDecryptN(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-green-500 font-mono mt-2"
                      placeholder="n"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleRsaDecryptDemo} className="w-full bg-green-500 hover:bg-green-600 text-zinc-950 font-mono mb-4">
                Decrypt
              </Button>
              {rsaDecryptResult && (
                <div>
                  <Label className="font-mono text-green-500">Decrypted Message</Label>
                  <div className="bg-zinc-800 border border-zinc-700 p-3 mt-2 font-mono text-green-500 break-all">
                    {rsaDecryptResult}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
