/**
 * Calculates the hue value for the HSL color space based on the RGB values.
 *
 * @param {number} delta - The difference between the maximum and minimum RGB values.
 * @param {number} cmax - The maximum RGB value among r, g, and b.
 * @param {number} r - The red component of the RGB color.
 * @param {number} g - The green component of the RGB color.
 * @param {number} b - The blue component of the RGB color.
 * @returns {number} The calculated hue value in degrees [0, 360).
 */
const calculateHue = (delta: number, cmax: number, r: number, g: number, b: number): number => {
  let result = 0;

  // no deference
  if (delta === 0) {
    return 0;
  }

  if (cmax === r) {
    result = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    result = (b - r) / delta + 2;
  } else if (cmax === b) {
    result = (r - g) / delta + 4;
  }

  const rounded = Math.round(result * 60);

  if (rounded < 0) {
    return rounded + 360  
  }

  return rounded;
};

const stringHSL = (hue: number, saturation: number, lightness: number) =>
  `hsl(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;

const stringHSLA = (hue: number, saturation: number, lightness: number, alpha: number) =>
  `hsla(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${Math.round(alpha * 10) / 10})`;

/**
 * Calculates the lightness value for the HSL color space.
 *
 * @param {number} cmax - The maximum RGB value among r, g, and b.
 * @param {number} cmin - The minimum RGB value among r, g, and b.
 * @returns {number} The calculated lightness value in the range [0, 1].
 */
const calculateLightness = (cmax: number, cmin: number): number => (cmax + cmin) / 2;

/**
 * Calculates the saturation value for the HSL color space.
 *
 * @param {number} delta - The difference between the maximum and minimum RGB values.
 * @param {number} lightness - The calculated lightness value.
 * @returns {number} The calculated saturation value in the range [0, 1].
 */
const calculateSaturation = (delta: number, lightness: number) =>
  delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness -1));

/**
 * Converts an RGB color to HSL format.
 *
 * @param {ColorTokenValue} color - The RGB color to be converted.
 * @returns {string} The HSL representation of the input RGB color.
 */
const rgbToHsl = (color: ColorTokenValue): string => {
  const { r: _r, g: _g, b: _b, a: _a } = color;

  const r = _r / 255;
  const g = _g / 255;
  const b = _b / 255;
  const a = _a / 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  const hue = calculateHue(delta, cmax, r, g, b);
  const _lightness = calculateLightness(cmax, cmin);
  const _saturation = calculateSaturation(delta, _lightness);

  // Multiply lightness and saturation by 100
  const lightness = +(_lightness * 100).toFixed(1);
  const saturation = +(_saturation * 100).toFixed(1);

  // If color has alpha 1 retun HSL and when some alpha is included return HSLA
  return a === 1 ? stringHSL(hue, saturation, lightness) : stringHSLA(hue, saturation, lightness, a);
};

export default rgbToHsl;
