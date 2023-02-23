import { diskStorage } from 'multer';
import { extname } from 'path';

export const media = (path) => {
  return {
    limits: {
      fileSize: 1097152,
    },
    storage: diskStorage({
      destination: `./upload/${path}`,
      filename: (req, file, callback) => {
        const unix = Date.now();
        const ext = extname(file.originalname);
        const name = `${file.originalname}-${unix}${ext}`;
        callback(null, name.replace(/\ /g, '_'));
      },
    }),
  };
};
