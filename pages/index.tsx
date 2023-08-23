import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { env } from "env.mjs";

export default function Web() {
  const { update } = useSession({ required: true });

  return (
    <>
      <Head>
        <title>Maple Boss Web</title>
      </Head>
      <section className="flex flex-col gap-y-12 bg-main">
        <div className="flex h-40 w-80 items-center justify-center rounded-8 bg-white">
          <Link href="/">
            <span className="font-bold">HOME</span>
          </Link>
        </div>
        <div className="flex h-40 w-80 items-center justify-center rounded-8 bg-white">
          <Link href="/login">
            <span className="font-bold">login</span>
          </Link>
        </div>
        <div className="flex h-40 w-120 items-center justify-center rounded-8 bg-white">
          <Link href="/email-verify">
            <span className="font-bold">email-verify</span>
          </Link>
        </div>
        <div className="flex h-40 w-80 items-center justify-center rounded-8 bg-white">
          <Link href="/party">
            <span className="font-bold">party</span>
          </Link>
        </div>
        <div className="flex h-40 w-80 items-center justify-center rounded-8 bg-white">
          <button onClick={() => update()}>Rotate</button>
        </div>
        <span>{env.NEXT_PUBLIC_API_HOST}</span>
      </section>
    </>
  );
}
