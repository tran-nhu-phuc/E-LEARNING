// import React, { useState, useEffect } from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { IProduct } from "../../types/interface";

// export default function PieActiveArc() {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const productService = new ProductService();

//   useEffect(() => {
//     const getValue = async () => {
//       const product = await productService.getAllProduct();
//       setProducts(product);
//     };
//     getValue();
//   }, []);
//   const mgScale = products.filter(
//     (item: IProduct) => item.scale === "mg"
//   ).length;

//   const hgScale = products.filter(
//     (item: IProduct) => item.scale === "hg"
//   ).length;
//   const rgScale = products.filter(
//     (item: IProduct) => item.scale === "rg"
//   ).length;
//   const pgScale = products.filter(
//     (item: IProduct) => item.scale === "pg"
//   ).length;
//   const mbScale = products.filter(
//     (item: IProduct) => item.scale === "mb"
//   ).length;
//   const msScale = products.filter(
//     (item: IProduct) => item.scale === "ms"
//   ).length;
//   const rsScale = products.filter(
//     (item: IProduct) => item.scale === "rs"
//   ).length;
//   const sdScale = products.filter(
//     (item: IProduct) => item.scale === "sd"
//   ).length;
//   const hrScale = products.filter(
//     (item: IProduct) => item.scale === "hr"
//   ).length;

//   const data = [
//     { id: 0, value: mgScale, label: "MG scale" },
//     { id: 1, value: hgScale, label: "HG scale" },
//     { id: 2, value: rgScale, label: "RG scale" },
//     { id: 3, value: pgScale, label: "PG scale" },
//     { id: 4, value: mbScale, label: "MB scale" },
//     { id: 5, value: msScale, label: "MS scale" },
//     { id: 6, value: rsScale, label: "RS scale" },
//     { id: 7, value: sdScale, label: "SD scale" },
//     { id: 8, value: hrScale, label: "HR scale" },
//   ];
//   return (
//     <PieChart
//       series={[
//         {
//           data,
//           highlightScope: { faded: "global", highlighted: "item" },
//           faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
//         },
//       ]}
//       height={200}
//     />
//   );
// }

import React from "react";

const PieChart = () => {
  return <div>PieChart</div>;
};

export default PieChart;
