import { StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";
import useThemeStyles from "~hooks/useThemeStyles";
const styles = (theme) => StyleSheet.create({starColor: theme.colors.ZincYellow});
const StarRatingComponent = ({
  containerStyle,
  starSize,
  disabled= true,
  rating,
  selectedStar = (star)=>{},
}) => {
    const style = useThemeStyles(styles);
  return (
    <StarRating
      // buttonStyle={modalStyle.starStyle}
      containerStyle={containerStyle}
      fullStarColor={style.starColor}
      emptyStarColor={style.starColor}
      starSize={starSize}
      disabled={disabled}
      maxStars={5}
      rating={rating}
      selectedStar={(rate) => selectedStar(rate)}
    />
  );
};
export default StarRatingComponent;
