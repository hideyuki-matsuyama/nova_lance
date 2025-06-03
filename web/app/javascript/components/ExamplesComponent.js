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
    <div>
      <h1>Example リスト🔥🔥</h1>
      <table className="min-w-full">
        <thead>
          <tr className="hover:bg-gray-100">
            <th>ID</th>
            <th>名</th>
            <th>姓</th>
            <th>作成日時</th>
            <th>更新日時</th>
          </tr>
        </thead>
        <tbody>
          {examples.length > 0 ? (
            examples.map((example) => (
              <tr key={example.id}>
                <td>{example.id}</td>
                <td>{example.first_name}</td>
                <td className="text-2xl font-medium">{example.last_name}</td>
                <td>{example.created_at}</td>
                <td>{example.updated_at}</td>
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
