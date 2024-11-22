import { IMovie } from "@/app/types";
import Image from "next/image";

export default function ColumnItem({ movie }: { movie: IMovie }) {
  return (
    <div className='w-full cursor-pointer'>
      <Image
        src={movie.image}
        alt={movie.title}
        width={300}
        height={195}
        className='rounded-lg mb-2 w-full h-auto'
      />
      <h3 className='text-lg font-bold'>{movie.title}</h3>
      <p className='text-sm'>{movie.description}</p>
    </div>
  );
}
