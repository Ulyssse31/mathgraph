"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Desmos: any;
  }
}

export default function DesmosEmbed({ expression }: { expression: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let calculator: any = null;

    function initDesmos() {
      if (!containerRef.current || !window.Desmos) return;
      containerRef.current.innerHTML = "";
      calculator = window.Desmos.GraphingCalculator(containerRef.current, {
        expressions: false,
        settingsMenu: false,
        zoomButtons: true,
        lockViewport: false,
      });
      calculator.setExpression({ id: "graph1", latex: expression });
    }

    if (!window.Desmos) {
      const script = document.createElement("script");
      script.src = "https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      script.async = true;
      script.onload = initDesmos;
      document.body.appendChild(script);
    } else {
      initDesmos();
    }

    return () => {
      if (calculator) calculator.destroy();
    };
  }, [expression]);

  return <div ref={containerRef} className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 my-4" />;
}
