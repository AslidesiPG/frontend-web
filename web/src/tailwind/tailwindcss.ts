import resolveConfig from 'tailwindcss/resolveConfig';
import { TailwindCSS } from './tailwindcss.interface';
import tailwindConfig from './tailwind.config';

const theme = resolveConfig<TailwindCSS>(tailwindConfig).theme;

export default theme;
