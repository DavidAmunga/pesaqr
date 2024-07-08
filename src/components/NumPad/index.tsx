import React, { useContext } from "react";
import { Button } from "../ui/button";
import { AppContext, AppContextType } from "@/context/AppContext";
import { NumericFormat } from "react-number-format";
import { Input } from "../ui/input";
import { FiDelete } from "react-icons/fi";

const NumPad = () => {
  const { data, setData } = useContext(AppContext) as AppContextType;
  const handleClick = (value: number) => {
    setData({ ...data, amount: `${data.amount}${value}` });
  };

  const handleClear = () => {
    setData({ ...data, amount: undefined });
  };
  const handleDeleteLast = () => {
    let amount =
      data.amount && data.amount.length > 0
        ? data.amount.substring(0, data.amount.length - 1)
        : "";
    setData({ ...data, amount: amount });
  };

  return (
    <div className="flex flex-col space-y-2 bg-gray-800 p-2 rounded-md border border-gray-700">
      <NumericFormat
        onValueChange={(value) => {
          if (
            value.floatValue != undefined &&
            value.floatValue.toString().length <= 5
          ) {
            setData({ ...data, amount: value.value });
          }
        }}
        inputMode="numeric"
        value={data.amount ?? ""}
        customInput={Input}
        thousandSeparator=","
        prefix="KES "
        allowNegative={false}
        placeholder="Enter Amount to Pay"
        className="font-display py-7 md:py-7 border-4 border-green-600  shadow-inner placeholder:text-xl  placeholder:md:text-3xl  placeholder:text-gray-600 text-gray-900 text-xl md:text-4xl text-center w-full"
      />
      <div className="w-full grid grid-cols-3 gap-1">
        <Button
          onClick={() => handleClick(1)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          1
        </Button>
        <Button
          onClick={() => handleClick(2)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          2
        </Button>
        <Button
          onClick={() => handleClick(3)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          3
        </Button>
        <Button
          onClick={() => handleClick(4)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          4
        </Button>
        <Button
          onClick={() => handleClick(5)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          5
        </Button>
        <Button
          onClick={() => handleClick(6)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          6
        </Button>
        <Button
          onClick={() => handleClick(7)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          7
        </Button>
        <Button
          onClick={() => handleClick(8)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          8
        </Button>
        <Button
          onClick={() => handleClick(9)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          9
        </Button>

        <Button
          onClick={() => handleClear()}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          CLR
        </Button>
        <Button
          onClick={() => handleClick(0)}
          className="text-gray-800 py-8 text-4xl font-bold bg-white hover:bg-gray-200 border border-gray-800 border-y"
        >
          0
        </Button>

        <Button
          onClick={() => handleDeleteLast()}
          className="text-gray-800 font-bold py-8 text-4xl bg-white border border-gray-800 hover:bg-gray-200 border-y"
        >
          <FiDelete />
        </Button>
      </div>
    </div>
  );
};

export default NumPad;
