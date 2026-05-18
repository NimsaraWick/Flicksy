import { Moon, Mail, Globe, MessageSquare, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-mirage-obsidian border-t border-white/5 font-sans relative overflow-hidden">
      <div className="absolute inset-0 mirage-gradient opacity-10" />
      
      <div className="max-w-7xl mx-auto px-12 py-32 grid grid-cols-1 md:grid-cols-4 gap-24 relative z-10">
        
        {/* Logo and Curated Statement */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-10">
            <Moon className="text-mirage-gold" size={18} />
            <span className="text-2xl font-serif italic text-white tracking-[0.2em]">Flicksy</span>
          </div>
          <p className="text-mirage-silver/30 text-[10px] leading-loose tracking-[0.2em] uppercase font-light">
            A sanctuary for the cinematic arts. <br />
            Hand-selected, refined, and <br />
            preserved for the visionary.
          </p>
        </div>

        {/* Navigation: The Map */}
        <div>
          <h3 className="text-mirage-gold text-[10px] tracking-[0.6em] font-light uppercase mb-10">The_Map</h3>
          <ul className="space-y-6 text-mirage-silver/20 text-[10px] tracking-[0.3em] uppercase font-light">
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">Overview</a></li>
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">The_Cinema</a></li>
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">Master_Series</a></li>
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">The_Vault</a></li>
          </ul>
        </div>

        {/* Membership: The Estate */}
        <div>
          <h3 className="text-mirage-gold text-[10px] tracking-[0.6em] font-light uppercase mb-10">The_Estate</h3>
          <ul className="space-y-6 text-mirage-silver/20 text-[10px] tracking-[0.3em] uppercase font-light">
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">Entry</a></li>
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">Join_Void</a></li>
            <li><a href="#" className="hover:text-mirage-gold transition-all duration-500">Reserve_List</a></li>
          </ul>
        </div>

        {/* Connection: The Link */}
        <div>
          <h3 className="text-mirage-gold text-[10px] tracking-[0.6em] font-light uppercase mb-10">The_Link</h3>
          <div className="flex gap-10 text-mirage-silver/20 mb-10">
            <a href="#" className="hover:text-mirage-gold transition-all duration-500"><Mail size={16} strokeWidth={1} /></a>
            <a href="#" className="hover:text-mirage-gold transition-all duration-500"><Globe size={16} strokeWidth={1} /></a>
            <a href="#" className="hover:text-mirage-gold transition-all duration-500"><MessageSquare size={16} strokeWidth={1} /></a>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="text-mirage-gold/20" size={12} />
            <p className="text-[8px] text-mirage-silver/10 tracking-[0.5em] uppercase font-light">
              Estate_Global_Sync_Active
            </p>
          </div>
        </div>
      </div>

      {/* Signature: The Seal */}
      <div className="border-t border-white/5 py-12 text-center relative z-10">
        <p className="text-[9px] text-mirage-silver/10 tracking-[0.8em] font-light uppercase">
          © 2026 FLICKSY_MIRAGE // REFINED_CINEMA_ESTATE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
