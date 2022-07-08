import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>TS Discography</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
