declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.png?url' {
  const src: string;
  export default src;
}

declare module '*.tmj' {
  const value: any; // Or a more specific Tiled map type if you have one
  export default value;
} 