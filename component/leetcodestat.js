import { PieChart, Pie, Cell } from "recharts";
import styles from "../styles/Home.module.css";
import {
    renderCustomizedLabel,
    renderCustomizedLabelOutside,
} from "../lib/helpFunction";
import SkeletonLeetcode from "./skeletonLeetcode";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url) =>
    fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
            const tempData = data.data.stats;
            let indexAll = 0;
            data.data.stats.forEach((item, i) => {
                if (item.name === "All") {
                    indexAll = i;
                }
            });
            let dataAll = data.data.stats[indexAll];

            data.data.stats.splice(indexAll, 1);
            data.data.stats.push(dataAll);

            return {
                stats: data.data.stats,
                picURLS: data.data.picURLS,
            };
        })
        .catch((error) => {
            throw Error(error);
        });

export default function LeetCodeStat(props) {
    let { data, error, isLoading } = useSWR("api/leetcodequery", fetcher);

    if (error) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <SkeletonLeetcode />;
    }

    const COLORS = ["#00C49F", "rgb(255,184,0)", "rgb(255,45,85)", "#c4bdbd"];

    const listNameLevel = COLORS.map((color, i) => (
        <li key={color} style={{ listStyle: "none", width: "max-content" }}>
            <div
                style={{
                    backgroundColor: color,
                    width: 10,
                    height: 10,
                    display: "inline-block",
                }}
            />{" "}
            {data?.stats[i]?.name}
        </li>
    ));

    const Cells = data.stats.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ));

    const badge = data.picURLS.map((pic) => (
        <Image
            key={pic.url}
            src={pic.url}
            alt={pic.alt}
            width={45}
            height={45}
            loading="lazy"
        />
    ));

    return (
        <>
            <div className={styles.withAdditionPie}>
                <ul style={{ alignSelf: "center" }}>{listNameLevel}</ul>
                <div>
                    <PieChart width={180} height={180}>
                        <Pie
                            data={data.stats.filter(
                                (item) => item.name !== "All"
                            )}
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
                        <Pie
                            data={data.stats.filter(
                                (item) => item.name === "All"
                            )}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={80}
                            fill="#c4bdbd"
                            labelLine={false}
                            label={renderCustomizedLabelOutside}
                        />
                    </PieChart>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>{badge}</div>
        </>
    );
}
