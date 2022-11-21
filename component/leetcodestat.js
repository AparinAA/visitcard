import { PieChart, Pie, Cell } from 'recharts';
import styles from '../styles/Home.module.css';

export default function LeetCodeStat (props) {
    const COLORS = ['#00C49F', 'rgb(255,184,0)', 'rgb(255,45,85)'];
    const RADIAN = Math.PI / 180;
    
    const { data } = props;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {value}
            </text>
        );
    };
    
    const listNameLevel = COLORS.map( (color, i) =>
        <li key={color} style={{'listStyle': 'none', "width": "max-content"}}>
            <div style={{backgroundColor: color, width: 10, height: 10, display: 'inline-block'}} /> {data[i].name}
        </li>
    );

    const Cells = data.map((entry, index) =>
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    );

    return ( 
        <div className={styles.withAdditionPie}>
            <ul style={{'alignSelf': 'center'}}>
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