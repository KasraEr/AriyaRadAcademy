import { useNavigate } from "react-router-dom";

export default function ArticleCard({ data, id }) {
  const navigate = useNavigate();

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
      <p className="b1">{data.name}</p>
      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
          {data.author}
        </p>
      </div>
      <button
        onClick={() => navigate(`/articles/${data.name}`, { state: { id } })}
        className="bg-primary-500 text-basic-100 w-full rounded-full hover:bg-primary-100 hover:text-primary-500 active:bg-primary-900 active:text-text-100 transition"
      >
        خواندن مقاله
      </button>
    </div>
  );
}
