/*
 * @Author: your name
 * @Date: 2020-10-26 09:04:36
 * @LastEditTime: 2020-11-19 16:42:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tuitui_mini\common\event.js
 */

type Fn = () => {};
class Event {
  _stores: any = {};
  on(event: string, fn: Fn, ctx: any) {
    if (typeof fn != "function") {
      return;
    }

    this._stores = this._stores || {};
    (this._stores[event] = this._stores[event] || []).push({
      cb: fn,
      ctx: ctx,
    });
  }
  emit(event: string) {
    this._stores = this._stores || {};
    var store = this._stores[event],
      args;

    if (store) {
      store = store.slice(0);
      args = [].slice.call(arguments, 1);
      // @ts-ignore
      args.unshift({});
      for (var i = 0, len = store.length; i < len; i++) {
        store[i].cb.apply(store[i].ctx, args);
      }
    }
  }
  off(event: string, fn: Fn, ctx: any) {
    this._stores = this._stores || {};
    // all
    if (!arguments.length) {
      this._stores = {};
      return;
    }
    // specific event
    var store = this._stores[event];
    if (!store) return;
    // remove all handlers
    if (arguments.length === 1) {
      delete this._stores[event];
      return;
    }
    // remove specific handler
    var cb;
    for (var i = 0, len = store.length; i < len; i++) {
      cb = store[i].cb;
      if (store[i].ctx === ctx) {
        store.splice(i, 1);
        break;
      }
    }
    return;
  }
}

const event = new Event();

export default event;
