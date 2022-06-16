import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
// cannot deep require import according to
// https://github.com/oblador/react-native-progress#progressbar
import * as Progress from "react-native-progress";
import AccountsDropDown from "./AccountsDropDown";
import { Entypo } from '@expo/vector-icons';

export default function BudgetCard() {
  const [budgetDetails, setBudgetDetails] = useState<boolean>(false);
  const moneyRem = useSelector(
    (state: GlobalStateType) => state.budgets.remaining.totalRemaining
  );
  const moneyTotal = useSelector(
    (state: GlobalStateType) => state.budgets.remaining.accountsTotal
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.budgetWrapper}>        
          <Text style={styles.budgetTextTop}>Extra Money:</Text>
          <Text style={styles.budgetText}>${moneyRem}</Text>
          <Text style={styles.budgetTextBottom}>
            ${moneyRem} of ${moneyTotal}
          </Text>
          <View style={styles.bar}>
            <Progress.Bar
              progress={moneyRem / moneyTotal || 0}
              unfilledColor="#DBDBDB"
              borderColor="rgba(0,0,0,0)"
              borderRadius={8}
              width={235}
              height={10}
              color="#316BB4"
            />
          </View>
          
        </View>
        {budgetDetails ? <AccountsDropDown /> : null}
        
      </View>
      <View style={styles.toggleWrap}>
        <Entypo
          style={styles.toggleDropDown}
          name="dots-three-horizontal"
          size={18}
          color="white"
          onPress={() => setBudgetDetails(!budgetDetails)}
        /> 
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    minHeight: 180,
    borderRadius: 23,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,    
    elevation: 3,
    width: "98%",
  },
  budgetWrapper: {
    paddingTop: 12,
    paddingRight: 40,
    paddingLeft: 40,
  },
  budgetText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Sarabun_700Bold",
    lineHeight: 45
  },
  budgetTextTop: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Sarabun_600SemiBold",
  },
  budgetTextBottom: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Sarabun_300Light",
  },
  toggleWrap: {
    width: 40,
    height: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#215290",
  },
  toggleDropDown: {
    marginTop: -2,
    marginBottom: -2,
  },
  bar: {
    flexDirection: "row",
    height: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 13,
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: 40,
  },
});
