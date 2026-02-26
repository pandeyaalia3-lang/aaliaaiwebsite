import { GoogleGenAI } from '@google/genai';
import { Film, LoaderCircle, AlertTriangle, KeyRound } from 'lucide-react';
import { useState } from 'react';

interface VideoGeneratorProps {
  ai: GoogleGenAI;
  apiKeySelected: boolean;
  onSelectApiKey: () => void;
}

export default function VideoGenerator({ ai, apiKeySelected, onSelectApiKey }: VideoGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleGenerateVideo = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setVideoUrl(null);
    setLoadingMessage('Initializing video generation...');

    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9',
        },
      });

      setLoadingMessage('Generating video... This may take a few minutes.');

      while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY!,
          },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        setError('Could not generate video. Please try a different prompt.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found')) {
        setError('API Key error. Please select a valid paid API key.');
        onSelectApiKey(); // Re-trigger key selection
      } else {
        setError('An error occurred while generating the video.');
      }
    }
    setLoading(false);
    setLoadingMessage('');
  };

  if (!apiKeySelected) {
    return (
      <section id="video-generator-onboarding">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Film size={28} className="text-pink-400" />
            <h2 className="text-3xl font-bold font-display tracking-tight">Video Generation</h2>
          </div>
          <p className="mb-4 text-gray-400">Video generation requires a paid Google Cloud project API key.</p>
          <p className="mb-6 text-sm text-gray-500">For more info, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400">billing documentation</a>.</p>
          <button
            onClick={onSelectApiKey}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-5 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            <KeyRound className="mr-2" size={16} />
            Select API Key
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="video-generator">
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
        <div className="flex items-center space-x-4 mb-6">
          <Film size={28} className="text-pink-400" />
          <h2 className="text-3xl font-bold font-display tracking-tight">Video Generation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label htmlFor="video-prompt" className="font-medium text-gray-300">Prompt</label>
            <textarea
              id="video-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-36 bg-gray-800 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
              placeholder="A cinematic shot of a car driving on a mountain road at dusk..."
              disabled={loading}
            ></textarea>
            <button
              onClick={handleGenerateVideo}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading || !prompt}
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  {loadingMessage}
                </>
              ) : (
                'Generate Video'
              )}
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center min-h-[256px]">
            {videoUrl ? (
              <video src={videoUrl} controls className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="text-center text-gray-500">
                <Film size={48} className="mx-auto mb-2" />
                <p>Your generated video will appear here</p>
              </div>
            )}
             {loading && !error && (
              <div className="text-center text-gray-400 p-4">
                <LoaderCircle className="animate-spin h-12 w-12 mx-auto mb-4 text-pink-400" />
                <p>{loadingMessage}</p>
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
