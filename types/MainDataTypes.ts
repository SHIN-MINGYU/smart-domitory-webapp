//메인 화면에서 쓰는 데이터들을 모아줌.

export type BusData = {
  bus_date: string;
  bus_req_id: string;
  bus_stop: string;
  bus_time: string;
  bus_way: number;
  std_id: string;
};
export type AsData = {
  as_id: string;
  content: string;
  repair_date: null | string;
  request_date: string;
  title: string;
  vst_check: boolean;
};
export type OutData = {
  end_date: string;
  start_date: string;
  stayout_id: string;
  std_id: string;
};

export type HlthData = {
  hlth_id: string;
  date: string;
  start_time: string;
  end_time: string;
};

export type BusDataArr = Array<BusData>;
export type AsDataArr = Array<AsData>;
export type OutDataArr = Array<OutData>;
export type HlthArr = Array<HlthData>;
