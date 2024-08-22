import { containerRefAtom, containerSizeAtom } from "@/lib/jotai-service";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

const useContainer = () => {
  const containerRef = useAtomValue(containerRefAtom);
  const [containerSize, setContainerSize] = useAtom(containerSizeAtom);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight, offsetTop } = containerRef.current;
        setContainerSize({
          width: offsetWidth,
          height: offsetHeight - offsetTop,
        });
      }
    };

    // Update on initial render and window resize
    updateSize();
    window.addEventListener("resize", updateSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateSize);
  }, [containerRef, setContainerSize]);

  return { containerRef, containerSize };
};

export default useContainer;
