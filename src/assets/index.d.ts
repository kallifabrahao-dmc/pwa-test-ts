declare module "*.png" {
  const value: string; // or another type depending on how you're using the image
  export default value;
}

declare module "./src/assets" {
  export const img1: string;
  export const img2: string;
}
