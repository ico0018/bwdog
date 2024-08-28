import CowTabbar from "./CowTabbar";

export default function withTabbar(WrappedComponent) {
  return function (props) {
    return (
      <div className="h-full">
        <WrappedComponent {...props} />
        <CowTabbar />
      </div>
    );
  };
}
