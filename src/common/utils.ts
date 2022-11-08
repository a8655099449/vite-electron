import toast from "react-hot-toast";
import { openConfirmModal } from "@mantine/modals";
// import md5 from 'blueimp-md5'

export const message = {
  success: toast.success,
  error: toast.error,
};
const saveTime = 1000 * 60 * 60 * 24 * 365; // 默认存储时间为一年
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
  let v: any = localStorage.getItem(key);
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

export const confirm = ({ title = "确认提示", children = "请确认" } = {}) => {
  return new Promise((resolve, reject) => {
    openConfirmModal({
      title,
      labels: { confirm: "确认", cancel: "取消" },
      children,
      onConfirm() {
        resolve("ok");
      },
      onCancel() {
        reject();
      },
    });
  });
};

export const throttle = (func: any, wait = 500) => {
  let timer: any;

  return () => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      func();
      timer = null;
    }, wait);
  };
};

export function debounce(fn: any, delay = 500) {
  // timer 是在闭包中的
  let timer: any = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

export const arrayToObjectByKey = <T = any>(arr: any[], key: string) => {
  const object: {
    [k in string]: T;
  } = {};
  arr.forEach((item) => {
    object[item[key]] = item;
  });
  return object;
};

export function eqObject(a: any, b: any, aStack: any = [], bStack: any = []) {
  function deepEq(a: any, b: any, aStack: any, bStack: any) {
    function isFunction(obj: any) {
      return toString.call(obj) === "[object Function]";
    }
    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }

    var areArrays = className === "[object Array]";
    // 不是数组
    if (!areArrays) {
      // 过滤掉两个函数的情况
      if (typeof a != "object" || typeof b != "object") return false;

      var aCtor = a.constructor,
        bCtor = b.constructor;
      // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
      if (
        aCtor !== bCtor &&
        !(
          isFunction(aCtor) &&
          aCtor instanceof aCtor &&
          isFunction(bCtor) &&
          bCtor instanceof bCtor
        ) &&
        "constructor" in a &&
        "constructor" in b
      ) {
        return false;
      }
    }

    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    // 检查是否有循环引用的部分
    while (length--) {
      if (aStack[length] === a) {
        return bStack[length] === b;
      }
    }

    aStack.push(a);
    bStack.push(b);

    // 数组判断
    if (areArrays) {
      length = a.length;
      if (length !== b.length) return false;

      while (length--) {
        if (!eqObject(a[length], b[length], aStack, bStack)) return false;
      }
    }
    // 对象判断
    else {
      var keys = Object.keys(a),
        key;
      length = keys.length;

      if (Object.keys(b).length !== length) return false;
      while (length--) {
        key = keys[length];
        if (!(b.hasOwnProperty(key) && eqObject(a[key], b[key], aStack, bStack)))
          return false;
      }
    }

    aStack.pop();
    bStack.pop();
    return true;
  }
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false;

  // 判断 NaN
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  var type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object")
    return false;

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
}
