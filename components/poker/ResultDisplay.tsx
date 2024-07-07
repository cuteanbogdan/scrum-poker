import React from "react";

interface ResultDisplayProps {
  results: number[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  const average =
    results.length > 0
      ? (results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)
      : 0;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Results:</h2>
      <p className="text-lg font-semibold">Average: {average}</p>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="py-1">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultDisplay;
