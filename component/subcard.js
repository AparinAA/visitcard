import styles from '../styles/Home.module.css';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import Image from 'next/image';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function SubcardCard(props) {

    let body;
    let add;
    if (props?.body) {
        const {type, items, addition } = props.body;
        const additionData = props?.addition;
        body = items.map( item => {
            if (type === 'list-link' || type === 'list-link-horizontal') {
                const img = item?.ico ? <Image src={ `${prefix}/${item?.ico}.svg`} width={16} height={16}/> : '';

                return <a 
                        key={`list-link-${item.id}`}
                        className={`${styles[type]}`}
                        rel="noreferrer" href={item.url}
                        target="_blank">
                            {img}
                            <ReactMarkdown components={{p: React.Fragment}}>{item.name}</ReactMarkdown>
                        </a>
            }
            if (type === 'list-horizontal' || type === 'list-list') {
                return <li key={`list-hor-${item}`}><ReactMarkdown components={{p: React.Fragment}}>{item}</ReactMarkdown></li>
            }

            return <ReactMarkdown key={item}>{item}</ReactMarkdown>;
        });

        body = (type === 'list-horizontal' || type === 'list-list') ? <ul className={styles[type]}>{body}</ul> : <div>{body}</div>;
        
        if ( addition === 'leetcodestat' ) {
            let addCol = "...Loading";
            if ( additionData?.name === 'leetcodestat' ) {
                const data = additionData?.data?.data?.filter( item => item.name !== "All");
                
                const COLORS = ['#00C49F', 'rgb(255,184,0)', 'rgb(255,45,85)'];
                const RADIAN = Math.PI / 180;

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
                
                addCol = <div className={styles.withAdditionPie}>
                    <ul style={{'alignSelf': 'center'}}>
                        {COLORS.map( (color, i) => {
                            return <li key={color} style={{'listStyle': 'none', "width": "max-content"}}>
                                <div style={{backgroundColor: color, width: 10, height: 10, display: 'inline-block'}} /> {data[i].name}
                            </li>
                        })}
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
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>
                
            }
            add = <div>
                <h4 style={{textAlign: 'center'}}>Leetcode stats</h4>
                {addCol}
            </div>
        }
    }

    

    return (
        <div className={styles.subcard}>
            <div className={styles.withAddition}>
                <div>
                    <p>{props?.title}</p>
                    {props?.description ? <span>{props?.description}</span> : ''}
                    {props?.subdescription ? <small><span>{props?.subdescription}</span></small> : ''}
                    {body}
                    {props?.children}
                </div>
                <div>
                    {add}
                </div>
            </div>
        </div>
    );
}