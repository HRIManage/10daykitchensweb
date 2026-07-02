"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    _HB_?: { pid?: string };
  }
}

export default function HoneyBookWidget({ className }: { className?: string }) {
  useEffect(() => {
    // HoneyBook placement script injection
    window._HB_ = window._HB_ || {};
    window._HB_.pid = "698386a789407f0007b175e0";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js";
    
    // Insert script to not block page render
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.body.appendChild(script);
    }

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className={className}>
      <div className="hb-p-698386a789407f0007b175e0-2" />
      <img
        height={1}
        width={1}
        style={{ display: "none" }}
        src="https://www.honeybook.com/p.png?pid=698386a789407f0007b175e0"
        loading="lazy"
        alt=""
      />
    </div>
  );
}
