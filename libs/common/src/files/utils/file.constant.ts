import { join } from 'path';

export const MaxFileCount = {
  PRODUCT_IMAGES: 5,
  PROPERTY_IMAGES: 5,
} as const satisfies Record<string, number>;

// export const BASE_PATH = 'upload';

const MICROSERVICE_NAME = process.env.MICROSERVICE_NAME || 'default-service';
// export const BASE_PATH = join(
//   __dirname,
//   '..',
//   '..',
//   'apps',
//   MICROSERVICE_NAME,
//   'upload',
// );

export const BASE_PATH = join(
  process.cwd(), // Racine du projet
  'apps',
  MICROSERVICE_NAME,
  'upload',
);

export const FilePath = {
  Products: {
    BASE: 'products',
    IMAGES: 'images',
  },
} as const satisfies Record<string, Record<string, string>>;

export const MULTIPART_FORMDATA_KEY = 'multipart/form-data';
