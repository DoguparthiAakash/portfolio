import { create } from "zustand";

export interface OSWindow {
  id: string;
  title: string;
  icon: any;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
}

interface OSState {
  windows: OSWindow[];
  highestZIndex: number;
  openApp: (app: Partial<OSWindow> & { id: string }) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  highestZIndex: 10,

  openApp: (app) => {
    const { windows, highestZIndex } = get();
    const newZIndex = highestZIndex + 1;

    // Check if app is already open
    const existingWindow = windows.find((w) => w.id === app.id);
    if (existingWindow) {
      set({
        highestZIndex: newZIndex,
        windows: windows.map((w) =>
          w.id === app.id
            ? { ...w, isMinimized: false, isFocused: true, zIndex: newZIndex }
            : { ...w, isFocused: false }
        ),
      });
      return;
    }

    // Default window sizes for mobile vs desktop
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const defaultWidth = isMobile ? window.innerWidth - 32 : 800;
    const defaultHeight = isMobile ? window.innerHeight - 100 : 600;
    
    // Calculate centered position
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1920;
    const screenH = typeof window !== "undefined" ? window.innerHeight : 1080;
    const defaultX = Math.max(0, (screenW - defaultWidth) / 2);
    const defaultY = Math.max(0, (screenH - defaultHeight) / 2 - 40);

    const newWindow: OSWindow = {
      id: app.id,
      title: app.title || "Unknown App",
      icon: app.icon || "Terminal",
      x: app.x ?? defaultX,
      y: app.y ?? defaultY,
      width: app.width ?? defaultWidth,
      height: app.height ?? defaultHeight,
      zIndex: newZIndex,
      isMinimized: false,
      isMaximized: isMobile, // Auto maximize on mobile
      isFocused: true,
    };

    set({
      highestZIndex: newZIndex,
      windows: [...windows.map(w => ({ ...w, isFocused: false })), newWindow],
    });
  },

  closeApp: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  minimizeApp: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      ),
    }));
  },

  maximizeApp: (id) => {
    const { highestZIndex, windows } = get();
    const newZIndex = highestZIndex + 1;
    
    set({
      highestZIndex: newZIndex,
      windows: windows.map((w) =>
        w.id === id
          ? { ...w, isMaximized: !w.isMaximized, isMinimized: false, isFocused: true, zIndex: newZIndex }
          : { ...w, isFocused: false }
      ),
    });
  },

  focusApp: (id) => {
    const { highestZIndex, windows } = get();
    const newZIndex = highestZIndex + 1;

    set({
      highestZIndex: newZIndex,
      windows: windows.map((w) =>
        w.id === id
          ? { ...w, isFocused: true, isMinimized: false, zIndex: newZIndex }
          : { ...w, isFocused: false }
      ),
    });
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    }));
  },

  updateWindowSize: (id, width, height) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    }));
  },
}));
