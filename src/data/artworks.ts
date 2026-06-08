import chest from "@/assets/art-chest.jpg";
import fountain from "@/assets/art-fountain.jpg";
import lantern from "@/assets/art-lantern.jpg";
import gargoyle from "@/assets/art-gargoyle.jpg";
import sword from "@/assets/art-sword.jpg";
import tome from "@/assets/art-tome.jpg";
import wireframe from "@/assets/process-wireframe.jpg";
import texture from "@/assets/process-texture.jpg";
import render from "@/assets/process-render.jpg";

export type ModelShape =
  | "chest"
  | "fountain"
  | "lantern"
  | "gargoyle"
  | "sword"
  | "tome";

export interface Artwork {
  slug: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  shape: ModelShape;
  hero: string;
  process: {
    wireframe: string;
    texture: string;
    render: string;
    final: string;
  };
}

export const artworks: Artwork[] = [
  {
    slug: "the-keeper",
    title: "The Keeper",
    medium: "Oak · Wrought Iron · Gilded Bronze",
    year: "MMXXIV",
    description:
      "An ornate treasure chest worn by centuries of hands. The lid's hinges still resist, as if guarding one final secret.",
    shape: "chest",
    hero: chest,
    process: { wireframe, texture, render, final: chest },
  },
  {
    slug: "the-weeping-stone",
    title: "The Weeping Stone",
    medium: "Granite · Moss · Running Water",
    year: "MMXXIV",
    description:
      "A village fountain reclaimed by time. Moss has braided itself through the masonry, and the water has carved its own path.",
    shape: "fountain",
    hero: fountain,
    process: { wireframe, texture, render, final: fountain },
  },
  {
    slug: "the-vigil",
    title: "The Vigil",
    medium: "Forged Brass · Glass · Living Flame",
    year: "MMXXIII",
    description:
      "A wayfarer's lantern, its filigree cast in a single pour. The flame inside has refused to die for three winters.",
    shape: "lantern",
    hero: lantern,
    process: { wireframe, texture, render, final: lantern },
  },
  {
    slug: "the-watcher",
    title: "The Watcher",
    medium: "Weathered Limestone · Lichen",
    year: "MMXXIII",
    description:
      "Once perched upon a cathedral spire. The lichen on its wings tells a longer story than any chronicle.",
    shape: "gargoyle",
    hero: gargoyle,
    process: { wireframe, texture, render, final: gargoyle },
  },
  {
    slug: "the-oath",
    title: "The Oath",
    medium: "Damascus Steel · Lapis · Wrapped Leather",
    year: "MMXXIV",
    description:
      "Forged for a king who never drew it. Each engraving on the blade was cut by a different hand.",
    shape: "sword",
    hero: sword,
    process: { wireframe, texture, render, final: sword },
  },
  {
    slug: "the-grimoire",
    title: "The Grimoire",
    medium: "Vellum · Tanned Leather · Runic Ink",
    year: "MMXXIV",
    description:
      "Pages bound in the hide of an extinct beast. The runes glow when read aloud — though no one remembers the words.",
    shape: "tome",
    hero: tome,
    process: { wireframe, texture, render, final: tome },
  },
];

export const getArtwork = (slug: string) =>
  artworks.find((a) => a.slug === slug);
