/* eslint-disable tailwindcss/no-custom-classname */
import { PropsWithChildren } from "react";

export default function AdSenseWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <div className="mr-30 h-600 w-300 bg-gray1">
        {/** side-vertical */}
        <ins
          className="adsbygoogle block"
          data-ad-client="ca-pub-3990660420952319"
          data-ad-slot="2329060497"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div className="flex flex-col space-y-30">
        <div className="h-120 w-full bg-gray1">
          {/** side-horizontal */}
          <ins
            className="adsbygoogle block"
            data-ad-client="ca-pub-3990660420952319"
            data-ad-slot="8390485084"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
        {children}
      </div>
      <div className="ml-30 h-600 w-300 bg-gray1">
        {/** side-vertical */}
        <ins
          className="adsbygoogle block"
          data-ad-client="ca-pub-3990660420952319"
          data-ad-slot="2329060497"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
