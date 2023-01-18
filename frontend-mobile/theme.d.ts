interface ColorModel {
  /** #EC67B1 */
  primary: string;
  /** '#333333' */
  secondary: string;
  /** '#554994' */
  nav: string;
  /** '#8E8E8E' */
  description: string;
  /** rgba(255,255,255,1) */
  white: string;
  /** rgba(174,226,154,255) */
  success: string;
  /** rgba(255, 174, 0, 1) */
  warning: string;
  /** rgba(213,44,99,255) */
  danger: string;
  [name: string]: string;
}

interface Theme {
  colors: ColorModel;
  borderRadius: {
    /** unit(8) */
    $1: string;
    /** 8 */
    $1Number: number;
    /** unit(16) */
    $2: string;
    /** 16 */
    $2Number: number;
    /** unit(24) */
    $3: string;
    /** 24 */
    $3Number: number;
  };
  spacing: {
    /** unit(20) */
    $1: string;
    /** 20 */
    $1Number: number;
    /** unit(24) */
    $2: string;
    /** 24 */
    $2Number: number;
    /** unit(30) */
    $4: string;
    /** 30 */
    $4Number: number;
    /** unit(32) */
    $5: string;
    /** 32 */
    $5Number: number;
    /** unit(34) */
    $6: string;
    /** 34 */
    $6Number: number;
  };
  iconSize: {
    /** value unit(20) */
    $1: string;
    /** value unit(25) */
    $2: string;
    /** value 20 */
    $1Number: number;
    /** value 25 */
    $2Number: number;
  };
  fontSize: {
    /** unit(10) */
    $1: string;
    /** unit(12) */
    $2: string;
    /** unit(13) */
    $3: string;
    /** unit(15) */
    $4: string;
    /** unit(16) */
    $5: string;
    /** unit(18) */
    $6: string;
    /** unit(20) */
    $7: string;
    /** unit(22) */
    $8: string;
    /** unit(24) */
    $9: string;
    /** value 10 */
    $1Number: number;
    /** value 12 */
    $2Number: number;
    /** value 13 */
    $3Number: number;
    /** value 15 */
    $4Number: number;
    /** value 16 */
    $5Number: number;
    /** value 18 */
    $6Number: number;
    /** value 20 */
    $7Number: number;
    /** value 22 */
    $8Number: number;
    /** value 24 */
    $9Number: number;
  };
  lineHeight: {
    /** unit(12) */
    $1: string;
    /** unit(16) */
    $2: string;
    /** unit(20) */
    $3: string;
    /** unit(22) */
    $4: string;
    /** unit(25) */
    $5: string;
    /** unit(27) */
    $6: string;
    /** unit(30) */
    $7: string;
    /** unit(32) */
    $8: string;
  };
  fontWeight: {
    /** 100 */
    $100: string;
    /** 200 */
    $200: string;
    /** 300 */
    $300: string;
    /** 400 */
    $400: string;
    /** 500 */
    $500: string;
    /** 600 */
    $600: string;
    /** 700 */
    $700: string;
    /** 800 */
    $800: string;
    /** 900 */
    $900: string;
  };
}

export { Theme };
