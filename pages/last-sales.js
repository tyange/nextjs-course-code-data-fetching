import { useState, useEffect } from "react";
import useSwr from "swr";

function LastSalesPage() {
  const [sales, setSales] = useState();
  //   const [isLoading, setIsLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSwr(
    "https://nextjs-practice-4d30a-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);

  //     fetch(
  //       "https://nextjs-practice-4d30a-default-rtdb.firebaseio.com/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (isLoading || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
