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
    appUid: "contents-248035",
    apiToken: "cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs",
  },
  {
    spaceUid: "shishanchu2",
    appUid: "contents-427830",
    apiToken: "TPNA5u9jaPOHOXoEGce7eMw0GtCzFrNBc6-3baAVayE",
  },
  //   { spaceUid: "spaceUid2", apiToken: "apiToken2" },
  // 追加のアカウント情報をここに記述
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await Promise.all(
      ACCOUNTS.map(async ({ spaceUid, apiToken, appUid }) => {
        const { data } = await axios.get(
          `https://${spaceUid}.cdn.newt.so/v1/${appUid}/post`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        return data;
      })
    );
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
