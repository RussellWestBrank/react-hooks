import React, { cloneElement, useState } from "react";

//传入的可以是 ReactElement 也可以是返回 ReactElement 的函数
export type Element = ((state: boolean) => React.ReactElement) | React.ReactElement;

const useHover = (element: Element): [React.ReactElement, boolean] => {
  // 保存 hover 状态：
  const [state, setState] = useState(false);

  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    //originalOnMouseEnter，Element本身的onMouseEnter事件处理函数
    //如果传入的 React Element 本身有 onMouseEnter的事件处理函数，要先调用下
    originalOnMouseEnter?.(event);
    setState(true);
  };
  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    originalOnMouseLeave?.(event);
    setState(false);
  };

  //传入的的是返回ReactElement 的函数，内部对函数做下处理
  if (typeof element === 'function') {
    element = element(state);
  }

  //用 cloneElement 复制 ReactElement，给它添加 onMouseEnter、onMouseLeave 事件。
  const el = cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  });

  return [el, state];
};

export default useHover;