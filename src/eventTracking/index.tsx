import { Amplify, Analytics } from 'aws-amplify';

export const track_Screen = ()=>{
    Analytics.record({ name: 'cloudSheetTabScreen', eventType:'' });
}