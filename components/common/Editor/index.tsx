import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Ref } from "react";

interface Props {
  textRef: Ref<Editor>;
  placeholder: string;
}

export default function ToastEditor({ textRef, placeholder }: Props) {
  return (
    <div className="w-full">
      <Editor
        ref={textRef}
        placeholder={placeholder}
        previewStyle="vertical"
        language="ko-KR"
        hideModeSwitch
        initialEditType="wysiwyg"
        linkAttributes={{
          target: "_blank",
          rel: "noopener noreferrer",
        }}
      />
    </div>
  );
}
