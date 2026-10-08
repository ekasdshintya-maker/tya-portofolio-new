import { ImageResponse } from "next/og";

export const alt = "Shintya — Web Developer Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "#e879f9",
            marginBottom: 20,
          }}
        >
          CREATIVE WEB DEVELOPER
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
          }}
        >
          SHINTYA.
        </div>

        <div
          style={{
            marginTop: 25,
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          Personal Portfolio Website
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}