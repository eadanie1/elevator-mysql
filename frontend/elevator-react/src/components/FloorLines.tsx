import styles from "../styles/floor-lines.module.css";

const FloorLines = () => {
  return (
    <div>
      <div className={`${styles.line} ${styles.line1}`}>
        <p className={`${styles.lineText1}`}>Floor 0</p>
      </div>
      <div className={`${styles.line} ${styles.line2}`}>
        <p className={`${styles.lineText2}`}>Floor 1</p>
      </div>
      <div className={`${styles.line} ${styles.line3}`}>
        <p className={`${styles.lineText3}`}>Floor 2</p>
      </div>
      <div className={`${styles.line} ${styles.line4}`}>
        <p className={`${styles.lineText4}`}>Floor 3</p>
      </div>
      <div className={`${styles.line} ${styles.line5}`}>
        <p className={`${styles.lineText5}`}>Floor 4</p>
      </div>
      <div className={`${styles.line} ${styles.line6}`}>
        <p className={`${styles.lineText6}`}>Floor 5</p>
      </div>
      <div className={`${styles.line} ${styles.line7}`}>
        <p className={`${styles.lineText7}`}>Floor 6</p>
      </div>
      <div className={`${styles.line} ${styles.line8}`}>
        <p className={`${styles.lineText8}`}>Floor 7</p>
      </div>
      <div className={`${styles.line} ${styles.line9}`}>
        <p className={`${styles.lineText9}`}>Floor 8</p>
      </div>
      <div className={`${styles.line} ${styles.line10}`}>
        <p className={`${styles.lineText10}`}>Floor 9</p>
      </div>
      <div className={`${styles.line} ${styles.line11}`}>
        <p className={`${styles.lineText11}`}>Floor 10</p>
      </div>
    </div>
  );
};

export default FloorLines;
