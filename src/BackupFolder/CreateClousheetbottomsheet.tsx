<View style={{marginHorizontal: 30}}>
<View style={Tempatestyle.creatcloudview}>
  <View>
    <Text style={Tempatestyle.createcloudtext}>
      {Bottomlabel.TemBottomsheet.CreateCloudsheet}
    </Text>
  </View>
  <View style={{flex: 1}} />
  <View>
    <Infoicon />
  </View>
</View>

<View style={Tempatestyle.seletetmplatetext}>
  <Text>{Bottomlabel.TemBottomsheet.SELECTTEMPLATE}</Text>
</View>

<View style={Tempatestyle.editfolderview}>
  <View>
    <Folder />
  </View>
  <View>
    <Text style={Tempatestyle.newtemplatetext}>
      {Bottomlabel.TemBottomsheet.InNewTemplate}
    </Text>
  </View>
</View>
<View style={Tempatestyle.folderview}>
  <View>
    <Editicon />
  </View>
  <View>
    <Text style={{paddingLeft: 15}}>
      {Bottomlabel.TemBottomsheet.InExistingTemplate}
    </Text>
  </View>
</View>
</View>



bottomsheetview: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 268,
    borderRadius: 25,
  },
  creatcloudview: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createcloudtext: {
    fontFamily: FONTS.MANROPE_NORMAL,
    fontSize: 20,
    color: '#001521',
  },
  seletetmplatetext: {
    paddingTop: 5,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
    color: '#001521',
  },
  folderview: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  editfolderview: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  newtemplatetext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    color: '#001521',
    paddingLeft:15
  },
  existingtemplate: {
    fontFamily: FONTS.inter_regular,
    fontSize: 15,
    color: '#001521'
  },