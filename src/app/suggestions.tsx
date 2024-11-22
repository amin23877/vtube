import ImageTitle from "@/components/pages/index/ImageTitle";
import { IMovie, ISuggestion } from "./types";
import CustomSwiper from "@/components/CustomSwiper";

export default function Suggestions() {
  const moviesList: IMovie[] = [
    {
      id: 1,
      title: "Movie 1",
      description: "Description 1",
      image: "/image.png",
      createdAt: "",
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description 2",
      image: "/image.png",
      createdAt: "",
    },
    {
      id: 3,
      title: "Movie 3",
      description: "Description 3",
      image: "/image.png",
      createdAt: "",
    },
    {
      id: 4,
      title: "Movie 3",
      description: "Description 3",
      image: "/image.png",
      createdAt: "",
    },
    {
      id: 5,
      title: "Movie 3",
      description: "Description 3",
      image: "/image.png",
      createdAt: "",
    },
    {
      id: 6,
      title: "Movie 3",
      description: "Description 3",
      image: "/image.png",
      createdAt: "",
    },
  ];
  const suggestion: ISuggestion = {
    title: "Vtube",
    image: "/colah-ghemezi.png",
    movies: moviesList,
  };
  const data: ISuggestion[] = [suggestion, suggestion, suggestion, suggestion];
  return data.map((x, i) => {
    return (
      <div key={i}>
        <ImageTitle title={x.title} image={x.image} />
        <CustomSwiper movies={x.movies} />
      </div>
    );
  });
}
