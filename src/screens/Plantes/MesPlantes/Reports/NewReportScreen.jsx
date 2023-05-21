import { View, ScrollView, Dimensions } from "react-native";
import { Header } from "../../../../components/Header/Header";
import { SectionTitle } from "../../../../components/SectionTitle/SectionTitle";
import NewReportingCard from "../../../../components/ReportingCard/NewReportingCard";
import { LargeButton } from "../../../../components/LargeButton/LargeButton";
import BottomSearchBar from "../../../../components/BottomSearchBar/BottomSearchBar";
import colors from "../../../../../colors";

export default function NewReportScreen() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Header screenName="Accueil" />
        <View style={{ flex: 6 }}>
          <ScrollView
            style={{
              overflow: "visible",
              flex: 1,
            }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "start",
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <SectionTitle
              image={require("../../../../../assets/images/static/report.png")}
            >
              Nouveau Rapport
            </SectionTitle>

            <NewReportingCard />

            <LargeButton
              grey
              image={require("../../../../../assets/images/static/report-grey.png")}
              handlePress={() => {}}
            >
              Publier mon raport
            </LargeButton>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          minWidth: "100%",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 15,
          paddingVertical: 10,
          zIndex: 10,
          elevation: 50,

          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        }}
      >
        <BottomSearchBar />
      </View>
    </>
  );
}
