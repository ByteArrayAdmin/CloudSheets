import React from 'react';
import Ic_word  from '../assets/Images/ic_word.svg';
import Ic_number  from '../assets/Images/ic_number.svg';
import Ic_pickList  from '../assets/Images/ic_pickList.svg';
import Ic_chooseDate  from '../assets/Images/ic_chooseDate.svg';
import Ic_emailPhone  from '../assets/Images/ic_emailPhone.svg';
import Ic_physicalAddress  from '../assets/Images/ic_physicalAddress.svg';
import Ic_barcode  from '../assets/Images/ic_barcode.svg';
import Ic_yesNo from '../assets/Images/ic_yesNo.svg';

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const FONTS = {
  MANROPE_NORMAL: "Manrope-Regular",
  inter_regular: "Inter-Regular",
  inter_bold: "Inter-Bold",
  inter_semibold: "Inter-Semibold",
  manrope_bold: "Manrope-Bold",
  manrope_semibold: "Manrope-SemiBold",
  inter_medium: "Inter-Medium",
  manrope_medium: "Manrope-Medium",
};
export const COLOURS = {
  white: "#FFFFFF",
  Skyblue: "#0061FF",
  black: "#001521",
  offwhite: "#F6F8FA",
  GREY: "#ECEEF0",
  ligthwhite: "rgba(255, 255, 255, 0.1)",
  whitepointfive: "rgba(255, 255, 255, 1)",
  red: "#FF0000",
  lightgrey: "#E7EFF6",
  shadowcolour: "#000",
  lightred:"rgba(255, 120, 120, 0.12)",
  orignalred:"#FF7878",
  offGrey:" #ECEFF2",
  Simplegrey:"#5D6886",
 verydarkgrey: "#171717",
 darkblue:"#16213E",
 shadow_colour:"#000",
 cardBorder_lightBlue:"rgba(0, 97, 255, 0.5)"
};

export const columnTypeList = [
  {
    label: 'Words or Sentences',
    value: 'Sentences',
    icon:() =><Ic_word/>
  },
  {
    label:"Numbers",
    value:"Numbers",
    icon:() =><Ic_number/>
  },
  {
    label:"Yes or No Choice",
    value:"Yes/No",
    icon:() =><Ic_yesNo/>
  },
  {
    label:"Pick from a List",
    value:"List",
    icon:() =><Ic_pickList/>
  },
  
  {
    label:"Choose a Date",
    value:"Date",
    icon:() =><Ic_chooseDate/>
  },
  {
    label:"Email or Phone",
    value:"EmailPhone",
    icon:() =><Ic_emailPhone/>
  },
  {
    label:"Scan Image or Barcode",
    value:"Barcode",
    icon:() =><Ic_barcode/>
  },
  {
    label:"Physical Address",
    value:"Address",
    icon:() =><Ic_physicalAddress/>
  },
]
