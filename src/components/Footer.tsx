export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-5xl mx-auto px-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} aalia.ai. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
