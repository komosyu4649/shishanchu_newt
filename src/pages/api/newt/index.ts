// import { NextApiRequest, NextApiResponse } from "next";

// // newtのデータを取得
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       // Get data from your database
//       //   res.status(200).json({ name: "John Doe" });
//       // newtのデータを取得
//       //   const token = "cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs";
//       //   res.status(200).json(
//       //     fetch("https://api.newtglobal.com/v1/seeshanchu/collections/contents", {
//       //       method: "GET",
//       //       headers: {
//       //         Authorization: `Bearer cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs`,
//       //       },
//       //     })
//       //   );
//     //   const response = await fetch(
//     //     "https://api.newtglobal.com/v1/seeshanchu/collections/contents",
//     //     {
//     //       method: "GET",
//     //       headers: {
//     //         Authorization: `Bearer cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs`,
//     //       },
//     //     }
//     //   );
//     //   const data = await response.json();
//     //   res.status(200).json(data);

//       break;
//     case "POST":
//       // Update or create data in your database
//       res.status(200).json({ name: "John Doe" });
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ACCOUNTS = [
  {
    spaceUid: "seeshanchu",
    apiToken: "cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs",
  },
  //   { spaceUid: "spaceUid2", apiToken: "apiToken2" },
  // 追加のアカウント情報をここに記述
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Promise.allで並列でAPIからデータを取得する
    // const results = await Promise.all(
    //   ACCOUNTS.map(async ({ spaceUid, apiToken }) => {
    const { data } = await axios.get(
      `https://seeshanchu.cdn.newt.so/v1/contents-248035/post`,
      {
        headers: {
          Authorization: `Bearer cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs`,
        },
      }
    );
    console.log(data);
    // return data;
    //   })
    // );
    // 取得したデータを1つに結合する
    // const combinedData = results.reduce((acc, data) => {
    //   return [...acc, ...data];
    // }, []);
    res.status(200).json(data);
    //
    // const apiData = ACCOUNTS.map(({ spaceUid, apiToken }) => {
    //   return {
    //     // url: `https://${spaceUid}.api.newt.so/v1/contents-248035/post`,
    //     url: `https://${spaceUid}.cdn.newt.so/v1/contents-248035/post`,
    //     headers: {
    //       Authorization: `Bearer ${apiToken}`,
    //     },
    //   };
    // });
    // // axiosでAPIからデータを取得するPromiseを生成する
    // const promises = apiData.map((data) => {
    //   return axios.get(data.url, { headers: data.headers });
    // });
    // // Promise.allSettledで全てのPromiseを実行する
    // const results = await Promise.allSettled(promises);
    // // 取得したデータを1つに結合する
    // const combinedData = results
    //   .filter(({ status }) => status === "fulfilled")
    //   .map(({ value }) => value.data)
    //   .reduce((acc, data) => [...acc, ...data], []);
    // res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
