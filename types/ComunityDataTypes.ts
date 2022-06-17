import React from "react";
//Community Screen 안에서 쓰는 데이터 타입들
export type CommunityData = {
  bulletin_id: string;
  std_id: string;
  title: string;
  content: string;
  views: number;
  hot: number;
  create_date: string;
};

export type ImageData = {
  bulletin_id: number;
  image_id: number;
  path: Buffer;
};

export type CommentData = {
  comment_id: string;
  content: string;
  create_date: string;
  bulletin_id: string;
  std_id: string;
};

export type CommentUpdate = {
  setCommentData: React.Dispatch<
    React.SetStateAction<Array<CommentData> | undefined>
  >;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
};
