import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

interface Props {
  contents?: string;
}

export default function ToastViewer({ contents }: Props) {
  return <Viewer initialValue={contents} />;
}
