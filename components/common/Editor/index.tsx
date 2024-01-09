import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Ref } from "react";

interface Props {
  textRef: Ref<Editor>;
}

export default function ToastEditor({ textRef }: Props) {
  return (
    <div className="w-full">
      <Editor
        ref={textRef}
        placeholder="문의 내용을 입력해주세요."
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
