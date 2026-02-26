const showcaseItems = [
  {
    prompt: 'A majestic lion wearing a crown, photorealistic, 4k',
    imageUrl: 'https://picsum.photos/seed/lion/500/500',
  },
  {
    prompt: 'A futuristic cityscape on a distant planet, neon lights, flying vehicles',
    imageUrl: 'https://picsum.photos/seed/city/500/500',
  },
  {
    prompt: 'An enchanted forest with glowing mushrooms and mystical creatures, fantasy art',
    imageUrl: 'https://picsum.photos/seed/forest/500/500',
  },
  {
    prompt: 'A robot orchestra playing classical music in a grand hall, detailed illustration',
    imageUrl: 'https://picsum.photos/seed/robot/500/500',
  },
];

export default function Showcase() {
  return (
    <section id="showcase">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold font-display tracking-tight">Latest Creations</h2>
        <p className="text-gray-400 mt-2">Discover what's possible with aalia.ai</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {showcaseItems.map((item, index) => (
          <div key={index} className="group relative aspect-square rounded-lg overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.prompt} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.prompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
