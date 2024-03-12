import { FastAverageColor } from "fast-average-color";

export const getPredominantColor = async (url: string) => {
  const fac = new FastAverageColor();
    const color = await fac.getColorAsync(url);
    return color.hex ?? "#000000";
};
