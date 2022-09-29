import loadable from "@loadable/component";
import Skeleton from "./Container/Skeleton";

function load(fn: any, options: any) {
  const Component = loadable(fn, options);

  Component.preload = fn?.requireAsync || fn;

  return Component;
}

function LoadingComponent(props: {
  error: boolean;
  timedOut: boolean;
  pastDelay: boolean;
}) {
  if (props.error) {
    console.error(props.error);
    return null;
  }
  return <Skeleton count={5} type="bar" loading />;
}

const lazyLoad = (loader: any) => {
  return load(loader, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  });
};

export default lazyLoad;
