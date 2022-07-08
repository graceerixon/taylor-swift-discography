import Link from "next/link";

export default function AlbumCard({ album }) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <img src={album?.cover?.mediaItemUrl} alt={album.cover.altText} />
    </Link>
  );
}
