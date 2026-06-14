// import { OPERATION } from "../app";
import { Colors } from "../constants/colors";



export enum OPERATION {
  ADD,
  DIVIDE,
  MULTIPLY,
  SUBTRACT,
  EQUAL,
  CLEAR,
  PERCENTAGE,
  REMOVE,
  DOT,
  DOUBLE_ZERO,
  NUMBER,
}

export const ButtonData = [
  {
    label : "C",
    value: "C",
    color: Colors.red,
   action: OPERATION.REMOVE,
  },
   {
    label : "AC",
    value: "AC",
    color: Colors.red,

     action: OPERATION.CLEAR
  },
  {
    label : "%",
    value: "%",
    color: Colors.gray,
    action: OPERATION.PERCENTAGE

  },
  {
    label : "/",
    value: "/",
    color: Colors.gray,
    action: OPERATION.DIVIDE
  },
  {
    label : "1",
    value: 1,
    color: Colors.white,
    action: OPERATION.NUMBER

  },
  {
    label : "2",
    value: 2,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
  {
    label : "3",
    value: 3,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
   {
    label : "*",
    value: "*",
    color: Colors.gray,
    action: OPERATION.MULTIPLY
  },
  {
    label : "4",
    value: 4,
    color: Colors.white,
    action: OPERATION.NUMBER,
  },
  {
    label : "5",
    value: 5,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
  {
    label : "6",
    value: 6,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
  {
    label : "-",
    value: "-",
    color: Colors.gray,
    action: OPERATION.SUBTRACT,
  },
  {
    label : "7",
    value: 7,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
  {
    label : "8",
    value: 8,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
  {
    label : "9",
    value: 9,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
  {
    label : "+",
    value: "+",
    color: Colors.gray,
    action: OPERATION.ADD
  },
  {
    label : "0",
    value: 0,
    color: Colors.white,
    action: OPERATION.NUMBER
  },
   {
    label : ".",
    value: ".",
    color: Colors.white,
    action: OPERATION.DOT
  },
  {
    label : "00",
    value: "00",
    color: Colors.white,
    action: OPERATION.DOUBLE_ZERO
  },
  {
    label : "=",
    value: "=",
    color: Colors.gray,
    action: OPERATION.EQUAL
  },
]