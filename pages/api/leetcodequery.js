// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient } from 'graphql-request';

export default async function handler(req, res) {
    const endpoint = 'https://leetcode.com/graphql';

    const query =gql`
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

    const client = new GraphQLClient(endpoint, { headers: {} });
    const resp = await client.request(query);
    
    const data = resp.matchedUser.submitStats.acSubmissionNum.map( item => {
        return {"name": item.difficulty, 'value': item.count}
    });
    res.status(200).json({ data })
}
