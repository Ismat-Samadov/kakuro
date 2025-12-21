import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '22%',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="4" width="4" height="4" fill="white" />
          <rect x="12" y="4" width="4" height="4" fill="white" />
          <rect x="4" y="12" width="4" height="4" fill="white" />
          <rect x="8" y="12" width="4" height="4" fill="white" />
          <rect x="12" y="12" width="4" height="4" fill="white" />
          <rect x="16" y="12" width="4" height="4" fill="white" />
          <rect x="8" y="16" width="4" height="4" fill="white" />
          <rect x="12" y="16" width="4" height="4" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
