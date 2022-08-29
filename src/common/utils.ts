import toast from "react-hot-toast";
// import md5 from 'blueimp-md5'

export const message = {
  success: toast.success,
  error: toast.error,
};
const saveTime = 1000 * 60 * 60 * 24 * 365;
export const setStorage = (key: string, data: any, time = saveTime): void => {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      time,
      saveTime: Date.now(),
    })
  );
};

export const getStore = <T = any>(key: string): T | "" => {
  let v:any = localStorage.getItem(key);
  if (!v || !isJson(v)) {
    return "";
  }
  const now = Date.now();
  v = JSON.parse(v as string);
  const { saveTime, time, data } = v as any;
  if (!saveTime && v) {
    return v;
  }
  if (!data) {
    return "";
  }
  if (saveTime + time > now) {
    return data;
  }

  return "";
};

export const isJson = (v: any) => {
  try {
    JSON.parse(v);
    return true;
  } catch (error) {
    return false;
  }
};

// const getStorage = () => {}
