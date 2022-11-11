import { Side } from "../../types/components/common";
import styles from './styles/Partition.module.scss';

const Partition: React.FC<Side> = ({
    direction,
    children
}) => {
    return (
        <span className={`${styles.container} ${direction == 'left' ? styles.left : styles.right}`}>
            {children}
        </span>
    );
};

export default Partition;