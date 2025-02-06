import multer, { Multer } from 'multer'

export const requestFile: ReturnType<Multer['any']> = multer().any()
