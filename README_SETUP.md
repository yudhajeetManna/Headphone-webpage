# Zenith X Scrollytelling Setup

## 1. Install Dependencies
The project requires `framer-motion`.
```bash
npm install framer-motion
```

## 2. Add Image Sequence
Place your 120 frame images in `public/frames/`.
Naming convention: `frame_[i]_delay-0.04s.webp`
Where `[i]` is the index from 0 to 119.

Example:
- `public/frames/frame_0_delay-0.04s.webp`
- ...
- `public/frames/frame_119_delay-0.04s.webp`

## 3. Run
```bash
npm run dev
```
