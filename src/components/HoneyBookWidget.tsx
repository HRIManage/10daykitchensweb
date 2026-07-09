"use client";

import { useEffect } from "react";
import {
  HONEYBOOK_CONTACT_PLACEMENT_CLASS,
  HONEYBOOK_PIXEL_SRC,
  HONEYBOOK_PLACEMENT_SCRIPT_SRC,
  HONEYBOOK_WIDGET_PID,
} from "@/lib/honeybook";

declare global {
  interface Window {
    _HB_?: { pid?: string };
  }
}

/**
 * Embeds the HoneyBook lead-capture widget (the official snippet, adapted for
 * client-side routing). The vendor snippet waits for `window.load`, which only
 * fires once per full page load — on a Next.js client-side navigation it has
 * already fired, so this re-runs the same injection on every mount instead and
 * re-adds the controller script each time so it re-scans the DOM for this
 * instance's placement div. The placement class is the exact one configured on
 * HoneyBook's side for this widget — do not regenerate per instance.
 */
export default function HoneyBookWidget({ className }: { className?: string }) {
  useEffect(() => {
    const inject = () => {
      window._HB_ = window._HB_ || {};
      window._HB_.pid = HONEYBOOK_WIDGET_PID;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = HONEYBOOK_PLACEMENT_SCRIPT_SRC;
      document.body.appendChild(script);
    };

    const timer = window.setTimeout(inject, 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      <div className={HONEYBOOK_CONTACT_PLACEMENT_CLASS} />
      <img
        height={1}
        width={1}
        style={{ display: "none" }}
        src={HONEYBOOK_PIXEL_SRC}
        loading="lazy"
        alt=""
      />
    </div>
  );
}
