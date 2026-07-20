"use client";

import dynamic from "next/dynamic";
import { useOSStore } from "@/store/os-store";
import OSWindowComponent from "./Window";
import { Loader2 } from "lucide-react";

// Lazy load heavy applications
const AgentApp = dynamic(() => import("../apps/AgentApp"), {
  loading: () => <AppLoader />,
});
const NeuralGraphApp = dynamic(() => import("../apps/NeuralGraphApp"), {
  loading: () => <AppLoader />,
});
const JupyterApp = dynamic(() => import("../apps/JupyterApp"), {
  loading: () => <AppLoader />,
});
const LatentSpaceApp = dynamic(() => import("../apps/LatentSpaceApp"), {
  loading: () => <AppLoader />,
});
const MLOpsApp = dynamic(() => import("../apps/MLOpsApp"), {
  loading: () => <AppLoader />,
});

function AppLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center text-[var(--primary)]">
      <Loader2 className="h-8 w-8 animate-spin opacity-50" />
    </div>
  );
}

export default function WindowManager() {
  const { windows } = useOSStore();

  return (
    <>
      {windows.map((w) => {
        let Content = null;

        // Render the correct app based on componentName/id
        switch (w.id) {
          case "agent":
            Content = <AgentApp />;
            break;
          case "graph":
            Content = <NeuralGraphApp />;
            break;
          case "jupyter":
            Content = <JupyterApp />;
            break;
          case "latent":
            Content = <LatentSpaceApp />;
            break;
          case "mlops":
            Content = <MLOpsApp />;
            break;
          default:
            Content = (
              <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
                Application "{w.id}" not found.
              </div>
            );
        }

        return (
          <OSWindowComponent key={w.id} windowData={w}>
            {Content}
          </OSWindowComponent>
        );
      })}
    </>
  );
}
