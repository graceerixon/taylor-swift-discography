import { client } from "client";
import { useRouter } from "next/router";
import { getNextStaticProps } from "@faustjs/next";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "scss/pages/albums.module.scss";

export default function Album() {
  const { useQuery } = client;
  const { query = {} } = useRouter();
  const { albumSlug } = query;

  const album = useQuery().album({
    id: albumSlug,
    idType: "SLUG",
  });

  return (
    <Layout>
      <Link href="/">
        <p className={styles.backButton}> &#x2190; View All Albums</p>
      </Link>
      <h1 className={styles.title}>{album.albumTitle}</h1>
      <p className={styles.details}>Released on {album.releaseDate}</p>
      <img
        className={styles.cover}
        src={album.cover.mediaItemUrl}
        alt={album.cover.altText}
      />
      <h3 className={styles.details}>Track List</h3>
      <ol className={styles.trackList}>
        {album.trackList().nodes?.map((song) => (
          <li className={styles.listItem} key={song.databaseId}>
            <Link href={`/songs/${song.slug}`}>
              <a>{song.songTitle}</a>
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: Album,
    client,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
