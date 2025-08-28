import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("페이지를 찾을 수 없습니다...");

  return <div>Wrong Request</div>;
};

export default NotFound;
