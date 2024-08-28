import CowTabbar from "./CowTabbar";

export default function withTabbar(WrappedComponent) {
  return function (props) {
    return (
      <div className="h-full">
        <WrappedComponent {...props} />
        <div className="SafeArea h-[56px] bg-black"></div>
        <CowTabbar />
      </div>
    );
  };
}
