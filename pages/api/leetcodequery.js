// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient } from 'graphql-request';

export default async function handler(req, res) {
    const endpoint = 'https://leetcode.com/graphql';

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
        }
    }
    `
    const quer = gql`
    {
        matchedUser(username: "AparinAA") {
            username
            socialAccounts
            githubUrl
            contributions {
                points
                questionCount
                testcaseCount
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
    `
    const client = new GraphQLClient(endpoint, { headers: {} });
    const resp = await client.request(query);

    const stats = resp.matchedUser.submitStats.acSubmissionNum.map(item => {
        return { "name": item.difficulty, 'value': item.count }
    });

    const resp2 = await client.request(quer);
    const picURLS = resp2.matchedUser.badges.map(bage => {
        const url = bage.icon;
        const template = !url.includes('https://') ? 'https://leetcode.com/' : ''
        return { url: template + url, alt: bage.displayName };
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