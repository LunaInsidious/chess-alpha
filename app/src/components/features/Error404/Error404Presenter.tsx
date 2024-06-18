import { AiOutlineHome } from "react-icons/ai";

import { ButtonToLink } from "@/components/ui/button/ButtonToLink";
import { Heading1 } from "@/components/ui/text/Heading1";
import { Paragraph } from "@/components/ui/text/Paragraph";
import { appURL } from "@/config/url";

export function Error404Presenter() {
  return (
    <div className="h-screen flex justify-center items-center -mt-14 bg-white">
      <div>
        <span className="text-primary font-bold">404 Not Found</span>
        <Heading1 className="my-4">
          ご指定のページは見つかりませんでした。
        </Heading1>
        <Paragraph className="text-gray-600">
          アクセスしようとしたページは削除、変更されたか、現在利用できない可能性があります。
        </Paragraph>
        <div className="mt-10">
          <ButtonToLink
            variant="primary"
            to={appURL.home}
            className="rounded w-44 px-3 py-2 text-sm"
          >
            <AiOutlineHome size={24} className="pr-2" />
            トップページに戻る
          </ButtonToLink>
        </div>
      </div>
    </div>
  );
}
