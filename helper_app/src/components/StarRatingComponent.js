import { StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";
import useThemeStyles from "~hooks/useThemeStyles";
const styles = (theme) => StyleSheet.create({starColor: theme.colors.Gold});
const StarRatingComponent = ({
  containerStyle,
  starSize,
  disabled= true,
  rating,
  selectedStar = (star)=>{},
  starColor = null
}) => {
  const style = useThemeStyles(styles);
  const star_color = starColor ? starColor : style.starColor;
  return (
    <StarRating
      // buttonStyle={modalStyle.starStyle}
      containerStyle={containerStyle}
      fullStarColor={star_color}
      emptyStarColor={star_color}
      starSize={starSize}
      disabled={disabled}
      maxStars={5}
      rating={rating}
      selectedStar={(rate) => selectedStar(rate)}
    />
  );
};
export default StarRatingComponent;
