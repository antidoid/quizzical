import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton() {
    return Array(10)
        .fill(0)
        .map((_, i) => (
            <div key={i} className="card-skeleton">
                <Skeleton height={25} />
                <div className="card-skeleton--options">
                    <Skeleton height={20} count={4} inline={true} />
                </div>
            </div>
        ));
}
