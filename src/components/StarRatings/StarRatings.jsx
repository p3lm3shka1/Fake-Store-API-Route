import { IoIosStarOutline, IoIosStar } from "react-icons/io";

const StarRating = ({ value = 0, onChange, readOnly = false }) => {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className="star-rating"
          key={star}
          style={{
            color: star <= value ? "hsl(234, 72%, 56%)" : "",
            cursor: readOnly ? "default" : "pointer",
          }}
          onClick={readOnly ? undefined : () => onChange(star)}
          onMouseOut={
            readOnly
              ? undefined
              : (e) =>
                  (e.currentTarget.style.color =
                    star <= value ? "hsl(234, 72%, 56%)" : "")
          }
          role={readOnly ? undefined : "button"}
          tabIndex={readOnly ? -1 : 0}
        >
          {star <= value ? <IoIosStar /> : <IoIosStarOutline />}
        </span>
      ))}
    </span>
  );
};

export default StarRating;
