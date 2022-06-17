//각 페이지 마다 사용하는 parmas들에 대한 타입 정의

import { CommunityData, ImageData } from "./ComunityDataTypes";

export type DrawerNavList = {
  home: undefined;
  ASRequest:
    | undefined
    | {
        key: string | undefined;
        name: string | undefined;
        params: {
          content: string;
          id: string;
          title: string;
          vst_check: boolean;
        };
      };
  ASInquery: undefined;
  OutRequest: undefined;
  OutInquery: undefined;
  GymRequest: undefined;
  GymInquery: undefined;
  BusRequest:
    | undefined
    | {
        key: string;
        name: string;
        params: {
          item: {
            bus_date: string;
            bus_req_id: number | string;
            bus_stop: string;
            bus_time: string;
            bus_way: number;
            std_id: number;
          };
        };
      };

  BusInquery: undefined;
  LogOut: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  SettingPassword: {
    key: string;
    name: string;
    params: {
      eMail: string;
      hash: string;
    };
  };
};

export type BottomStackNavList = {
  Home: undefined;
  Community: undefined;
  Setting: undefined;
};

export type CommunityStackNavList = {
  CommunityMain: undefined;
  CommunityDetails: { item: CommunityData; id: string };
  CommunityWrite: undefined;
  CommunityUpdate: { item: CommunityData; images: Array<ImageData> };
};

export type SettingStackNavList = {
  SettingMain: undefined;
};
