import React from "react";
import Linkedin01Icon from "@/public/svg/Linkedin01Icon";
import InstagramIcon from "@/public/svg/InstagramIcon";
import GithubIcon from "@/public/svg/GithubIcon";

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-sm text-gray-400 font-mono">
      <p>
        Developed with <span className="text-cyan-400">{"<"}3{"/>"}</span> by{" "}
        <a
          href="https://github.com/rishabhgokhe"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
        >
          Rishabh
        </a>
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-5 mt-3 text-lg">
        <p>Follow me : </p>
        <a
          href="https://github.com/rishabhgokhe"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/rishabh-gokhe"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          <Linkedin01Icon />
        </a>
        <a
          href="https://www.instagram.com/rishabh_gokhe/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition-colors"
        >
          <InstagramIcon />
        </a>
      </div>
      <p className="mt-3 text-xs text-cyan-500/30">© 2025 CipherChase — All rights reserved</p>
    </footer>
  );
};

export default Footer;
