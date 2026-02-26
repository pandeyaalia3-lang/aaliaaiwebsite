import { GoogleGenAI } from '@google/genai';
import { ImageIcon, LoaderCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ImageGeneratorProps {
  ai: GoogleGenAI;
}

export default function ImageGenerator({ ai }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      const imagePart = response.candidates?.[0]?.content?.parts?.find(
        (part) => part.inlineData
      );

      if (imagePart && imagePart.inlineData) {
        const base64Image = imagePart.inlineData.data;
        setImageUrl(`data:image/png;base64,${base64Image}`);
      } else {
        setError('Could not generate image. Please try a different prompt.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the image.');
    }
    setLoading(false);
  };

  return (
    <section id="image-generator">
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
        <div className="flex items-center space-x-4 mb-6">
          <ImageIcon size={28} className="text-indigo-400" />
          <h2 className="text-3xl font-bold font-display tracking-tight">Image Generation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label htmlFor="image-prompt" className="font-medium text-gray-300">Prompt</label>
            <textarea
              id="image-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-36 bg-gray-800 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="A futuristic cityscape at sunset, cinematic lighting, hyperrealistic..."
              disabled={loading}
            ></textarea>
            <button
              onClick={handleGenerateImage}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading || !prompt}
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center min-h-[256px]">
            {imageUrl ? (
              <img src={imageUrl} alt="Generated image" className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="text-center text-gray-500">
                <ImageIcon size={48} className="mx-auto mb-2" />
                <p>Your generated image will appear here</p>
              </div>
            )}
            {error && (
              <div className="p-4 text-red-300 flex items-center space-x-2">
                <AlertTriangle />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
