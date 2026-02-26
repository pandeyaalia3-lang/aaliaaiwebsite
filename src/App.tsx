/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import Footer from './components/Footer';
import Showcase from './components/Showcase';
import VideoGenerator from './components/VideoGenerator';
import './types';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set');
}

export default function App() {
  const [ai, setAi] = useState(new GoogleGenAI({ apiKey }));
  const [apiKeySelected, setApiKeySelected] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
    };
    checkApiKey();
  }, []);

  const handleKeySelection = async () => {
    await window.aistudio.openSelectKey();
    setApiKeySelected(true);
    // Re-initialize the AI client with the new key
    setAi(new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! }));
  };

  return (
    <div className="bg-black min-h-screen font-sans text-white">
      <Header />
      <main className="max-w-5xl mx-auto p-8 space-y-16">
        <Showcase />
        <div className="space-y-12">
          <ImageGenerator ai={ai} />
          <VideoGenerator
            ai={ai}
            apiKeySelected={apiKeySelected}
            onSelectApiKey={handleKeySelection}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

