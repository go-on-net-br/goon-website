export interface DateAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Media {
  data: {
    id: number;
    attributes: {
      id: number;
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: MediaFormat;
        small: MediaFormat;
        medium: MediaFormat;
        large: MediaFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string;
      provider: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}

export interface RedesSociais {
  Rede: Rede;
  URL: string;
}

export enum Rede {
  LinkedIn = "LinkedIn",
  YouTube = "YouTube",
  Facebook = "Facebook",
  Instagram = "Instagram",
  Tiktok = "Tiktok",
}
