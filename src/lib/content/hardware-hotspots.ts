/** Prototype interactive callouts — unlinked /hardware page */

export type HardwareHotspot = {
  id: string;
  label: string;
  body: string;
  /** Percent from left / top of the image */
  x: number;
  y: number;
};

export type HardwareView = {
  id: string;
  label: string;
  src: string;
  alt: string;
  hotspots: HardwareHotspot[];
};

export const HARDWARE_HOTSPOT_VIEWS: HardwareView[] = [
  {
    id: "scroll",
    label: "Scroll side",
    src: "/images/renders/shop/a_3.jpg",
    alt: "Loup scroll dial and answer button side",
    hotspots: [
      {
        id: "scroll",
        label: "Tactile click scroll",
        body: "Knurled dial to move through approved contacts — one click per name.",
        x: 50,
        y: 32,
      },
      {
        id: "answer",
        label: "Call answer",
        body: "Press to start or end a call. No apps, no swipe gymnastics.",
        x: 50,
        y: 48,
      },
    ],
  },
  {
    id: "volume",
    label: "Volume side",
    src: "/images/renders/shop/a_1.jpg",
    alt: "Loup volume rocker and mute toggle side",
    hotspots: [
      {
        id: "volume",
        label: "Volume",
        body: "+ / − rocker for call volume. Physical feedback, always.",
        x: 50,
        y: 30,
      },
      {
        id: "mute",
        label: "Mute toggle",
        body: "Slide to mute the mic mid-call — or keep things quiet when needed.",
        x: 50,
        y: 48,
      },
    ],
  },
  {
    id: "bottom",
    label: "Bottom",
    src: "/images/renders/shop/a_bottom.jpg",
    alt: "Loup USB-C charging port on the bottom edge",
    hotspots: [
      {
        id: "mic1",
        label: "Mic 1",
        body: "Bottom mic for clear voice pickup when the phone is in hand or on a table.",
        x: 38,
        y: 50,
      },
      {
        id: "usbc",
        label: "USB-C charging",
        body: "Charges in about 70 minutes. Same cable as most modern devices.",
        x: 50,
        y: 50,
      },
    ],
  },
];
