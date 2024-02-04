import Close from "@/public/images/Close.png";

export default function CloseIcon() {
  return (
    <img
      src={Close.src}
      alt="close"
      className="absolute right-8 top-8 h-24 w-24 cursor-pointer"
    />
  );
}
