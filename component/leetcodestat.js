import { PieChart, Pie, Cell } from 'recharts';
import styles from '../styles/Home.module.css';
import { renderCustomizedLabel } from '../lib/helpFunction';
import SkeletonLeetcode from './skeletonLeetcode';
import useSWR from 'swr';

const fetcher = (url) =>
    fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            return data.data.filter(item => item.name !== "All");
        })
        .catch(error => {
            throw Error(error)
        });

export default function LeetCodeStat(props) {

    let { data, error, isLoading } = useSWR('api/leetcodequery', fetcher);

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <SkeletonLeetcode />
    }

    const COLORS = ['#00C49F', 'rgb(255,184,0)', 'rgb(255,45,85)'];

    const listNameLevel = COLORS.map((color, i) =>
        <li key={color} style={{ 'listStyle': 'none', "width": "max-content" }}>
            <div style={{ backgroundColor: color, width: 10, height: 10, display: 'inline-block' }} /> {data[i]?.name}
        </li>
    );

    const Cells = data.map((entry, index) =>
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    );

    return (
        <div className={styles.withAdditionPie}>
            <ul style={{ 'alignSelf': 'center' }}>
                {listNameLevel}
            </ul>
            <div >
                <PieChart width={140} height={140}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        isAnimationActive={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {Cells}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
}