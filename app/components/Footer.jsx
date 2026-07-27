import React from "react";
import Linkedin01Icon from "@/public/svg/Linkedin01Icon";
import InstagramIcon from "@/public/svg/InstagramIcon";
import GithubIcon from "@/public/svg/GithubIcon";

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-sm font-mono" style={{ color: "rgba(200,180,160,0.5)" }}>
      <p>
        Developed with{" "}
        <span style={{ color: "#cc0000" }}>{"<"}3{"/>"}</span> by{" "}
        <a
          href="https://github.com/rishabhgokhe"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold transition-colors hover:underline"
          style={{ color: "#cc0000" }}
        >
          Rishabh
        </a>
      </p>

      <div className="flex justify-center gap-5 mt-3 text-lg items-center">
        <p>Follow me :</p>
        <a
          href="https://github.com/rishabhgokhe"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: "rgba(200,180,160,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#cc0000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,180,160,0.5)")}
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/rishabh-gokhe"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: "rgba(200,180,160,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,180,160,0.5)")}
        >
          <Linkedin01Icon />
        </a>
        <a
          href="https://www.instagram.com/rishabh_gokhe/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: "rgba(200,180,160,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#cc0000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,180,160,0.5)")}
        >
          <InstagramIcon />
        </a>
      </div>

      <p className="mt-3 text-xs" style={{ color: "rgba(139,0,0,0.35)" }}>
        © 2026 CipherChase — All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
