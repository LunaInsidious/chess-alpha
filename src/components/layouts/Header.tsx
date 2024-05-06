import { Link } from "react-router-dom";

import { appURL } from "@/config/url";

export function Header() {
  const mockContents: { name: string; to: string }[] = [
    { name: "ホーム", to: appURL.login },
  ];
  return (
    <div className="sticky top-0 z-30 bg-white py-4 shadow-md">
      <div className="flex max-w-7xl justify-end mx-auto">
        <div className="flex gap-8">
          {mockContents.map((content) => (
            <Link to={content.to} key={content.name}>
              <span className="hover:opacity-60">{content.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
