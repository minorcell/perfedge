import { getContributors } from "@/lib/api/Developer";
import Image from "next/image";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export default async function Contributors() {
  const contributors: Contributor[] = await getContributors();

  contributors.sort((a, b) => b.contributions - a.contributions);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {contributors?.length > 0 ? (
        contributors.map((item) => (
          <div key={item.login} className="flex items-center gap-2">
            <Image
              src={item.avatar_url}
              alt={item.login}
              width={32}
              height={32}
              className="rounded-full"
            />
            <a
              href={item.html_url}
              target="_blank"
              className="block text-center hover:underline"
            >
              {item.login}
            </a>
          </div>
        ))
      ) : (
        <p>暂时没有贡献者信息。</p>
      )}
    </div>
  );
}
