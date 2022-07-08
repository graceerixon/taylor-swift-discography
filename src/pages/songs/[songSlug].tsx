import { client } from "client";
import { useRouter } from "next/router";
import { getNextStaticProps } from "@faustjs/next";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "scss/pages/songs.module.scss";

export default function Song() {
  const { useQuery } = client;
  const { query = {} } = useRouter();
  const { songSlug } = query;

  const song = useQuery().song({
    id: songSlug,
    idType: "SLUG",
  });

  return (
    <Layout>
      <Link href="/">
        <p className={styles.backButton}> &#x2190; View All Albums</p>
      </Link>
      {song.album().nodes?.map((album) => (
        <Link key={album.databaseId} href={`/albums/${album.slug}`}>
          <p className={styles.backButton}> &#x2190; View {album.albumTitle}</p>
        </Link>
      ))}
      <h1 className={styles.title}>{song.songTitle}</h1>
      <p className={styles.details}>Song Length: {song.length}</p>
      <p className={styles.details}>
        Genre:&nbsp;
        {song
          .genres()
          .nodes?.map((genre) => genre.name)
          .join(", ")}
      </p>
      <h3 className={styles.details}>Lyrics</h3>
      <div
        className={styles.details}
        dangerouslySetInnerHTML={{ __html: song.lyrics }}
      />
    </Layout>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: Song,
    client,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
