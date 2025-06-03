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
      <h1>Example リスト</h1>
      {examples.length > 0 ? (
        <ul>
          {examples.map((example) => (
            <li
              key={example.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <strong>ID:</strong> {example.id} <br />
              <strong>名:</strong> {example.first_name} <br />
              <strong>姓:</strong> {example.last_name} <br />
              <strong>作成日時:</strong>{" "}
              {new Date(example.created_at).toLocaleString("ja-JP")} <br />
              <strong>更新日時:</strong>{" "}
              {new Date(example.updated_at).toLocaleString("ja-JP")}
            </li>
          ))}
        </ul>
      ) : (
        <p>表示するデータがありません。</p>
      )}
    </div>
  );
}

export default ExamplesComponent;
