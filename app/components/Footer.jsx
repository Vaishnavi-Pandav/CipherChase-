import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-sm font-mono" style={{ color: "rgba(200,180,160,0.5)" }}>
      <p>
        Developed by{" "}
        <span className="font-semibold" style={{ color: "#cc0000" }}>
          COSMOS
        </span>
      </p>
      <p className="mt-3 text-xs" style={{ color: "rgba(139,0,0,0.35)" }}>
        © 2026 CipherChase — All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
