/**
 * RGB转Hex
 * @param r 红色
 * @param g 绿色
 * @param b 蓝色
 */
export function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
