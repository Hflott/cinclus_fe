import styles from "./SliderDots.module.css";

const SliderDots = ({
  activeIndex,
  onDotClick,
  dotCount,
}: {
  activeIndex: number;
  onDotClick: (index: number) => void;
  dotCount: number;
}) => {
  return (
    <div className={styles.customDotsContainer}>
      {Array.from({ length: dotCount }, (_, index) => (
        <div
          key={index}
          className={`${styles.customDot} ${
            activeIndex === index ? styles.activeDot : ""
          }`}
          onClick={() => onDotClick(index)} // Trigger slider change when dot is clicked
        />
      ))}
    </div>
  );
};

export default SliderDots;
