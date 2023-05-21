import path from "path";
import fs from "fs/promises";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // dev server에서는 작동하지 않으며, 오직 build된 결과물에서만 작동한다.
    // 단위는 초(second)이고, 지정한 시간에 따라서 페이지를 다시 그린다(Re-Generating).
    revalidate: 10,
  };
}

export default HomePage;
