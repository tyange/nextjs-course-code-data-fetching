import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  //   if (!loadedProduct) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    // fallback의 값이 true일 경우 paths에 등록되지 않은 route도 Next.js가 자동으로 불러온다.
    // 다만, JIT(Just-In-Time)으로 불러오므로, pre-rendering은 진행되지 않는다.
    // 문자열 'blocking'을 값으로 지정할 경우 fallback-check 없이도 작동하게 된다.
    fallback: false,
  };
}

export default ProductDetailPage;
