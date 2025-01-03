// npm install clsx
// npm install tailwind-merge

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs))
}