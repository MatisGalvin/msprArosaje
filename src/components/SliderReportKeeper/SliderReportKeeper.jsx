import { FlatList } from "react-native";
import { AddNewReport } from "../AddNewReport/AddNewReport";
import { SliderCardItem } from "../SliderCardItem/SliderCardItem";

export const SliderReportKeeper = ({ isNewReport, name }) => {
  const data = [
    {
      _id: 0,
      image: require("../../../assets/images/static/monstera.jpg"),
      date: "23/04/2023",
      owner: "Hugo SCARBONCHI",
    },
    {
      _id: 1,
      image: require("../../../assets/images/static/monstera.jpg"),
      date: "23/04/2023",
      owner: "Hugo SCARBONCHI",
    },
    {
      _id: 2,
      image: require("../../../assets/images/static/monstera.jpg"),
      date: "23/04/2023",
      owner: "Hugo SCARBONCHI",
    },
    {
      _id: 3,
      image: require("../../../assets/images/static/monstera.jpg"),
      date: "23/04/2023",
      owner: "Hugo SCARBONCHI",
    },
    {
      _id: 4,
      image: require("../../../assets/images/static/monstera.jpg"),
      date: "23/04/2023",
      owner: "Hugo SCARBONCHI",
    },
  ];
  return (
    <FlatList
      horizontal={true}
      renderItem={(data) => (
        <SliderCardItem
          image={data.item.image}
          date={data.item.date}
          owner={data.item.owner}
        />
      )}
      data={data}
      ListHeaderComponent={() => isNewReport && <AddNewReport />}
      keyExtractor={(item) => item._id}
      ListHeaderComponentStyle={{
        alignItems: "stretch",
        flexDirection: "row",
      }}
      contentContainerStyle={{
        alignItems: "stretch",
        gap: 10,
      }}
      style={{ overflow: "visible" }}
      showsHorizontalScrollIndicator={false}
    />
  );
};
