import { client } from "client";
import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";
import styles from "scss/pages/albums.module.scss";

export default function Home() {
  const { useQuery } = client;
  const albums = useQuery().albums()?.nodes;

  return (
    <Layout>
      <ul className={styles.gallery}>
        {albums.map((album) => (
          <li className={styles.galleryItem} key={album.databaseId}>
            <AlbumCard album={album} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
