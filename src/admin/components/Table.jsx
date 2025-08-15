export default function Table({ data, columns }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns?.map((col, index) => (
              <th key={index} className="b1 text-right px-4 py-2 border-b">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="b1 text-center p-4 text-gray-500"
              >
                هیچ داده‌ای موجود نیست
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-text-500/35">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="b2 px-4 py-2 border-b text-right"
                  >
                    {col.cell ? col.cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
