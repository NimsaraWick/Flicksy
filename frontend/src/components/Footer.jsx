const Footer = () => {
  return (
    <footer className="text-whiteinset-0 z-0" style={{background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)"}}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-white">Flicksy 🎬</h2>
          <p className="mt-2 text-sm text-sky-200">
            Your go-to platform for trending movies, classics, and all-time favorites.
            Stream. Rate. Enjoy.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-sky-200 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Movies</a></li>
            <li><a href="#" className="hover:text-white">Series</a></li>
            <li><a href="#" className="hover:text-white">Genres</a></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-2">My Account</h3>
          <ul className="space-y-1 text-sky-200 text-sm">
            <li><a href="#" className="hover:text-white">Login</a></li>
            <li><a href="#" className="hover:text-white">Sign Up</a></li>
            <li><a href="#" className="hover:text-white">Watchlist</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <ul className="space-y-1 text-sky-200 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
            <li className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sky-700 mt-8 py-4 text-center text-sm text-sky-300">
        © 2025 Flicksy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
