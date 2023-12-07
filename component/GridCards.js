import Card from "./card";
import SubcardCard from "./subcard";
import styles from "../styles/Home.module.css";

export default function GridCards({ listCard }) {
	return (
		<div className={styles.info} id="info">
			{listCard?.map((item) => {
				item.info.sort((a, b) => (a?.id && b?.id ? a?.id - b?.id : 1));
				return (
					<Card
						title={item?.title}
						key={`card_${item.id}`}
						isSticky={item?.id === 1}
					>
						{item.info.map((infItem) => {
							return (
								<SubcardCard
									key={`subcard_${item.id}_${infItem?.id}`}
									title={infItem?.title}
									description={infItem?.description}
									subdescription={infItem?.subdescription}
									body={infItem?.child}
								/>
							);
						})}
						{item?.child}
					</Card>
				);
			})}
		</div>
	);
}
