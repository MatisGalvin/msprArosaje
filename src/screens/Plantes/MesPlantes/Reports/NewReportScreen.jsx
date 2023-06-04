import {
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "../../../../components/Header/Header";
import { SectionTitle } from "../../../../components/SectionTitle/SectionTitle";
import NewReportingCard from "../../../../components/ReportingCard/NewReportingCard";
import { LargeButton } from "../../../../components/LargeButton/LargeButton";
import BottomSearchBar from "../../../../components/BottomSearchBar/BottomSearchBar";
import colors from "../../../../../colors";
import { WrapperScreen } from "../../../../components/WrapperScreen/WrapperScreen";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formatDateWitouthHour } from "../../../../utils/tools";

export default function NewReportScreen({ route }) {
  const owner = route.params.owner;
  const image = route.params.image;
  const plant = route.params.plant;
  const isNewReport = route.params.isNewReport;

  const navigation = useNavigation();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderSectionTitle = () => {
    if (isNewReport) {
      return (
        <SectionTitle
          image={require("../../../../../assets/images/static/report.png")}
        >
          Nouveau Rapport
        </SectionTitle>
      );
    } else {
      return (
        <SectionTitle
          image={require("../../../../../assets/images/static/report.png")}
        >
          {owner} - {formatDateWitouthHour(plant.attributes.publishedAt)}
        </SectionTitle>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", height: "100%" }}
    >
      <WrapperScreen>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ 
              overflow: "visible",
              flex: 1,
              marginBottom: 60,
            }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "start",
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>
              <Header
                screenName="Plantes"
                handlePress={() => navigation.goBack()}
              />
              {renderSectionTitle()}

              <NewReportingCard
                image={image}
                owner={owner}
                plantId={plant.id}
                isSubmitted={isSubmitted}
              />

              {/* <LargeButton
              grey
              image={require("../../../../../assets/images/static/report-grey.png")}
              handlePress={() => {}}
            >
              Publier mon raport
            </LargeButton> */}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: "white",
            minWidth: "100%",
            position: "absolute",
            paddingBottom: 40,
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
          <BottomSearchBar plantId={plant.id} setIsSubmitted={setIsSubmitted} />
        </View>
      </WrapperScreen>
    </KeyboardAvoidingView>
  );
}
