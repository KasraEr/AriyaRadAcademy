import { Link } from "react-router-dom";

function ArticleCard({ data, id }) {
  const imageUrl =
    data?.image && `https://ariyaradacademy.com/api/File/image/${data.image}`;

  return (
    <div
      key={id}
      className="flex flex-col items-center gap-6 overflow-hidden border border-text-500 rounded-4xl w-full p-5 ml:my-5 ml:min-h-[calc(600px+8%)]"
    >
      <img
        src={imageUrl}
        alt={data.name || ""}
        className="w-full rounded-[10px]"
      />

      <h3 className="text-[21px]">{data.name}</h3>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
          {data.author}
        </p>
      </div>

      <button className="bg-primary-500 text-basic-100 w-full rounded-full hover:bg-primary-100 hover:text-primary-500 active:bg-primary-900 active:text-text-100 transition">
        <Link to="">خواندن مقاله</Link>
      </button>
    </div>
  );
}

export default ArticleCard;
