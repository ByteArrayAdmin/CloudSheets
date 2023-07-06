import React,{useEffect} from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import labels from "../../../../utils/ProjectLabels.json";
import Logo from "../../../../assets/Images/star.svg";
import AuthCard from "../../../../commonComponents/AuthCard";
import ThumbLogo from "../../../../assets/Images/Rateusthumb.svg";
import { styles } from "screens/Auth/signup/style";
import { Rating, AirbnbRating } from "react-native-ratings";
import InputField from "../../../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../.././../commonComponents/Button";
import { ScrollView } from "react-native-gesture-handler";
import {Styles} from "./style"
import { track_Screen } from '../../../../eventTracking/index';
import {eventName,screenName} from '../../../../utils/Constant';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Rateus = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  useEffect(()=>{
    track_Screen(eventName.TRACK_SCREEN,screenName.RATEUS_SCREEN)
  }, [])

  const ratingCompleted = (rating: number) => {
    
  };
  const onSubmit = async (data: any) => {
  };
  return (
      <View style={Styles.container}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.RateUS.Rate}
          Folder={<Logo />}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

        <View>
          <AuthCard
            subchildren={
              <>
                <View style={Styles.Cardcontainer}>
                  <View style={Styles.Thumblogostyle}>
                    <ThumbLogo />
                  </View>
                  <View style={Styles.subcardstyle}>
                    <View>
                      <Text style={Styles.textEnjoyapp}>
                        {labels.RateUS.EnjoyOurApp}
                      </Text>
                    </View>
                    <View>
                      <Text style={Styles.cardtext}>
                        {labels.RateUS.Card_text}
                      </Text>
                    </View>
                    <View>
                      <Text style={Styles.cardtext1}>
                        {labels.RateUS.SubCardetxt}
                      </Text>
                    </View>
                    <View style={Styles.ratingview}>
                      <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={26}
                        onFinishRating={ratingCompleted}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={Styles.sendfeedbacktext}>
                      {labels.RateUS.SendFeedback}
                    </Text>
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <InputField
                      name="review"
                      control={control}
                      placeholder={labels.RateUS.plceholdertext}
                      styles={Styles.inputview}
                      multiline={true}
                      textAlignVertical={'top'}
                    />
                  </View>

                  <View style={Styles.Bottom}>
                    <CustomButton
                      Register={labels.RateUS.RateNow}
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              </>
            }
          />
        </View>
        </KeyboardAwareScrollView>

      </View>
    
  );
};

export default Rateus;


