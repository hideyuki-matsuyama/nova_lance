import React, { useState, useEffect } from "react";

function ExamplesComponent() {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/examples");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExamples(data);
      } catch (e) {
        console.error("Fetching examples failed:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []); // 空の依存配列なので、コンポーネントのマウント時に一度だけ実行されます

  if (loading) {
    return <p>データをロード中です...</p>;
  }

  if (error) {
    return <p>データの取得に失敗しました: {error}</p>;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
        Example リスト🔥
      </h1>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
              <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                ID
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
              <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                名
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
              <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                姓
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
              <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                作成日時
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
              <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                更新日時
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {examples.length > 0 ? (
            examples.map((example) => (
              <tr key={example.id}>
                <td className="size-px whitespace-nowrap px-6 py-3">
                  <span className="text-sm text-gray-800 dark:text-white">
                    {example.id}
                  </span>
                </td>
                <td className="size-px whitespace-nowrap px-6 py-3">
                  <span className="text-sm text-gray-800 dark:text-white">
                    {example.first_name}
                  </span>
                </td>
                <td className="size-px whitespace-nowrap px-6 py-3">
                  <span className="text-sm text-gray-800 dark:text-white">
                    {example.last_name}
                  </span>
                </td>
                <td className="size-px whitespace-nowrap px-6 py-3">
                  <span className="text-sm text-gray-800 dark:text-white">
                    {example.created_at}
                  </span>
                </td>
                <td className="size-px whitespace-nowrap px-6 py-3">
                  <span className="text-sm text-gray-800 dark:text-white">
                    {example.updated_at}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">表示するデータがありません。</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExamplesComponent;
