import { useActiveUserService } from "@/src/core/services/Auth/activeUser.service";
import styles from "@/src/utils/style";
import { Button } from "@nextui-org/react";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";

type Props = {
  setActiveState: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setActiveState }) => {
  const [invalidError, setInvalidError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const {activeUser, loading} = useActiveUserService()
  
  const verificationHandler = async () => {
    try {
      const activationCode = Object.values(verifyNumber).join("")
      const activationToken = localStorage.getItem("activationToken")
      // const response = await avtiveUserMutation(
      //   {
      //     variables: {
      //       activationCode: activationCode,
      //       activationToken: activationToken
      //     }
      //   }
      // )
      const response = await activeUser({
        activationCode: activationCode,
        activationToken: activationToken!
      })
      console.log(response)
      toast.success("Active user successfully, login now!!!")
      setActiveState('login')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    console.log(value)
  };

  return (
    <div style={{width: "300px"}}>
      <h1 className={`${styles.title} text-black`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className=
              {`w-[60px] h-[60px] 
                bg-transparent 
                border-[3px] 
                rounded-[10px] 
                flex items-center justify-center 
                font-Poppins 
                outline-none 
                text-center 
              text-gray-500 text-lg pl-3 border-gray-400
            ${
              invalidError ? "shake border-red-500" : "border-white"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            style={{fontSize: "24px"}}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (parseInt(inputValue, 10) < 10) {
                handleInputChange(index, inputValue);
              }
            }}
          />
        ))}
      </div>
      <br />
      <br />
      <Button 
          type='submit' 
          color='primary' 
          className='w-full rounded-md mt-6'
          onClick= {verificationHandler}
          isDisabled= {loading}
      >
          Verify OTP
      </Button>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black">
        Go back to sign in?
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setActiveState("login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;