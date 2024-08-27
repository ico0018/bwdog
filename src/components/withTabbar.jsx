import CowTabbar from "./CowTabbar";

export default function withTabbar(WrappedComponent) {
  return function (props) {
    return (
      <div>
        <WrappedComponent {...props} />
        <div className="SafeArea h-[72px] bg-black"></div>
        <CowTabbar />
      </div>
    );
  };
}
