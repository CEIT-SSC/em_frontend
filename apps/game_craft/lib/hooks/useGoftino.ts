import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const WIDGET_ID = "pbMzMN";

declare global {
  interface Window {
    Goftino?: {
      setUser: (userData: {
        email?: string;
        name?: string;
        phone?: string;
        tags?: string[];
        metadata?: { key: string; value: string }[];
        avatar?: string;
        about?: string;
        forceUpdate?: boolean;
      }) => void;
    };
  }
}

export function useGoftino() {
  const [isGoftinoReady, setIsGoftinoReady] = useState(false);
  const session = useSession();

  const removeAllGoftinoScripts = (element) => {
    if (!element) return;
    const { id } = element;
    if (id && (id === "goftino" || id === "goftino_w")) {
      removeElem(element);
    }
  };

  const removeGoftinoElements = useCallback((): void => {
    setIsGoftinoReady(false);
    getAllTags("script", removeAllGoftinoScripts);
    getAllTags("iframe", removeAllGoftinoScripts);
    getAllTags("style", removeAllGoftinoScripts);
  }, []);

  const loadGoftino = useCallback(() => {
    const scriptElement = document.createElement("script");
    const widgetUrl = "https://www.goftino.com/widget/" + WIDGET_ID;
    const localStorageKey = "goftino_" + WIDGET_ID;
    const localStorageValue = localStorage.getItem(localStorageKey);

    scriptElement.id = "goftino";
    scriptElement.async = true;
    scriptElement.src = localStorageValue
      ? widgetUrl + "?o=" + localStorageValue
      : widgetUrl;

    document.getElementsByTagName("head")[0].appendChild(scriptElement);
  }, []);

  const restartGoftino = useCallback(() => {
    setIsGoftinoReady(false);
    removeGoftinoElements();
    loadGoftino();
  }, [removeGoftinoElements, loadGoftino]);

  useEffect(() => {
    restartGoftino();

    function handleGoftinoReady() {
      if (session.status === "authenticated") {
        const { user } = session.data;
        // console.log("!@! user data to goftino", {
        //   email: user.email,
        //   name: user.name,
        //   forceUpdate: true,
        // });
        window.Goftino?.setUser({
          email: user.email,
          name: user.name,
          tags: ["gamecraft", "user"],
          forceUpdate: true,
        });
      }

      setIsGoftinoReady(true);
    }

    if (document.readyState === "complete") {
      loadGoftino();
    } else {
      window.addEventListener("load", loadGoftino);
    }

    window.addEventListener("goftino_ready", handleGoftinoReady);

    return () => {
      window.removeEventListener("goftino_ready", handleGoftinoReady);
    };
  }, [session, restartGoftino, loadGoftino]);

  return { isGoftinoReady };
}

export const getAllTags = (tagName: string, cb) => {
  const elements = document.getElementsByTagName(tagName);
  const elementsArray = Array.prototype.slice.call(elements);
  elementsArray.forEach(cb);
};

export const removeElem = (element: Node): Node =>
  element.parentNode!.removeChild(element);

export const getElemById = (elemId: string): Node | null =>
  document.getElementById(elemId);
