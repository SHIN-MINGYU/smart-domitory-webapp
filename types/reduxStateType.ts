//전역 변수에서 쓰는 type들 정의

type reduxState = {
  API: { URL: string };
  User: {
    isLogined: false;
    info: {
      std_id: string;
      std_name: string;
    };
  };
};

export default reduxState;
