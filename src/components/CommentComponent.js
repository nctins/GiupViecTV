import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "./Typography";
import StarRatingComponent from "./StarRatingComponent";
import useThemeStyles from "~hooks/useThemeStyles";
import DateFormater from "~utils/Dateformater";

const styles = (theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.BackgroundBlue,
      padding: 5,
      borderRadius: 5,
      margin: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    starColor: theme.colors.ZincYellow,
    content: { marginTop: 10 },
  });

const CommentComponent = (props) => {
  const style = useThemeStyles(styles);
  const data = props.data;
  return (
    <View style={style.wrapper}>
      <View style={style.header}>
        <StarRatingComponent
          containerStyle={{ width: 100 }}
          starSize={18}
          rating={data.rating}
        />
        <Typography color="Gray.0"> {DateFormater(data.date)} </Typography>
      </View>
      <View style={style.content}>
        <Typography variant="TextBold" color="Gray.0">
          {data.user_name}
        </Typography>
        <Typography style={{ margin: 5 }} color="Gray.0">
          {data.content}
        </Typography>
      </View>
    </View>
  );
};

export default CommentComponent;
