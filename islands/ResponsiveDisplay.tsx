import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function ResponsiveDisplay({ houses }: { houses: string[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const [houseIndex, setHouseIndex] = useState(0);
  const [jsonData, setJsonData] = useState<any>(null);
  const photoIndex = useSignal(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(globalThis.innerWidth / globalThis.innerHeight <= 1);
    };

    handleResize(); // Check initial aspect ratio
    globalThis.addEventListener("resize", handleResize);

    return () => {
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchHouseData = async () => {
      const response = await fetch(`/api/house/${houses[houseIndex]}`);
      if (response.ok) {
        const data = await response.json();
        setJsonData(data);
        photoIndex.value = 0; // Reset photo index to 0 when switching houses
      } else {
        console.error("Failed to fetch house data");
      }
    };

    fetchHouseData();
  }, [houseIndex]);

  useEffect(() => {
    const preloadNextHouse = async () => {
      const nextHouseIndex = (houseIndex + 1) % houses.length;
      const response = await fetch(`/api/house/${houses[nextHouseIndex]}`);
      if (response.ok) {
        const data = await response.json();
        const preloadLink = document.createElement("link");
        preloadLink.href = `house${data.id}/${data.images[0]}`;
        preloadLink.rel = "preload";
        preloadLink.as = "image";
        document.head.appendChild(preloadLink);
        return () => {
          document.head.removeChild(preloadLink);
        };
      }
    };

    preloadNextHouse();
  }, [houseIndex, houses.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setHouseIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : houses.length - 1));
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setHouseIndex((prevIndex) => (prevIndex < houses.length - 1 ? prevIndex + 1 : 0));
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touchStartX = event.touches[0].clientX;
      const touchStartY = event.touches[0].clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const touchEndX = moveEvent.changedTouches[0].clientX;
        const touchEndY = moveEvent.changedTouches[0].clientY;

        if (touchStartX - touchEndX > 50) {
          setHouseIndex((prevIndex) => (prevIndex < houses.length - 1 ? prevIndex + 1 : 0));
        } else if (touchEndX - touchStartX > 50) {
          setHouseIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : houses.length - 1));
        } else if (touchStartY - touchEndY > 50) {
          setHouseIndex((prevIndex) => (prevIndex < houses.length - 1 ? prevIndex + 1 : 0));
        }
      };

      globalThis.addEventListener("touchend", handleTouchMove, { once: true });
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    globalThis.addEventListener("touchstart", handleTouchStart);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
      globalThis.removeEventListener("touchstart", handleTouchStart);
    };
  }, [houseIndex, houses.length]);

  useEffect(() => {
    if (jsonData) {
      jsonData.images.forEach((href: any) => {
        const preloadLink = document.createElement("link");
        preloadLink.href = `house${jsonData.id}/${href}`;
        preloadLink.rel = "preload";
        preloadLink.as = "image";
        document.head.appendChild(preloadLink);
        return () => {
          document.head.removeChild(preloadLink);
        };
      });
    }
  }, [jsonData]);

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  const backgroundImg = `linear-gradient(0deg, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0) 75%), url("house${jsonData.id}/${jsonData.images[photoIndex.value]}")`;

  return (
    <div class={isMobile ? "mobile" : "desktop"} style={{
      backgroundImage: backgroundImg,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }} onClick={() => photoIndex.value = (photoIndex.value + 1) % jsonData.images.length}>
      <div class="lower-third">
        <div class="title">{jsonData.address}</div>
        <div class="information">
          <div class="beds">
            <svg height="1.25ch" viewBox="0 0 24 15" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" aria-labelledby="e68368da-7698-43ed-b3e7-737eb020b5e9">
              <title id="e68368da-7698-43ed-b3e7-737eb020b5e9">Bedroom</title>
              <path transform="translate(0,-7.1)" fill-rule="evenodd" clip-rule="evenodd" d="M6.86 7.25A2.75 2.75 0 004.11 10v1.647a2.751 2.751 0 00-1.86 2.603v7a.75.75 0 001.5 0V19h16.5v2.25a.75.75 0 001.5 0v-7a2.75 2.75 0 00-1.783-2.575V10a2.75 2.75 0 00-2.75-2.75H14.04c-.788 0-1.5.332-2 .863a2.743 2.743 0 00-2.001-.863h-3.18zM20.25 17.5v-3.25c0-.69-.56-1.25-1.25-1.25H5c-.69 0-1.25.56-1.25 1.25v3.25h16.5zM18.467 10v1.5H12.79V10c0-.69.56-1.25 1.25-1.25h3.178c.69 0 1.25.56 1.25 1.25zm-7.18 1.5V10c0-.69-.559-1.25-1.25-1.25H6.86c-.69 0-1.25.56-1.25 1.25v1.5h5.679z" fill="currentColor"></path>
            </svg> 
            {jsonData.bedrooms}
          </div>
          <div class="baths">
            <svg width="2ch" viewBox="0 0 24 20.6" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" aria-labelledby="c7edd831-b7ee-4272-b0a7-cdfe73a4b904">
              <title id="c7edd831-b7ee-4272-b0a7-cdfe73a4b904">Bathroom</title>
              <path transform="translate(0,-1.3)" d="M4.75 13.993h14.5v1.25a4.25 4.25 0 01-4.25 4.25H9a4.25 4.25 0 01-4.25-4.25v-1.25zm-.75 0h16a1.25 1.25 0 000-2.5H4a1.25 1.25 0 100 2.5z" stroke="currentColor"></path>
              <path transform="translate(0,-1.3)" fill-rule="evenodd" clip-rule="evenodd" d="M9.06 20.21l-1.236 1.316a.75.75 0 01-1.093-1.027l1.236-1.316 1.094 1.027zm5.88 0l1.236 1.316a.75.75 0 001.093-1.027l-1.236-1.316-1.094 1.027z" fill="currentColor" ></path>
              <path transform="translate(0,-1.3)" d="M13.623 4.495l.814-.814a1.372 1.372 0 111.94 1.941l-.813.814-1.94-1.94z" stroke="currentColor"></path>
              <path transform="translate(0,-1.3)" d="M16.5 3.743l.9-.762c1.2-1.181 1.6-.866 1.6.393v7.87" stroke="currentColor"></path>
            </svg> 
            {jsonData.bathrooms}
          </div>
          <div class="size">{jsonData.size} m²</div>
        </div>
      </div>
    </div>
  );
}