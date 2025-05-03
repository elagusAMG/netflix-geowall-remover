import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ChromeExtension() {
  const [tabId, setTabId] = useState<number | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        setTabId(tab.id);
      }
    });
  }, []);

  const removeElement = () => {
    if (!tabId) return;

    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const modal = document.querySelector(".netflix-sans-font-loaded");
        if (modal) modal.remove();
      },
    });
  };

  const playVideo = () => {
    if (!tabId) return;

    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const video = document.querySelector<HTMLVideoElement>("video");
        if (video) video.play();
      },
    });
  };

  const pauseVideo = () => {
    if (!tabId) return;

    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const video = document.querySelector<HTMLVideoElement>("video");
        if (video) video.pause();
      },
    });
  };

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">DOM Actions</h1>
      <Button onClick={removeElement}>Remove Element</Button>
      <Button onClick={playVideo}>Play video</Button>
      <Button onClick={pauseVideo}>Pause video</Button>
    </div>
  );
}
