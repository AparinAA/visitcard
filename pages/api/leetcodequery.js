// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient, request } from "graphql-request";

export default async function handler(req, res) {
    const endpoint = "https://leetcode.com/graphql";

    // leetcode has banned me
    const query = gql`
        {
            matchedUser(username: "AparinAA") {
                username
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
                profile {
                    starRating
                    reputation
                    ranking
                }
                badges {
                    id
                    displayName
                    icon
                    creationDate
                }
                upcomingBadges {
                    name
                    icon
                }
                activeBadge {
                    id
                }
            }
        }
    `;

    // try {
    //     // const client = new GraphQLClient(endpoint);
    //     // const resp = await request({ url: endpoint, document: query });
    //     const resp = await fetch(endpoint + "?query=" + query, {
    //         method: "GET",
    //     });
    //     console.info("RESP", resp);
    //     res.status(200).json({});
    // } catch (e) {
    //     console.info("ERR", e);
    //     res.status(200).json({});
    // }

    const resp = {
        matchedUser: {
            username: "AparinAA",
            submitStats: {
                acSubmissionNum: [
                    { difficulty: "All", count: 655, submissions: 2309 },
                    { difficulty: "Easy", count: 252, submissions: 919 },
                    { difficulty: "Medium", count: 351, submissions: 1258 },
                    { difficulty: "Hard", count: 52, submissions: 132 },
                ],
            },
            profile: { starRating: 3.0, reputation: 0, ranking: 38915 },
            badges: [
                {
                    id: "1584490",
                    displayName: "50 Days Badge 2022",
                    icon: "https://leetcode.com/static/images/badges/2022/lg/2022-annual-50.png",
                    creationDate: "2023-01-01",
                },
                {
                    id: "1853850",
                    displayName: "Mar LeetCoding Challenge",
                    icon: "/static/images/badges/dcc-2023-3.png",
                    creationDate: "2023-03-31",
                },
                {
                    id: "1788228",
                    displayName: "Feb LeetCoding Challenge",
                    icon: "/static/images/badges/dcc-2023-2.png",
                    creationDate: "2023-02-28",
                },
                {
                    id: "1686644",
                    displayName: "Jan LeetCoding Challenge",
                    icon: "/static/images/badges/dcc-2023-1.png",
                    creationDate: "2023-01-31",
                },
                {
                    id: "1845279",
                    displayName: "Dynamic Programming I",
                    icon: "https://assets.leetcode.com/static_assets/others/DP_I.png",
                    creationDate: "2023-03-26",
                },
                {
                    id: "1290938",
                    displayName: "Data Structure II",
                    icon: "https://assets.leetcode.com/static_assets/others/DS_II.png",
                    creationDate: "2022-12-26",
                },
                {
                    id: "1247461",
                    displayName: "Programming Skills II",
                    icon: "https://assets.leetcode.com/static_assets/others/%E7%BC%96%E7%A8%8B%E8%83%BD%E5%8A%9B_%E5%9F%BA%E7%A1%80.png",
                    creationDate: "2022-12-06",
                },
                {
                    id: "1219039",
                    displayName: "SQL I",
                    icon: "https://assets.leetcode.com/static_assets/others/SQLI.png",
                    creationDate: "2022-11-26",
                },
            ],
            upcomingBadges: [
                {
                    name: "Nov LeetCoding Challenge",
                    icon: "/static/images/badges/dcc-2023-11.png",
                },
                {
                    name: "Oct LeetCoding Challenge",
                    icon: "/static/images/badges/dcc-2023-10.png",
                },
            ],
            activeBadge: { id: "1686644" },
        },
    };

    const stats = resp.matchedUser.submitStats.acSubmissionNum.map((item) => {
        return { name: item.difficulty, value: item.count };
    });
    const picURLS = resp.matchedUser.badges.map((bage) => {
        const url = bage.icon;
        const template = !url.includes("https://")
            ? "https://leetcode.com/"
            : "";
        return { url: template + url, alt: bage.displayName };
    });

    await new Promise((res) => {
        setTimeout(res, 1.5 * 1000);
    });

    res.status(200).json({ data: { stats, picURLS } });
}

// ==== LeetCode query

// matchedUser(username: $username) {
//     username
//     socialAccounts
//     githubUrl
//     contributions {
//         points
//         questionCount
//         testcaseCount
//     }
//     profile {
//         realName
//         websites
//         countryName
//         skillTags
//         company
//         school
//         starRating
//         aboutMe
//         userAvatar
//         reputation
//         ranking
//     }
//     submissionCalendar
//     submitStats {
//         acSubmissionNum {
//             difficulty
//             count
//             submissions
//         }
//         totalSubmissionNum {
//             difficulty
//             count
//             submissions
//         }
//     }
//     badges {
//         id
//         displayName
//         icon
//         creationDate
//     }
//     upcomingBadges {
//         name
//         icon
//     }
//     activeBadge {
//         id
//     }
// }
// recentSubmissionList(username: $username, limit: 20) {
//     title
//     titleSlug
//     timestamp
//     statusDisplay
//     lang
// }
