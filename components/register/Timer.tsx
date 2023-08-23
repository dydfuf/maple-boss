import { useEffect, useRef, useState } from "react";

export default function Timer() {
  console.log("hello");
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);
  const timerId = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(String(time.current / 60)));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  });

  useEffect(() => {
    if (time.current <= 0) clearInterval(timerId.current);
  }, [sec]);

  return (
    <span className="text-14 font-semibold text-gray-900">{`${String(
      min
    ).padStart(2, "0")}:${String(sec).padStart(2, "0")}`}</span>
  );
}
